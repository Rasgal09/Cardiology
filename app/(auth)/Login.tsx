// React, React Native y Expo
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TextInput, View, ScrollView,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componentes
import Logo from "../components/Logo"

// Funciones y hooks
import { loginWeb, loginMobile } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

// Estilos
const Colors = {
  primary: "#F44336",
  primaryDark: "#8E271F",
  primaryLight: "#FFEBEE",
  background: "#F5F7FA",
  cardBackground: "#FFFFFF",
  inputBackground: "#FFFFFF",
  inputBorder: "#D1D9E6",
  inputBorderFocused: "#F44336",
  textPrimary: "#1A1F36",
  textSecondary: "#6B7280",
  textPlaceholder: "#9CA3AF",
  white: "#FFFFFF",
  black: "#000000",
  error: "#F44336",
  success: "#059669",
}

function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = true,
}: {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  autoCorrect?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused]}
      placeholder={placeholder}
      placeholderTextColor={Colors.textPlaceholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  )
}

function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useAuth();

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const user = Platform.OS === "web" ? await loginWeb(formData) : await loginMobile(formData);

    if(user.detail || !user){
      alert("Error al iniciar sesión, vuelva intentarlo más tarde");
      return;
    }

    login(user);
    router.replace("/(tabs)/Home");
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.headerSection}>
              <View style={styles.logoContainer}>
                <Logo size={100}/>
              </View>
              <Text style={styles.welcomeText}>Bienvenido</Text>
              <Text style={styles.subtitleText}>Ingresa tus datos para continuar</Text>
            </View>

            <View style={styles.formSection}>
              <View style={styles.formCard}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Correo electrónico</Text>
                  <Input
                    placeholder="hola@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Contraseña</Text>
                  <Input
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={() => {
                    /* Navegar a recuperar contraseña */
                  }}
                >
                  <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <Button title="Iniciar Sesión" onPress={handleLogin} />
                </View>
              </View>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpQuestion}>¿No tienes cuenta? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/SignUp")}>
                  <Text style={styles.signUpLink}>Crear cuenta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: "400",
    textAlign: "center",
  },
  formSection: {
    flex: 1,
  },
  formCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 24,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: "400",
  },
  inputFocused: {
    borderColor: Colors.inputBorderFocused,
    borderWidth: 2,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 4,
    marginBottom: 28,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 20,
  },
  signUpQuestion: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: "400",
  },
  signUpLink: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: "700",
  },
})
