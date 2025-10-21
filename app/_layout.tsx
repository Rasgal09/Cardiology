import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Este será el orden de prioridad de las rutas */}
        <Stack.Screen name="(auth)" /> 
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Individual" />
      </Stack>
    </SafeAreaProvider>
  );
}
