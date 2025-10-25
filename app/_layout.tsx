import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      { /* El contexto (AuthProvider) le pasara los datos necesarios a los demás componentes para la autenticación */ }
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Este será el orden de prioridad de las rutas */}
          <Stack.Screen name="(auth)" /> 
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Individual" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
