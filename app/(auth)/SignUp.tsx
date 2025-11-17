"use client";

import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { s } from "@/app/components/auth/SignUp/SignUp.styles";
import FormInput from "@/app/components/auth/SignUp/FormInput";
import TermsCheckbox from "@/app/components/auth/SignUp/TermsCheckbox";

export default function SignUpScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignUp = async () => {
    const validationErrors: Record<string, string> = {};

    if (!nombre.trim()) validationErrors.nombre = "El nombre es requerido.";
    if (!apellidoPaterno.trim()) validationErrors.apellidoPaterno = "El apellido paterno es requerido.";
    if (!email.trim()) validationErrors.email = "El correo es requerido.";
    else if (!/\S+@\S+\.\S+/.test(email)) validationErrors.email = "El formato de correo no es válido.";
    if (!password) validationErrors.password = "La contraseña es requerida.";
    else if (password.length < 8) validationErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    if (password !== confirmPassword) validationErrors.confirmPassword = "Las contraseñas no coinciden.";
    if (!termsAccepted) validationErrors.terms = "Debes aceptar los términos y condiciones.";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const newUser = {
      name: nombre.trim(),
      last_name_f: apellidoPaterno.trim(),
      last_name_m: apellidoMaterno.trim() || undefined,
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_URL_BACK}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.message || "Error al crear la cuenta. Por favor, intenta de nuevo.");
        return;
      }
      await res.json();
      router.replace("/(tabs)/Home");
    } catch (e) {
      console.error("Error de red en el registro:", e);
      alert("Ocurrió un error de red. Por favor, verifica tu conexión.");
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={s.keyboardView}>
        <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={s.content}>
            <View style={s.headerSection}>
              <Text style={s.welcomeText}>Crear Cuenta</Text>
              <Text style={s.subtitleText}>Únete a nuestra comunidad médica</Text>
            </View>

            <View style={s.formSection}>
              <View style={s.formCard}>
                <FormInput
                  label="Nombre *" placeholder="Escribe tu nombre"
                  value={nombre} onChangeText={setNombre}
                  autoCapitalize="words" autoCorrect={false}
                  error={errors.nombre}
                />
                <FormInput
                  label="Apellido Paterno *" placeholder="Escribe tu apellido paterno"
                  value={apellidoPaterno} onChangeText={setApellidoPaterno}
                  autoCapitalize="words" autoCorrect={false}
                  error={errors.apellidoPaterno}
                />
                <FormInput
                  label="Apellido Materno" placeholder="Opcional"
                  value={apellidoMaterno} onChangeText={setApellidoMaterno}
                  autoCapitalize="words" autoCorrect={false}
                  error={errors.apellidoMaterno}
                />

                <FormInput
                  label="Correo electrónico *" placeholder="tu@email.com"
                  value={email} onChangeText={setEmail}
                  keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
                  error={errors.email}
                />
                <FormInput
                  label="Contraseña *" placeholder="Mínimo 8 caracteres"
                  value={password} onChangeText={setPassword}
                  secureTextEntry autoCapitalize="none" autoCorrect={false}
                  error={errors.password}
                />
                <FormInput
                  label="Confirmar contraseña *" placeholder="Repite tu contraseña"
                  value={confirmPassword} onChangeText={setConfirmPassword}
                  secureTextEntry autoCapitalize="none" autoCorrect={false}
                  error={errors.confirmPassword}
                />

                <TermsCheckbox
                  checked={termsAccepted}
                  onToggle={() => setTermsAccepted(v => !v)}
                  errorText={errors.terms}
                />

                <View style={s.buttonContainer}>
                  <TouchableOpacity style={s.button} onPress={handleSignUp} activeOpacity={0.8}>
                    <Text style={s.buttonText}>Crear Cuenta</Text>
                  </TouchableOpacity>
                </View>

                <View style={s.loginLinkContainer}>
                  <Text style={s.loginLinkText}>¿Ya tienes cuenta? </Text>
                  <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
                    <Text style={s.loginLink}>Inicia sesión</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}