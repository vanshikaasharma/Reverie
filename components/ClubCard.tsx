import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, type Href } from 'expo-router';

import { BookCover } from '@/components/BookCover';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import type { MockClub } from '@/src/data/mock';

type Props = {
  club: MockClub;
};

export function ClubCard({ club }: Props) {
  const book = club.currentBook;
  const href = `/club/${club.id}` as Href;

  return (
    <Link href={href} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={styles.row}>
          {book ? <BookCover uri={book.coverUrl} width={78} height={116} /> : null}
          <View style={styles.body}>
            <Text style={styles.name}>{club.name}</Text>
            {book ? (
              <Text style={styles.meta}>
                {book.title} · {book.author}
              </Text>
            ) : null}
            <Text style={styles.members}>{club.memberCount} Members</Text>
            <Text style={styles.status}>{club.statusLabel}</Text>
            {club.myProgressPercent != null ? (
              <View style={styles.progressWrap}>
                <View style={styles.progressTrack}>
                  <View
                    style={[styles.progressFill, { width: `${club.myProgressPercent}%` }]}
                  />
                </View>
                <Text style={styles.progressLabel}>{club.myProgressPercent}%</Text>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Link>
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
  pressed: {
    opacity: 0.92,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: fonts.serifBold,
    fontSize: 20,
    color: colors.ink,
    marginBottom: 4,
  },
  meta: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.inkMuted,
  },
  members: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.inkFaint,
    marginTop: 6,
  },
  status: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.forest,
    marginTop: 8,
  },
  progressWrap: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.creamDark,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.forest,
    borderRadius: radii.pill,
  },
  progressLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.inkMuted,
    minWidth: 32,
    textAlign: 'right',
  },
});
