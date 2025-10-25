// Expo, react y React Native
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { useAuth } from '../context/AuthContext';

// Componentes
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors';

// Librerías
import { AlertTriangle, Heart, HeartPulse, History, Settings, Siren } from 'lucide-react-native';

// --- Componente para las tarjetas secundarias (blancas) ---
const CardItem = ({ title, buttonText, onPress, icon: IconComponent, buttonColor = Colors.primary }: any) => (
  <TouchableOpacity style={styles.cardSecondary} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.cardSecondaryContent}>
        
        {/* Ícono a la izquierda con el color primario (rojo) */}
        <View style={styles.iconContainer}>
          <IconComponent size={30} color={Colors.primary} strokeWidth={2} />
        </View>

        {/* Texto de la tarjeta */}
        <View style={styles.cardSecondaryTextContainer}>
          <Text style={styles.cardSecondaryTitle}>{title}</Text>
        </View>

        {/* Botón de acción con contorno */}
        <TouchableOpacity 
          style={[styles.cardSecondaryButton, { borderColor: buttonColor }]} 
          onPress={onPress}
        >
          <Text style={[styles.cardSecondaryButtonText, { color: buttonColor }]}>{buttonText}</Text>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
);

// --- Componente de Advertencia (Disclaimer) ---
const DisclaimerBanner = () => (
    <View style={styles.disclaimerContainer}>
        <AlertTriangle size={20} color={'#FFC107'} />
        <Text style={styles.disclaimerText}>
            Esta aplicación no sustituye el diagnóstico ni la consulta de un profesional médico. 
            Utiliza la información como referencia.
        </Text>
    </View>
);

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  
  const NAVBAR_HEIGHT = 65; 
  const safePaddingBottom = NAVBAR_HEIGHT + (insets.bottom || 0) + 20; 

  console.log("Usuario en HomeScreen:", user);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hola, Ricardo👋</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => router.push("/(auth)/settings")}>
          <Settings size={26} color={Colors.darkGray} strokeWidth={2} /> 
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={[
            styles.scrollContent, 
            { paddingBottom: safePaddingBottom } // Aplicamos el padding dinámico
        ]}
      >
        
        {/* --- TARJETA PRINCIPAL (ROJA GRANDE) --- */}
        <TouchableOpacity style={styles.mainCard} onPress={() => router.push('/(tabs)/Scanner')}>
            <LinearGradient
                colors={[Colors.primary, Colors.primaryDark]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.mainCardGradient}
            >
                <HeartPulse size={40} color={Colors.white} strokeWidth={2.5} style={{marginBottom: 12}}/>
                
                <Text style={styles.mainCardTitle}>Comenzar{'\n'}Mediciones Hoy</Text>
                <Text style={styles.mainCardSubtitle}>Toma tu pulso y presión arterial.</Text>
            </LinearGradient>
        </TouchableOpacity>
        
        {/* --- SECCIÓN Otras Opciones --- */}
        <Text style={styles.sectionTitle}>Otras Opciones</Text>

        {/* Tarjetas Secundarias */}
        <CardItem
          title="Historial de Mediciones"
          buttonText="Ver"
          onPress={() => router.push('/(tabs)/Historial')}
          icon={History}
        />
        <CardItem
          title="Cuidados del Corazón"
          buttonText="Consejos"
          onPress={() => router.push('/(tabs)/Care')}
          icon={Heart}
        />
        <CardItem
          title="Emergencia Rápida"
          buttonText="Activar"
          onPress={() => router.push('/(tabs)/Emergency')}
          icon={Siren}
        />
        
        {/* --- BANNER DE ADVERTENCIA --- */}
        <DisclaimerBanner />

      </ScrollView>

      <Navbar /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
  },
  // --- HEADER ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15, 
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 22, 
    fontWeight: '700',
    color: '#333',
  },
  settingsButton: {
    padding: 4, 
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24, 
  },
  
  // --- Tarjeta Principal (Grande y Roja) ---
  mainCard: {
    borderRadius: 20, 
    marginTop: 10,
    marginBottom: 25, 
    overflow: 'hidden',
    elevation: 8, 
    shadowColor: Colors.primaryDark, 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  mainCardGradient: {
    padding: 30, 
    height: 190, 
    justifyContent: 'center',
  },
  mainCardTitle: {
    fontSize: 26, 
    fontWeight: '800',
    color: Colors.white,
    lineHeight: 32,
  },
  mainCardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.95)',
    marginTop: 8,
  },
  
  // --- Título de Sección ---
  sectionTitle: {
    fontSize: 20, 
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    marginTop: 5,
  },

  // --- Tarjetas Secundarias (Lista Blanca) ---
  cardSecondary: {
    backgroundColor: Colors.white,
    borderRadius: 15, 
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardSecondaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18, 
    paddingHorizontal: 18,
  },
  iconContainer: {
    marginRight: 15,
    padding: 5,
  },
  cardSecondaryTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardSecondaryTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  // Estilo del botón (Ver/Consejos/Activar)
  cardSecondaryButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingVertical: 10, 
    borderRadius: 10,
    borderWidth: 1.5, 
    alignSelf: 'center',
  },
  cardSecondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },

  // --- BANNER DE ADVERTENCIA ---
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFBE6', 
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107', 
    marginTop: 20,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    lineHeight: 18,
  }
});
