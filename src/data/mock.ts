export type MockMember = {
  id: string;
  name: string;
  role?: 'admin' | 'member';
  chapter: number;
  avatarColor: string;
};

export type MockClub = {
  id: string;
  name: string;
  memberCount: number;
  currentBook: {
    title: string;
    author: string;
    coverUrl: string;
    totalChapters: number;
    blurb: string;
  } | null;
  statusLabel: string;
  myProgressPercent: number | null;
  nextVoteDays: number | null;
};

export type MockCandidate = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  totalChapters: number;
  votes: number;
};

export type MockComment = {
  id: string;
  author: string;
  body: string;
  timeAgo: string;
};

export const mockClubs: MockClub[] = [
  {
    id: 'overdue',
    name: 'The Overdue Society',
    memberCount: 12,
    currentBook: {
      title: 'Dune',
      author: 'Frank Herbert',
      coverUrl: 'https://covers.openlibrary.org/b/id/9251896-L.jpg',
      totalChapters: 48,
      blurb:
        'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
    },
    statusLabel: 'Current discussion: Chapter 18',
    myProgressPercent: 65,
    nextVoteDays: null,
  },
  {
    id: 'classic-lit',
    name: 'Classic Lit SF',
    memberCount: 8,
    currentBook: {
      title: '1984',
      author: 'George Orwell',
      coverUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
      totalChapters: 24,
      blurb: 'A dystopian novel about totalitarianism, surveillance, and truth.',
    },
    statusLabel: 'Next Vote: 3 days',
    myProgressPercent: null,
    nextVoteDays: 3,
  },
];

export const mockMembers: MockMember[] = [
  { id: '1', name: 'Aisha', role: 'admin', chapter: 19, avatarColor: '#5C7A6A' },
  { id: '2', name: 'Ben', chapter: 18, avatarColor: '#8FA68A' },
  { id: '3', name: 'Chloe', chapter: 17, avatarColor: '#6B5344' },
  { id: '4', name: 'Dan', chapter: 16, avatarColor: '#2F4A3C' },
  { id: '5', name: 'Eva', chapter: 15, avatarColor: '#9A8C7E' },
];

export const mockCandidates: MockCandidate[] = [
  {
    id: 'c1',
    title: 'Circe',
    author: 'Madeline Miller',
    coverUrl: 'https://covers.openlibrary.org/b/id/9255458-M.jpg',
    totalChapters: 28,
    votes: 4,
  },
  {
    id: 'c2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://covers.openlibrary.org/b/id/10521370-M.jpg',
    totalChapters: 31,
    votes: 2,
  },
  {
    id: 'c3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverUrl: 'https://covers.openlibrary.org/b/id/9251891-M.jpg',
    totalChapters: 25,
    votes: 1,
  },
];

export const mockCommentsByChapter: Record<number, MockComment[]> = {
  18: [
    {
      id: 'cm1',
      author: 'Ben',
      body: 'The politics on Arrakis are getting intense. Who else is rooting for Paul here?',
      timeAgo: '2 hours ago',
    },
    {
      id: 'cm2',
      author: 'Chloe',
      body: 'That desert crossing scene hit harder than I expected.',
      timeAgo: '5 hours ago',
    },
  ],
  17: [
    {
      id: 'cm3',
      author: 'Dan',
      body: 'Still thinking about that council scene.',
      timeAgo: '1 day ago',
    },
  ],
};

/** Demo: the signed-in user's reading progress */
export const mockMyChapter = 18;
