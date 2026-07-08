import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function ClubsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reverie</Text>
      <Text style={styles.tagline}>Spoiler-safe book clubs</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.hint}>Your clubs will show up here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  tagline: {
    marginTop: 8,
    fontSize: 16,
    opacity: 0.7,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  hint: {
    fontSize: 15,
    opacity: 0.6,
    textAlign: 'center',
  },
});
