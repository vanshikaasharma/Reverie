import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BookCover } from '@/components/BookCover';
import { ChapterCard } from '@/components/ChapterCard';
import { ChapterProgressSlider } from '@/components/ChapterProgressSlider';
import { MemberProgressRow } from '@/components/MemberProgressRow';
import { VoteCard } from '@/components/VoteCard';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import {
  mockCandidates,
  mockClubs,
  mockCommentsByChapter,
  mockMembers,
  mockMyChapter,
} from '@/src/data/mock';

type Tab = 'discussion' | 'voting';

export default function ClubDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const club = mockClubs.find((c) => c.id === id) ?? mockClubs[0];
  const book = club.currentBook;

  const [tab, setTab] = useState<Tab>('discussion');
  const [myChapter, setMyChapter] = useState(mockMyChapter);
  const [expandedChapter, setExpandedChapter] = useState(mockMyChapter);
  const [votes, setVotes] = useState(mockCandidates);
  const [selectedId, setSelectedId] = useState<string | null>(mockCandidates[0]?.id ?? null);

  const chapters = useMemo(() => {
    const total = book?.totalChapters ?? 24;
    // Show a window around the user's progress for the demo
    const start = Math.max(1, myChapter - 1);
    const end = Math.min(total, myChapter + 3);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [book?.totalChapters, myChapter]);

  function handleVote(candidateId: string) {
    setSelectedId(candidateId);
    setVotes((prev) =>
      prev.map((b) => {
        if (b.id === candidateId) return { ...b, votes: b.votes + (selectedId === candidateId ? 0 : 1) };
        if (b.id === selectedId) return { ...b, votes: Math.max(0, b.votes - 1) };
        return b;
      }),
    );
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: club.name }} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {book ? (
          <View style={styles.bookCard}>
            <BookCover uri={book.coverUrl} width={88} height={132} />
            <View style={styles.bookBody}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <Text style={styles.bookBlurb} numberOfLines={4}>
                {book.blurb}
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.tabs}>
          <Pressable style={styles.tab} onPress={() => setTab('discussion')}>
            <Text style={[styles.tabLabel, tab === 'discussion' && styles.tabLabelActive]}>
              Discussion
            </Text>
            {tab === 'discussion' ? <View style={styles.tabUnderline} /> : null}
          </Pressable>
          <Pressable style={styles.tab} onPress={() => setTab('voting')}>
            <Text style={[styles.tabLabel, tab === 'voting' && styles.tabLabelActive]}>
              Voting
            </Text>
            {tab === 'voting' ? <View style={styles.tabUnderline} /> : null}
          </Pressable>
        </View>

        {tab === 'discussion' ? (
          <>
            <View style={styles.membersBlock}>
              <MemberProgressRow members={mockMembers} />
            </View>

            {chapters.map((chapter) => {
              const locked = chapter > myChapter;
              const isFocusedLocked = locked && chapter === myChapter + 1;

              if (isFocusedLocked) {
                return (
                  <View key={chapter} style={styles.lockedFocus}>
                    <View style={styles.unlockBanner}>
                      <Text style={styles.unlockBannerText}>
                        Read to Chapter {chapter} to unlock this discussion.
                      </Text>
                    </View>
                    <View style={styles.blurCard}>
                      <Text style={styles.blurTitle}>Chapter {chapter}</Text>
                      <View style={styles.blurBody}>
                        <Text style={styles.blurLine} />
                        <Text style={styles.blurLineShort} />
                        <Text style={styles.blurLine} />
                      </View>
                      <View style={styles.lockOverlay}>
                        <Ionicons name="lock-closed" size={36} color={colors.lock} />
                      </View>
                    </View>
                  </View>
                );
              }

              return (
                <ChapterCard
                  key={chapter}
                  chapter={chapter}
                  locked={locked}
                  expanded={!locked && expandedChapter === chapter}
                  comments={mockCommentsByChapter[chapter] ?? []}
                  onToggle={() =>
                    setExpandedChapter((prev) => (prev === chapter ? -1 : chapter))
                  }
                />
              );
            })}
          </>
        ) : (
          <View style={styles.votingBlock}>
            {votes.map((candidate) => (
              <VoteCard
                key={candidate.id}
                book={candidate}
                selected={selectedId === candidate.id}
                onVote={() => handleVote(candidate.id)}
              />
            ))}
            <Pressable style={styles.adminBtn}>
              <Ionicons name="checkmark" size={18} color={colors.white} />
              <Text style={styles.adminBtnText}>Confirm Winner (Admin)</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {tab === 'discussion' && book ? (
        <ChapterProgressSlider
          value={myChapter}
          max={book.totalChapters}
          onChange={(chapter) => {
            setMyChapter(chapter);
            if (chapter >= expandedChapter) {
              setExpandedChapter(chapter);
            }
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  bookCard: {
    flexDirection: 'row',
    gap: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  bookBody: {
    flex: 1,
  },
  bookTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 24,
    color: colors.ink,
  },
  bookAuthor: {
    marginTop: 4,
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.inkMuted,
  },
  bookBlurb: {
    marginTop: spacing.sm,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: colors.inkMuted,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xxl,
    marginBottom: spacing.lg,
  },
  tab: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    color: colors.inkFaint,
  },
  tabLabelActive: {
    color: colors.ink,
  },
  tabUnderline: {
    marginTop: 6,
    height: 3,
    width: '100%',
    backgroundColor: colors.forest,
    borderRadius: 2,
  },
  membersBlock: {
    marginHorizontal: -spacing.lg,
    marginBottom: spacing.lg,
  },
  lockedFocus: {
    marginBottom: spacing.md,
  },
  unlockBanner: {
    backgroundColor: colors.sage,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  unlockBannerText: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
  blurCard: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 160,
    overflow: 'hidden',
  },
  blurTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 18,
    color: colors.inkMuted,
    marginBottom: spacing.md,
  },
  blurBody: {
    gap: 10,
    opacity: 0.35,
  },
  blurLine: {
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.inkFaint,
  },
  blurLineShort: {
    height: 12,
    width: '70%',
    borderRadius: 6,
    backgroundColor: colors.inkFaint,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 239, 230, 0.35)',
  },
  votingBlock: {
    paddingBottom: spacing.xl,
  },
  adminBtn: {
    marginTop: spacing.sm,
    backgroundColor: colors.forest,
    borderRadius: radii.pill,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  adminBtnText: {
    fontFamily: fonts.sansMedium,
    fontSize: 15,
    color: colors.white,
  },
});
