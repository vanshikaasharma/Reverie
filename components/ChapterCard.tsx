import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts, radii, spacing } from '@/constants/theme';
import type { MockComment } from '@/src/data/mock';

type Props = {
  chapter: number;
  locked: boolean;
  expanded?: boolean;
  comments?: MockComment[];
  onToggle?: () => void;
};

export function ChapterCard({
  chapter,
  locked,
  expanded = false,
  comments = [],
  onToggle,
}: Props) {
  if (locked) {
    return (
      <View style={[styles.card, styles.lockedCard]}>
        <View style={styles.lockedHeader}>
          <Text style={styles.lockedTitle}>Chapter {chapter}</Text>
          <Ionicons name="lock-closed" size={16} color={colors.lock} />
        </View>
        <Text style={styles.unlockHint}>Read to Chapter {chapter} to unlock</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Pressable style={styles.header} onPress={onToggle}>
        <Text style={styles.title}>Chapter {chapter}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.inkMuted}
        />
      </Pressable>

      {expanded ? (
        <View style={styles.body}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.commentMeta}>
                {comment.author} · {comment.timeAgo}
              </Text>
              <Text style={styles.commentBody}>{comment.body}</Text>
            </View>
          ))}
          <TextInput
            placeholder={`Share your thoughts on Chapter ${chapter}...`}
            placeholderTextColor={colors.inkFaint}
            style={styles.input}
            editable={false}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lockedCard: {
    opacity: 0.72,
    backgroundColor: colors.creamDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 18,
    color: colors.ink,
  },
  lockedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lockedTitle: {
    fontFamily: fonts.serifBold,
    fontSize: 17,
    color: colors.inkMuted,
  },
  unlockHint: {
    marginTop: spacing.sm,
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.lock,
  },
  body: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
  comment: {
    gap: 4,
  },
  commentMeta: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.inkFaint,
  },
  commentBody: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.ink,
    lineHeight: 22,
  },
  input: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.ink,
    backgroundColor: colors.cream,
  },
});
