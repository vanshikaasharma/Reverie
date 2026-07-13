import { Image, StyleSheet, View, type ViewStyle } from 'react-native';

import { radii } from '@/constants/theme';

type Props = {
  uri: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
};

export function BookCover({ uri, width = 72, height = 108, style }: Props) {
  return (
    <View style={[styles.frame, { width, height }, style]}>
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: radii.sm,
    overflow: 'hidden',
    backgroundColor: '#D9D0C3',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
