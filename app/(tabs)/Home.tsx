"use client"

// Expo, react y React Native
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

// Componentes
import Navbar from "../components/Navbar"
import { Colors } from "../constants/Colors"

// Librerías
import { AlertTriangle, Heart, HeartPulse, History, Settings, Siren, ChevronRight } from "lucide-react-native"

// --- Componente para las tarjetas secundarias (blancas) ---
const CardItem = ({ title, buttonText, onPress, icon: IconComponent, buttonColor = Colors.primary }: any) => (
  <TouchableOpacity style={styles.cardSecondary} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.cardSecondaryContent}>
      {/* Ícono a la izquierda con fondo circular */}
      <View style={styles.iconContainer}>
        <IconComponent size={26} color={Colors.primary} strokeWidth={2.5} />
      </View>

      {/* Texto de la tarjeta */}
      <View style={styles.cardSecondaryTextContainer}>
        <Text style={styles.cardSecondaryTitle}>{title}</Text>
      </View>

      {/* Flecha indicadora */}
      <ChevronRight size={22} color="#999" strokeWidth={2.5} />
    </View>
  </TouchableOpacity>
)

// --- Componente de Advertencia (Disclaimer) ---
const DisclaimerBanner = () => (
  <View style={styles.disclaimerContainer}>
    <View style={styles.disclaimerIconContainer}>
      <AlertTriangle size={22} color={"#F59E0B"} strokeWidth={2.5} />
    </View>
    <Text style={styles.disclaimerText}>
      Esta aplicación no sustituye el diagnóstico ni la consulta de un profesional médico. Utiliza la información como
      referencia.
    </Text>
  </View>
)

export default function HomeScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()

  const { user } = useAuth()

  const [userName, setUserName] = useState("Usuario")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [user])

  const bottomPaddingForNavbar = 20 + (insets.bottom || 0)

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  const isSmallDevice = width < 400
  const isMediumDevice = width < 600

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* --- HEADER --- */}
      <View style={[styles.header, isSmallDevice && styles.headerSmall]}>
        {/* Lado Izquierdo: Mensaje de Bienvenida y Subtítulo */}
        <View style={styles.headerTextGroup}>
          <Text style={[styles.headerSubtitle, isSmallDevice && styles.headerSubtitleSmall]}>Hoy es {today}</Text>
          <Text style={[styles.headerTitleImproved, isSmallDevice && styles.headerTitleSmall]}>
            Hola, {userName} 👋
          </Text>
        </View>

        {/* Lado Derecho: Botón de Ajustes Mejorado */}
        <TouchableOpacity
          style={styles.settingsButtonImproved}
          onPress={() => router.push("/(tabs)/settings")}
          activeOpacity={0.7}
        >
          <Settings size={isMediumDevice ? 20 : 22} color="#666" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPaddingForNavbar }]}
      >
        {/* --- TARJETA PRINCIPAL (ROJA GRANDE) --- */}
        <TouchableOpacity
          style={[styles.mainCard, isMediumDevice && styles.mainCardMedium]}
          onPress={() => router.push("/(tabs)/Scanner")}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mainCardGradient}
          >
            <View style={styles.mainCardIconContainer}>
              <HeartPulse size={isMediumDevice ? 40 : 48} color="#FFF" strokeWidth={2.5} />
            </View>

            <Text style={[styles.mainCardTitle, isSmallDevice && styles.mainCardTitleSmall]}>
              Comenzar{"\n"}Mediciones Hoy
            </Text>
            <Text style={[styles.mainCardSubtitle, isSmallDevice && styles.mainCardSubtitleSmall]}>
              Toma tu pulso y presión arterial en segundos.
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* --- SECCIÓN Otras Opciones --- */}
        <Text style={[styles.sectionTitle, isSmallDevice && styles.sectionTitleSmall]}>Otras Opciones</Text>

        {/* Tarjetas Secundarias */}
        <CardItem
          title="Historial de Mediciones"
          buttonText="Ver"
          onPress={() => router.push("/(tabs)/Historial")}
          icon={History}
        />
        <CardItem
          title="Cuidados del Corazón"
          buttonText="Consejos"
          onPress={() => router.push("/(tabs)/Care")}
          icon={Heart}
        />
        <CardItem
          title="Emergencia Rápida"
          buttonText="Activar"
          onPress={() => router.push("/(tabs)/Emergency")}
          icon={Siren}
        />

        {/* --- BANNER DE ADVERTENCIA --- */}
        <DisclaimerBanner />
      </ScrollView>

      <Navbar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  // --- HEADER ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerSmall: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTextGroup: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
    marginBottom: 4,
  },
  headerSubtitleSmall: {
    fontSize: 12,
    marginBottom: 2,
  },
  headerTitleImproved: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: 0.3,
  },
  headerTitleSmall: {
    fontSize: 22,
    letterSpacing: 0,
  },
  settingsButtonImproved: {
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  // --- Tarjeta Principal (Grande y Roja) ---
  mainCard: {
    borderRadius: 24,
    marginBottom: 32,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#8E271F",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  mainCardMedium: {
    borderRadius: 20,
    marginBottom: 24,
  },
  mainCardGradient: {
    padding: 32,
    minHeight: 220,
    justifyContent: "center",
  },
  mainCardIconContainer: {
    marginBottom: 16,
  },
  mainCardTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFF",
    lineHeight: 38,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  mainCardTitleSmall: {
    fontSize: 26,
    lineHeight: 32,
  },
  mainCardSubtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255,255,255,0.95)",
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  mainCardSubtitleSmall: {
    fontSize: 13,
    lineHeight: 19,
  },

  // --- Título de Sección ---
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  sectionTitleSmall: {
    fontSize: 18,
    marginBottom: 12,
  },

  // --- Tarjetas Secundarias (Lista Blanca) ---
  cardSecondary: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardSecondaryContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(244, 67, 54, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardSecondaryTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardSecondaryTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1A1A1A",
    letterSpacing: 0.2,
  },

  // --- BANNER DE ADVERTENCIA ---
  disclaimerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFFBE6",
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
    marginTop: 20,
  },
  disclaimerIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
    lineHeight: 18,
    textAlign: "left",
  },
})
