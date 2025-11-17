import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import Logo from '@/app/components/Logo';
import Input from '@/app/components/auth/Login/Input';
import PrimaryButton from '@/app/components/auth/Login/PrimaryButton';
import { s } from '@/app/components/auth/Login/Login.styles';

import { loginWeb, loginMobile } from '@/app/lib/auth';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const user = Platform.OS === 'web' ? await loginWeb(formData) : await loginMobile(formData);

    if (!user || (user as any).detail) {
      alert('Error al iniciar sesión, vuelva intentarlo más tarde');
      return;
    }
    login(user);
    router.replace('/(tabs)/Home');
  };

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.keyboardView}>
        <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={s.content}>
            {/* Header */}
            <View style={s.headerSection}>
              <View style={s.logoContainer}><Logo size={100} /></View>
              <Text style={s.welcomeText}>Bienvenido</Text>
              <Text style={s.subtitleText}>Ingresa tus datos para continuar</Text>
            </View>

            {/* Form */}
            <View style={s.formSection}>
              <View style={s.formCard}>
                <View style={s.inputGroup}>
                  <Text style={s.inputLabel}>Correo electrónico</Text>
                  <Input
                    placeholder="hola@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={s.inputGroup}>
                  <Text style={s.inputLabel}>Contraseña</Text>
                  <Input
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity
                  style={s.forgotPasswordContainer}
                  onPress={() => {/* navegar a recuperar contraseña */}}
                >
                  <Text style={s.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                <View style={s.buttonContainer}>
                  <PrimaryButton title="Iniciar Sesión" onPress={handleLogin} />
                </View>
              </View>

              <View style={s.signUpContainer}>
                <Text style={s.signUpQuestion}>¿No tienes cuenta? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/SignUp')}>
                  <Text style={s.signUpLink}>Crear cuenta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}