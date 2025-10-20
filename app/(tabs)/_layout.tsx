import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Ocultamos el tab bar por defecto de Expo
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="scanner" />
      <Tabs.Screen name="historial" />
      <Tabs.Screen name="cuidados" />
      <Tabs.Screen name="emergencia" />
    </Tabs>
  );
}