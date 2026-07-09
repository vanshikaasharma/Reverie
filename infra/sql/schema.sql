-- Reverie schema for Aurora DSQL
-- No foreign keys — referential integrity is enforced in Lambda code.
-- profiles.id is the Cognito sub (set on signup, not gen_random_uuid).

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  display_name VARCHAR(100) NOT NULL,
  avatar_url TEXT
);

CREATE TABLE IF NOT EXISTS clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  invite_code VARCHAR(12) NOT NULL,
  created_by UUID NOT NULL,
  current_club_book_id UUID,
  CONSTRAINT clubs_invite_code_unique UNIQUE (invite_code)
);

CREATE TABLE IF NOT EXISTS club_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role VARCHAR(20) NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT club_members_role_check CHECK (role IN ('admin', 'member')),
  CONSTRAINT club_members_club_user_unique UNIQUE (club_id, user_id)
);

CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  openlibrary_id VARCHAR(50) NOT NULL,
  title VARCHAR(500) NOT NULL,
  author VARCHAR(500) NOT NULL,
  cover_url TEXT,
  total_chapters INTEGER NOT NULL,
  CONSTRAINT books_total_chapters_check CHECK (total_chapters > 0),
  CONSTRAINT books_openlibrary_id_unique UNIQUE (openlibrary_id)
);

CREATE TABLE IF NOT EXISTS club_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL,
  book_id UUID NOT NULL,
  status VARCHAR(20) NOT NULL,
  added_by UUID NOT NULL,
  CONSTRAINT club_books_status_check CHECK (status IN ('candidate', 'voting', 'current', 'finished'))
);

CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_book_id UUID NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT votes_club_book_user_unique UNIQUE (club_book_id, user_id)
);

CREATE TABLE IF NOT EXISTS reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_book_id UUID NOT NULL,
  user_id UUID NOT NULL,
  current_chapter INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT reading_progress_chapter_check CHECK (current_chapter >= 0),
  CONSTRAINT reading_progress_club_book_user_unique UNIQUE (club_book_id, user_id)
);

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_book_id UUID NOT NULL,
  chapter INTEGER NOT NULL,
  user_id UUID NOT NULL,
  body TEXT NOT NULL,
  parent_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT comments_chapter_check CHECK (chapter >= 1)
);

-- DSQL builds indexes in the background; they are not ready immediately after CREATE.
CREATE INDEX ASYNC IF NOT EXISTS idx_club_members_club_id ON club_members (club_id);
CREATE INDEX ASYNC IF NOT EXISTS idx_club_members_user_id ON club_members (user_id);
CREATE INDEX ASYNC IF NOT EXISTS idx_club_books_club_id ON club_books (club_id);
CREATE INDEX ASYNC IF NOT EXISTS idx_club_books_club_status ON club_books (club_id, status);
CREATE INDEX ASYNC IF NOT EXISTS idx_comments_club_book_chapter ON comments (club_book_id, chapter);
CREATE INDEX ASYNC IF NOT EXISTS idx_reading_progress_lookup ON reading_progress (club_book_id, user_id);
