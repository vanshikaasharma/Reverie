export type MemberRole = 'admin' | 'member';

export type ClubBookStatus = 'candidate' | 'voting' | 'current' | 'finished';

/** Matches Cognito sub — same value as profiles.id */
export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
}

export interface Club {
  id: string;
  name: string;
  description: string | null;
  invite_code: string;
  created_by: string;
  current_club_book_id: string | null;
}

export interface ClubMember {
  id: string;
  club_id: string;
  user_id: string;
  role: MemberRole;
  joined_at: string;
}

export interface Book {
  id: string;
  openlibrary_id: string;
  title: string;
  author: string;
  cover_url: string | null;
  total_chapters: number;
}

export interface ClubBook {
  id: string;
  club_id: string;
  book_id: string;
  status: ClubBookStatus;
  added_by: string;
}

export interface Vote {
  id: string;
  club_book_id: string;
  user_id: string;
  created_at: string;
}

export interface ReadingProgress {
  id: string;
  club_book_id: string;
  user_id: string;
  current_chapter: number;
  updated_at: string;
}

export interface Comment {
  id: string;
  club_book_id: string;
  chapter: number;
  user_id: string;
  body: string;
  parent_id: string | null;
  created_at: string;
}
