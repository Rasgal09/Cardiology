import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import StethoscopeLogo from '../components/Logo';
import { Colors } from '../constants/Colors';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Navegar a Home después del registro
    router.replace('/(tabs)/Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>Crear cuenta</Text>

            <View style={styles.logoContainer}>
              <StethoscopeLogo size={180} />
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Crea tu cuenta</Text>

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

              <View style={styles.inputContainer}>
                <Input
                  placeholder="Confirma contraseña"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity onPress={() => router.push('/(auth)/Login')}>
                <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Crea tu cuenta" onPress={handleSignUp} />
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
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
    marginBottom: 24,
  },
});