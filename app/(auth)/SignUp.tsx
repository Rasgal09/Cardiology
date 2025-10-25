"use client"

import { useRouter } from "expo-router"
import { useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

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
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = true,
}: {
  label: string
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
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
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
    </View>
  )
}

function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default function SignUpScreen() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    router.replace("/(tabs)/Home")
  }

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
              <Text style={styles.welcomeText}>Crear Cuenta</Text>
              <Text style={styles.subtitleText}>Únete a nuestra comunidad médica</Text>
            </View>

            <View style={styles.formSection}>
              <View style={styles.formCard}>
                <Input
                  label="Correo electrónico"
                  placeholder="messielmejor@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <Input
                  label="Contraseña"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <Input
                  label="Confirmar contraseña"
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <View style={styles.buttonContainer}>
                  <Button title="Crear Cuenta" onPress={handleSignUp} />
                </View>

                <View style={styles.loginLinkContainer}>
                  <Text style={styles.loginLinkText}>¿Ya tienes cuenta? </Text>
                  <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
                    <Text style={styles.loginLink}>Inicia sesión</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.termsText}>
                Al crear una cuenta, aceptas nuestros <Text style={styles.termsLink}>Términos y Condiciones</Text> y{" "}
                <Text style={styles.termsLink}>Política de Privacidad</Text>
              </Text>
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
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginLinkText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: "400",
  },
  loginLink: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: "700",
  },
  termsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 28,
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: "600",
  },
})
