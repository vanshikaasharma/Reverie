import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';
import type { MockMember } from '@/src/data/mock';

type Props = {
  members: MockMember[];
};

export function MemberProgressRow({ members }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {members.map((member, index) => (
        <View key={member.id} style={styles.item}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: member.avatarColor },
              index === 0 && styles.avatarActive,
            ]}>
            <Text style={styles.initial}>{member.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {member.name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {member.role === 'admin' ? 'admin · ' : ''}
            Ch {member.chapter}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  item: {
    width: 64,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarActive: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colors.forest,
  },
  initial: {
    fontFamily: fonts.sansBold,
    color: colors.white,
    fontSize: 18,
  },
  name: {
    marginTop: 6,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.ink,
  },
  meta: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.inkMuted,
  },
});
