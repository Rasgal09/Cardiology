import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import StethoscopeLogo from '../components/Logo';
import { Colors } from '../constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Navegar a Home después del login
    router.replace('/(tabs)/Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.logoContainer}>
            <StethoscopeLogo size={180} />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Inicia sesión</Text>

            <View style={styles.inputContainer}>
              <Input
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity onPress={() => router.push('/(auth)/SignUp')}>
              <Text style={styles.linkText}>¿No tienes cuenta? Crea una</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Inicia Sesión" onPress={handleLogin} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.darkGray,
    marginTop: 20,
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  formContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  linkText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 40,
  },
});