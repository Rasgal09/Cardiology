import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, HeartPulse, History, Heart, Siren } from 'lucide-react-native'; 
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors'; 
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();

  // Componente para las tarjetas secundarias (blancas)
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

        {/* Botón de acción con contorno, como en la imagen */}
        <TouchableOpacity 
          style={[styles.cardSecondaryButton, { borderColor: buttonColor }]} 
          onPress={onPress}
        >
          <Text style={[styles.cardSecondaryButtonText, { color: buttonColor }]}>{buttonText}</Text>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hola, Ricardo👋</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/settings')}>
          {/* El ícono de configuración en la imagen */}
          <Settings size={28} color={'#555'} strokeWidth={2} /> 
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        
        {/* --- TARJETA PRINCIPAL (ROJA GRANDE) --- */}
        <TouchableOpacity style={styles.mainCard} onPress={() => router.push('/(tabs)/Scanner')}>
            <LinearGradient
                // *** Degradado vertical como en la Navbar ***
                colors={[Colors.primary, Colors.primaryDark]}
                start={{ x: 0.5, y: 0 }} // Arriba
                end={{ x: 0.5, y: 1 }} // Abajo
                // ***************************************
                style={styles.mainCardGradient}
            >
                {/* Ícono de pulso blanco */}
                <HeartPulse size={40} color={Colors.white} strokeWidth={2.5} style={{marginBottom: 10}}/>
                
                {/* Título y subtítulo */}
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
      </ScrollView>

      {/* Se mantiene la Navbar, aunque la ignoraste en el requerimiento */}
      <Navbar /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Fondo blanco/gris muy claro
  },
  // --- HEADER ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
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
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5, 
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  mainCardGradient: {
    padding: 25,
    height: 180, 
    justifyContent: 'center',
  },
  mainCardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    lineHeight: 30,
  },
  mainCardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
  },
  
  // --- Título de Sección ---
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
    marginTop: 5,
  },

  // --- Tarjetas Secundarias (Lista Blanca) ---
  cardSecondary: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardSecondaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
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
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  // Estilo del botón (Ver/Consejos/Activar)
  cardSecondaryButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1, 
  },
  cardSecondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});