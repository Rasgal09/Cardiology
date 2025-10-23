import { Redirect } from 'expo-router';

/**
 * Este archivo (app/index.tsx) es la ruta raíz ('/') de la aplicación.
 * Redirige inmediatamente al Home Screen dentro del grupo (tabs).
 */
export default function Index() {
  // Redirige directamente al Home Screen dentro del grupo (tabs).
  return <Redirect href="/(tabs)/Home" />;
}
