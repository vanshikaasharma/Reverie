import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClubCard } from '@/components/ClubCard';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import { mockClubs } from '@/src/data/mock';

export default function ClubsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.logoMark}>
          <Text style={styles.logoLetter}>R</Text>
        </View>
        <Text style={styles.title}>My Clubs</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.inkFaint} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.inkFaint}
          style={styles.searchInput}
          editable={false}
        />
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {mockClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </ScrollView>

      <Pressable style={styles.fab}>
        <Text style={styles.fabText}>Create or Join Club</Text>
        <View style={styles.fabPlus}>
          <Ionicons name="add" size={22} color={colors.forest} />
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontFamily: fonts.serifBold,
    color: colors.white,
    fontSize: 18,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.serifBold,
    fontSize: 22,
    color: colors.ink,
  },
  headerSpacer: {
    width: 36,
  },
  searchWrap: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.ink,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.forest,
    borderRadius: radii.pill,
    paddingLeft: spacing.lg,
    paddingRight: 6,
    paddingVertical: 6,
  },
  fabText: {
    fontFamily: fonts.sansMedium,
    color: colors.white,
    fontSize: 14,
  },
  fabPlus: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
