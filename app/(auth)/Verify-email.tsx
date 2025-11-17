"use client";

import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import { s } from "@/app/components/auth/Verify-email/Verify.styles";
import StatusIcon from "@/app/components/auth/Verify-email/StatusIcon";
import PrimaryButton from "@/app/components/auth/Login/PrimaryButton"; // reutilizamos el botón
import { Colors } from "@/app/constants/Colors";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token?: string }>();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verificando tu cuenta...");

  const API_URL = process.env.EXPO_PUBLIC_URL_BACK;

  useEffect(() => {
    if (!token || typeof token !== "string") {
      setStatus("error");
      setMessage("Enlace inválido. No se encontró un token de verificación.");
      return;
    }
    const verifyToken = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus("success");
          setMessage("Tu correo ha sido verificado con éxito. Ya puedes regresar a la aplicación.");
          return;
        }

        const errorData = await res.json().catch(() => ({}));
        if (errorData.detail === "VERIFY_USER_BAD_TOKEN") {
          setStatus("error");
          setMessage("El enlace es inválido o ha expirado. Por favor, solicita uno nuevo.");
        } else if (errorData.detail === "VERIFY_USER_ALREADY_VERIFIED") {
          setStatus("success");
          setMessage("Esta cuenta ya ha sido verificada. Puedes iniciar sesión.");
        } else {
          setStatus("error");
          setMessage("Ocurrió un error al verificar tu cuenta. Intenta de nuevo.");
        }
      } catch (e) {
        console.error("verify error:", e);
        setStatus("error");
        setMessage("Ocurrió un error de red. Por favor, verifica tu conexión.");
      }
    };
    verifyToken();
  }, [token]);

  const renderContent = () => {
    if (status === "success") {
      return (
        <>
          <StatusIcon kind="success" />
          <Text style={s.welcomeText}>¡Verificación Exitosa!</Text>
          <Text style={s.subtitleText}>{message}</Text>
          <View style={s.buttonContainer}>
            <PrimaryButton title="Ir a Iniciar Sesión" onPress={() => router.replace("/(auth)/Login")} />
          </View>
        </>
      );
    }
    if (status === "error") {
      return (
        <>
          <StatusIcon kind="error" />
          <Text style={s.welcomeText}>Error de Verificación</Text>
          <Text style={s.subtitleText}>{message}</Text>
          <View style={s.buttonContainer}>
            <PrimaryButton title="Volver a Inicio" onPress={() => router.replace("/(auth)/Login")} />
          </View>
        </>
      );
    }
    // loading
    return (
      <>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={[s.welcomeText, { marginTop: 24 }]}>Verificando...</Text>
        <Text style={s.subtitleText}>Por favor, espera un momento.</Text>
      </>
    );
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.content}>
        <View style={s.formCard}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}