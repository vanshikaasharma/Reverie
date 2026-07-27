import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, fonts, radii, spacing } from '@/constants/theme';

type Mode = 'create' | 'join';

export default function CreateJoinModal() {
  const [mode, setMode] = useState<Mode>('create');
  const [clubName, setClubName] = useState('');
  const [description, setDescription] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit() {
    if (mode === 'create') {
      if (clubName.trim().length < 2) {
        setMessage('Give your club a name.');
        return;
      }
      setMessage(`“${clubName.trim()}” will be created once the API is wired.`);
      return;
    }

    if (inviteCode.trim().length < 4) {
      setMessage('Enter a valid invite code.');
      return;
    }
    setMessage(`Invite “${inviteCode.trim().toUpperCase()}” will join once the API is wired.`);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Create or Join</Text>
      <Text style={styles.subtitle}>Start a club or enter an invite code from a friend.</Text>

      <View style={styles.segment}>
        <Pressable
          style={[styles.segmentBtn, mode === 'create' && styles.segmentActive]}
          onPress={() => {
            setMode('create');
            setMessage(null);
          }}>
          <Text style={[styles.segmentText, mode === 'create' && styles.segmentTextActive]}>
            Create
          </Text>
        </Pressable>
        <Pressable
          style={[styles.segmentBtn, mode === 'join' && styles.segmentActive]}
          onPress={() => {
            setMode('join');
            setMessage(null);
          }}>
          <Text style={[styles.segmentText, mode === 'join' && styles.segmentTextActive]}>
            Join
          </Text>
        </Pressable>
      </View>

      {mode === 'create' ? (
        <View style={styles.form}>
          <Text style={styles.label}>Club name</Text>
          <TextInput
            value={clubName}
            onChangeText={setClubName}
            placeholder="The Overdue Society"
            placeholderTextColor={colors.inkFaint}
            style={styles.input}
          />
          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="What are you reading together?"
            placeholderTextColor={colors.inkFaint}
            style={[styles.input, styles.multiline]}
            multiline
          />
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.label}>Invite code</Text>
          <TextInput
            autoCapitalize="characters"
            value={inviteCode}
            onChangeText={setInviteCode}
            placeholder="ABCD12"
            placeholderTextColor={colors.inkFaint}
            style={styles.input}
          />
        </View>
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Pressable style={styles.primaryBtn} onPress={onSubmit}>
        <Text style={styles.primaryBtnText}>
          {mode === 'create' ? 'Create club' : 'Join club'}
        </Text>
      </Pressable>

      <Pressable style={styles.cancelBtn} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: spacing.xl,
  },
  title: {
    fontFamily: fonts.serifBold,
    fontSize: 26,
    color: colors.ink,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.inkMuted,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.creamDark,
    borderRadius: radii.pill,
    padding: 4,
    marginBottom: spacing.lg,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: colors.card,
  },
  segmentText: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.inkFaint,
  },
  segmentTextActive: {
    color: colors.ink,
  },
  form: { gap: spacing.sm },
  label: {
    marginTop: spacing.sm,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.inkMuted,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    fontFamily: fonts.sans,
    fontSize: 16,
    color: colors.ink,
  },
  multiline: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  message: {
    marginTop: spacing.md,
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.forest,
  },
  primaryBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.forest,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: fonts.sansMedium,
    fontSize: 16,
    color: colors.white,
  },
  cancelBtn: {
    marginTop: spacing.md,
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelText: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.inkMuted,
  },
});
