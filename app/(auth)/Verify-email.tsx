"use client"

import { useRouter, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator, // El spinner
  TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// --- Iconos simples (puedes reemplazarlos con expo-icons) ---
// Usamos SVG o texto simple para no añadir dependencias
// Un checkmark simple
const IconSuccess = () => (
  <View style={[styles.iconContainer, { backgroundColor: Colors.success }]}>
    <Text style={styles.iconText}>✓</Text>
  </View>
)

// Una 'X' simple
const IconError = () => (
  <View style={[styles.iconContainer, { backgroundColor: Colors.error }]}>
    <Text style={styles.iconText}>×</Text>
  </View>
)

// --- Tu componente de Botón (copiado de tu código) ---
function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

// --- Tu paleta de colores (copiada de tu código) ---
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

// --- La nueva pantalla de Verificación ---
export default function VerifyEmailScreen() {
  const router = useRouter()
  const { token } = useLocalSearchParams() // Captura el token de la URL

  // Estados para manejar la UI
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Verificando tu cuenta...")

  // URL de tu backend
  const API_URL = process.env.EXPO_PUBLIC_URL_BACK

  useEffect(() => {
    // Si no hay token en la URL, es un error
    if (!token || typeof token !== "string") {
      setStatus("error")
      setMessage("Enlace inválido. No se encontró un token de verificación.")
      return
    }

    // Función para llamar al backend
    const verifyToken = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }), // Envía el token al backend
        })

        // Si el backend responde OK (200-299)
        if (response.ok) {
          setStatus("success")
          setMessage(
            "Tu correo ha sido verificado con éxito. Ya puedes regresar a la aplicación."
          )
        } else {
          // Si el backend da un error (400, 422, etc.)
          const errorData = await response.json().catch(() => ({}))
          setStatus("error")
          
          if (errorData.detail === "VERIFY_USER_BAD_TOKEN") {
            setMessage("El enlace es inválido o ha expirado. Por favor, solicita uno nuevo.")
          } else if (errorData.detail === "VERIFY_USER_ALREADY_VERIFIED") {
            setStatus("success") // Lo tratamos como éxito
            setMessage("Esta cuenta ya ha sido verificada. Puedes iniciar sesión.")
          } else {
            setMessage("Ocurrió un error al verificar tu cuenta. Intenta de nuevo.")
          }
        }
      } catch (error) {
        console.error("Error de red en la verificación:", error)
        setStatus("error")
        setMessage("Ocurrió un error de red. Por favor, verifica tu conexión.")
      }
    }

    verifyToken()
  }, [token]) // Este efecto se dispara 1 vez cuando el token está listo

  // --- Renderizado Condicional ---
  // Muestra un estado diferente basado en 'status'
  const renderContent = () => {
    switch (status) {
      // 1. ESTADO DE ÉXITO
      case "success":
        return (
          <>
            <IconSuccess />
            <Text style={styles.welcomeText}>¡Verificación Exitosa!</Text>
            <Text style={styles.subtitleText}>{message}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Ir a Iniciar Sesión"
                onPress={() => router.replace("/(auth)/Login")} // Te lleva a Login
              />
            </View>
          </>
        )
      
      // 2. ESTADO DE ERROR
      case "error":
        return (
          <>
            <IconError />
            <Text style={styles.welcomeText}>Error de Verificación</Text>
            <Text style={styles.subtitleText}>{message}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Volver a Inicio"
                onPress={() => router.replace("/(auth)/Login")} // Te lleva a Login
              />
            </View>
          </>
        )
        
      // 3. ESTADO DE CARGA (default)
      default:
        return (
          <>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={[styles.welcomeText, { marginTop: 24 }]}>
              Verificando...
            </Text>
            <Text style={styles.subtitleText}>
              Por favor, espera un momento.
            </Text>
          </>
        )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.formCard}>
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  )
}

// --- ESTILOS ---
// Usamos los mismos nombres de tu SignUpScreen para consistencia
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center", // Centra la tarjeta verticalmente
  },
  content: {
    paddingHorizontal: 24,
  },
  formCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 32, // Más padding para que se vea centrado
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center", // Centra todo el contenido
  },
  welcomeText: {
    fontSize: 24, // Un poco más pequeño que el de SignUp
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 32,
    width: "100%", // Hace que el botón ocupe todo el ancho de la tarjeta
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
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
  // Estilos para los íconos de Éxito/Error
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36, // Círculo perfecto
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  iconText: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: "bold",
  },
})