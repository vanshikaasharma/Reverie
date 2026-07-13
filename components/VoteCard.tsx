import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BookCover } from '@/components/BookCover';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import type { MockCandidate } from '@/src/data/mock';

type Props = {
  book: MockCandidate;
  selected?: boolean;
  onVote?: () => void;
};

export function VoteCard({ book, selected = false, onVote }: Props) {
  return (
    <View style={[styles.card, selected && styles.selected]}>
      <BookCover uri={book.coverUrl} width={56} height={84} />
      <View style={styles.body}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.chapters}>Total Chapters · {book.totalChapters}</Text>
      </View>
      <View style={styles.voteCol}>
        {selected ? (
          <Ionicons name="checkmark-circle" size={22} color={colors.forest} />
        ) : (
          <View style={styles.checkPlaceholder} />
        )}
        <Text style={styles.votes}>
          {book.votes} {book.votes === 1 ? 'vote' : 'votes'}
        </Text>
        <Pressable style={styles.voteBtn} onPress={onVote}>
          <Text style={styles.voteBtnText}>Vote</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selected: {
    borderColor: colors.forestSoft,
  },
  body: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 16,
    color: colors.ink,
  },
  author: {
    marginTop: 2,
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.inkMuted,
  },
  chapters: {
    marginTop: 6,
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.inkFaint,
  },
  voteCol: {
    alignItems: 'flex-end',
    gap: 6,
  },
  checkPlaceholder: {
    width: 22,
    height: 22,
  },
  votes: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.inkMuted,
  },
  voteBtn: {
    backgroundColor: colors.creamDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  voteBtnText: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.forest,
  },
});
