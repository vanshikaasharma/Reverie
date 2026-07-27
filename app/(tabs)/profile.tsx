import { Link, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, radii, spacing } from '@/constants/theme';
import { useAuth } from '@/src/auth/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>?</Text>
          </View>
          <Text style={styles.title}>Welcome to Reverie</Text>
          <Text style={styles.hint}>
            Sign in to sync clubs and keep discussions spoiler-safe across devices.
          </Text>
          <Link href="/auth/login" asChild>
            <Pressable style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Sign in</Text>
            </Pressable>
          </Link>
          <Link href="/auth/signup" asChild>
            <Pressable style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>Create account</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>{user.displayName.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.hint}>{user.email}</Text>
        <Text style={styles.note}>Local demo account — Cognito wiring comes next.</Text>
        <Pressable
          style={styles.secondaryBtn}
          onPress={() => {
            signOut();
            router.push('/auth/login');
          }}>
          <Text style={styles.secondaryBtnText}>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  avatarLetter: {
    fontFamily: fonts.serifBold,
    fontSize: 28,
    color: colors.white,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 26,
    color: colors.ink,
    textAlign: 'center',
  },
  hint: {
    marginTop: spacing.sm,
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.inkMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  note: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.inkFaint,
    textAlign: 'center',
  },
  primaryBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.forest,
    borderRadius: radii.pill,
    paddingVertical: 14,
    paddingHorizontal: spacing.xxl,
    minWidth: 200,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    color: colors.white,
  },
  secondaryBtn: {
    marginTop: spacing.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
  },
  secondaryBtnText: {
    fontFamily: fonts.sansMedium,
    fontSize: 15,
    color: colors.forest,
  },
});
