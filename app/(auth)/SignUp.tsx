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
  error: "#F44336", // Color de error
  success: "#059669",
}

// --- COMPONENTE INPUT MODIFICADO ---
// Añadimos la prop 'error'
function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = true,
  error, // Nueva prop
}: {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  autoCorrect?: boolean
  error?: string // Prop de error opcional
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasError = !!error // Convertimos a booleano

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused, // Estilo cuando está enfocado
          hasError && styles.inputError, // Estilo cuando hay error
        ]}
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
      {/* Mostrar el mensaje de error si existe */}
      {hasError && <Text style={styles.errorText}>{error}</Text>}
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

// --- PANTALLA DE REGISTRO MODIFICADA ---
export default function SignUpScreen() {
  const router = useRouter()

  // Nuevos estados para los campos
  const [nombre, setNombre] = useState("")
  const [apellidoPaterno, setApellidoPaterno] = useState("")
  const [apellidoMaterno, setApellidoMaterno] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Estado para manejar los errores de validación
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSignUp = async () => {
    // --- 1. Lógica de Validación ---
    const validationErrors: Record<string, string> = {}

    // Validar campos requeridos
    if (!nombre.trim()) {
      validationErrors.nombre = "El nombre es requerido."
    }
    if (!apellidoPaterno.trim()) {
      validationErrors.apellidoPaterno = "El apellido paterno es requerido."
    }
    if (!email.trim()) {
      validationErrors.email = "El correo es requerido."
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "El formato de correo no es válido."
    }
    if (!password) {
      validationErrors.password = "La contraseña es requerida."
    } else if (password.length < 8) {
      validationErrors.password = "La contraseña debe tener al menos 8 caracteres."
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Las contraseñas no coinciden."
    }
    if (!termsAccepted) {
      validationErrors.terms = "Debes aceptar los términos y condiciones."
    }

    // --- 2. Actualizar estado de errores ---
    setErrors(validationErrors)

    // Si hay errores (el objeto no está vacío), detener la ejecución
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const newUser = {
      name: nombre.trim(),
      last_name_f: apellidoPaterno.trim(),
      last_name_m: apellidoMaterno.trim() || undefined,
      email: email.trim().toLowerCase(),
      password,
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_URL_BACK}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        alert(errorData.message || "Error al crear la cuenta. Por favor, intenta de nuevo.")
        return
      }

      const data = await response.json()
      console.log("Usuario registrado:", data)

      router.replace("/(tabs)/Home")
    } catch (error) {
      console.error("Error de red en el registro:", error)
      alert("Ocurrió un error de red. Por favor, verifica tu conexión.")
    }
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
                {/* --- NUEVOS CAMPOS --- */}
                <Input
                  label="Nombre *"
                  placeholder="Escribe tu nombre"
                  value={nombre}
                  onChangeText={setNombre}
                  autoCapitalize="words"
                  autoCorrect={false}
                  error={errors.nombre}
                />
                <Input
                  label="Apellido Paterno *"
                  placeholder="Escribe tu apellido paterno"
                  value={apellidoPaterno}
                  onChangeText={setApellidoPaterno}
                  autoCapitalize="words"
                  autoCorrect={false}
                  error={errors.apellidoPaterno}
                />
                <Input
                  label="Apellido Materno"
                  placeholder="Opcional"
                  value={apellidoMaterno}
                  onChangeText={setApellidoMaterno}
                  autoCapitalize="words"
                  autoCorrect={false}
                  error={errors.apellidoMaterno}
                />

                {/* --- CAMPOS EXISTENTES (con asterisco y error) --- */}
                <Input
                  label="Correo electrónico *"
                  placeholder="tu@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email}
                />
                <Input
                  label="Contraseña *"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.password}
                />
                <Input
                  label="Confirmar contraseña *"
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.confirmPassword}
                />

                {/* --- NUEVO CHECKBOX DE TÉRMINOS --- */}
                <View style={styles.termsRow}>
                  <TouchableOpacity
                    style={[styles.checkbox, termsAccepted && styles.checkboxActive]}
                    onPress={() => setTermsAccepted(!termsAccepted)}
                    activeOpacity={0.7}
                  >
                    {termsAccepted && <Text style={styles.checkboxCheck}>✓</Text>}
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    Acepto los <Text style={styles.termsLink}>Términos y Condiciones</Text> y la{" "}
                    <Text style={styles.termsLink}>Política de Privacidad</Text>
                  </Text>
                </View>
                {/* Mensaje de error para el checkbox */}
                {errors.terms && <Text style={[styles.errorText, { marginBottom: 16 }]}>{errors.terms}</Text>}

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

              {/* El texto de términos y condiciones ahora está DENTRO del 'formCard' junto al checkbox */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

// --- ESTILOS ACTUALIZADOS ---
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
  // --- NUEVO ESTILO DE ERROR PARA INPUT ---
  inputError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  // --- NUEVO ESTILO PARA TEXTO DE ERROR ---
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 5,
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
  // --- NUEVOS ESTILOS PARA CHECKBOX Y TÉRMINOS ---
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4, // Reducido el margen superior
    marginBottom: 8, // Espacio antes del botón o del error
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxCheck: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 12,
  },
  termsText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    flex: 1, // Para que el texto se ajuste (wrap)
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: "600",
  },
})