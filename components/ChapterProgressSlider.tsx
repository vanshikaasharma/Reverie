import Slider from '@react-native-community/slider';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';

type Props = {
  value: number;
  max: number;
  onChange: (chapter: number) => void;
};

export function ChapterProgressSlider({ value, max, onChange }: Props) {
  const mid = Math.max(1, Math.round(max / 2));

  return (
    <View style={styles.wrap}>
      <Text style={styles.current}>Ch {value}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={max}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={colors.forest}
        maximumTrackTintColor={colors.creamDark}
        thumbTintColor={colors.forestSoft}
      />
      <View style={styles.labels}>
        <Text style={styles.label}>Ch 0</Text>
        <Text style={styles.label}>Ch {mid}</Text>
        <Text style={styles.label}>Ch {max}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  current: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.ink,
    marginBottom: 4,
  },
  slider: {
    width: '100%',
    height: 36,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.inkFaint,
  },
});
