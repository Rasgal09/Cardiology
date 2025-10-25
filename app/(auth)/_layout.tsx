// app/(auth)/_layout.tsx
import { useAuth } from '../context/AuthContext';
import { Redirect, Slot } from 'expo-router';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/Home" />;
  }

  return <Slot />;
}