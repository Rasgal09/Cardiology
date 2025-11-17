"use client";

import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import HomeHeader from "@/app/components/tabs/Home/HomeHeader";
import MainHeroCard from "@/app/components/tabs/Home/MainHeroCard";
import OptionCard from "@/app/components/tabs/Home/OptionCard";
import DisclaimerBanner from "@/app/components/tabs/Home/DisclaimerBanner";
import Navbar from "@/app/components/Navbar";
import { s } from "@/app/components/tabs/Home/Home.styles";
import { useAuth } from "@/app/context/AuthContext";
import { History, Heart, Siren } from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const userName = user?.name || "Usuario";

  const bottomPaddingForNavbar = 20 + (insets.bottom || 0);
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <SafeAreaView style={s.container} edges={["top"]}>
      <HomeHeader
        dateLabel={today}
        userName={userName}
        onSettings={() => router.push("/(tabs)/settings")}
      />
      <ScrollView
        style={s.content}
        contentContainerStyle={[s.scrollContent, { paddingBottom: bottomPaddingForNavbar }]}
      >
        <MainHeroCard onPress={() => router.push("/(tabs)/Scanner")} />
        <Text style={s.sectionTitle}>Otras Opciones</Text>
        <OptionCard title="Historial de Mediciones" icon={History} onPress={() => router.push("/(tabs)/Historial")} />
        <OptionCard title="Cuidados del Corazón" icon={Heart} onPress={() => router.push("/(tabs)/Care")} />
        <OptionCard title="Emergencia Rápida" icon={Siren} onPress={() => router.push("/(tabs)/Emergency")} />
        <DisclaimerBanner />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
}