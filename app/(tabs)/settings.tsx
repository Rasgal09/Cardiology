import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/context/AuthContext';
import { Colors } from '@/app/constants/Colors';
import { Mail, Lock, Bell, CheckCircle, Share2, Info, LogOut } from 'lucide-react-native';
import SettingsHeader from '@/app/components/tabs/Settings/SettingsHeader';
import SettingItem from '@/app/components/tabs/Settings/SettingItem';
import { s } from '@/app/components/tabs/Settings/Settings.styles';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleUpdateProfile = (setting: string) => {
    Alert.alert('Funcionalidad Pendiente', `Abrir formulario para ${setting}.`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar la sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/Login');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <SettingsHeader onBack={() => router.back()} />

      <ScrollView contentContainerStyle={s.scrollContent}>
        {/* Cuenta */}
        <Text style={s.sectionTitle}>Cuenta</Text>
        <View style={s.card}>
          <SettingItem title="Cambiar Correo Electrónico" icon={Mail} onPress={() => handleUpdateProfile('Correo')} />
          <SettingItem title="Cambiar Contraseña" icon={Lock} onPress={() => handleUpdateProfile('Contraseña')} isLast />
        </View>

        {/* Preferencias */}
        <Text style={s.sectionTitle}>Preferencias</Text>
        <View style={s.card}>
          <SettingItem title="Notificaciones" icon={Bell} onPress={() => handleUpdateProfile('Notificaciones')} />
          <SettingItem title="Permisos de Dispositivo" icon={CheckCircle} onPress={() => handleUpdateProfile('Permisos')} isLast />
        </View>

        {/* Acerca de */}
        <Text style={s.sectionTitle}>Acerca de</Text>
        <View style={s.card}>
          <SettingItem title="Compartir Aplicación" icon={Share2} onPress={() => Alert.alert('Compartir', '¡Comparte esta app con tus amigos!')} />
          <SettingItem title="Información Legal" icon={Info} onPress={() => Alert.alert('Información', 'Términos y Condiciones / Política de Privacidad')} isLast />
        </View>

        {/* Logout */}
        <View style={s.logoutButton}>
          <LogOut size={22} color={Colors.white} style={s.logoutIcon} />
          <Text onPress={handleLogout} style={s.logoutButtonText}>Cerrar Sesión</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}