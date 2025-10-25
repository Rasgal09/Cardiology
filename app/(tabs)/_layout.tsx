import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function TabsLayout() {

  const { isLoggedIn } = useAuth();

  useEffect (() => {
    console.log("Estado de login en TabsLayout:", isLoggedIn);
  }, [isLoggedIn]); 

  return (
    <>
      {isLoggedIn ? (
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
      ) : (
        <Redirect href="/(auth)/Login" />
      )}
    </>
  );
}