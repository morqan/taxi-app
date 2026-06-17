import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Taxi</Text>
          <Text style={styles.subtitle}>Bare React Native 0.86 · каркас senior-2026</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
});

export default App;
