import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Dumbbell, HeartHandshake, Utensils, Zap } from 'lucide-react-native'; // Nuevos iconos
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors';

const OptionCard = ({ title, description, icon: IconComponent, onPress }: any) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.optionHeader}>
      <View style={styles.optionIconContainer}>
        <IconComponent size={24} color={Colors.primary} strokeWidth={2} />
      </View>
      <Text style={styles.optionTitle}>{title}</Text>
      <ArrowLeft size={20} color={Colors.darkGray} style={styles.optionArrow} />
    </View>
    <Text style={styles.optionDescription}>{description}</Text>
  </TouchableOpacity>
);

export default function CuidadosScreen() {
  const router = useRouter();
  const careOptions = [
    {
      title: 'Alimentación Saludable',
      description: 'Descubre dietas ricas en nutrientes que fortalecen tu sistema cardiovascular.',
      icon: Utensils,
    },
    {
      title: 'Actividad Física',
      description: 'Planes de ejercicios recomendados para mantener un corazón fuerte y sano.',
      icon: Dumbbell,
    },
    {
      title: 'Hábitos y Costumbres',
      description: 'Consejos para el manejo del estrés, sueño y abandono de malos hábitos.',
      icon: Zap,
    },
  ];
  const mainAdvice = 'Para cuidar tu corazón, adopta hábitos de vida saludables: mantén una dieta rica en frutas, verduras y granos integrales, haz ejercicio regularmente, controla tu peso, evita el tabaco y el consumo excesivo de alcohol, maneja el estrés, y realiza chequeos médicos periódicos para vigilar la presión arterial, el colesterol y la glucosa.';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- HEADER Y BOTÓN ATRÁS --- */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.navigate('/(tabs)/Home')}>
            <ArrowLeft size={28} color={Colors.darkGray} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Cuidados del Corazón</Text>
        </View>

        {/* --- TARJETA PRINCIPAL con Degradado --- */}
        <View style={styles.mainCardWrapper}>
          <LinearGradient
            // *** Aplicamos el Degradado Rojo ***
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0.5, y: 0 }} // Arriba
            end={{ x: 0.5, y: 1 }} // Abajo
            style={styles.mainCardGradient}
          >
            <HeartHandshake size={36} color={Colors.white} strokeWidth={2} style={styles.mainCardIcon}/>
            <Text style={styles.mainCardTitle}>Recomendación</Text>
            <Text style={styles.mainCardText}>{mainAdvice}</Text>
          </LinearGradient>
        </View>

        {/* --- OPCIONES DE CUIDADO --- */}
        <Text style={styles.sectionTitle}>Explora por Categoría</Text>
        <View style={styles.optionsContainer}>
          {careOptions.map((option, index) => (
            <OptionCard
              key={index}
              title={option.title}
              description={option.description}
              icon={option.icon}
              onPress={() => alert(`Navegando a ${option.title}`)} 
            />
          ))}
        </View>
      </ScrollView>
       <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fondo más claro para contraste
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // --- HEADER ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
    marginLeft: -8, 
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
  },

  mainCardWrapper: {
    borderRadius: 20,
    marginBottom: 25,
    overflow: 'hidden',
    // Sombra para el degradado
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  mainCardGradient: {
    padding: 25,
  },
  mainCardIcon: {
    marginBottom: 10,
  },
  mainCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 8,
  },
  mainCardText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 20,
  },
  
  // --- OPCIONES DE CUIDADO (Tarjetas Blancas) ---
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 15,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 18,
    // Sombra sutil para las tarjetas blancas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 100, 100, 0.1)', // Fondo rojo muy claro
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  optionArrow: {
    transform: [{ rotate: '180deg' }], // Girar la flecha para que apunte a la derecha
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
    paddingLeft: 50, // Alinear con el texto
  },
});