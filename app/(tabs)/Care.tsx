import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Dumbbell, HeartHandshake, Utensils, Zap, ChevronRight } from 'lucide-react-native'; 
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Importa el componente Navbar y Colors (asume que están en las rutas correctas)
import Navbar from '../components/Navbar'; 
import { Colors } from '../constants/Colors'; 

// --- COMPONENTE: Tarjeta de Opción (Diseño Limpio) ---
const OptionCard = ({ title, description, icon: IconComponent, onPress }: any) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.optionHeader}>
      <IconComponent size={24} color={Colors.primary} strokeWidth={2.5} style={{ marginRight: 15 }} />
      
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
      
      <ChevronRight size={20} color={'#999'} style={styles.optionArrow} />
    </View>
  </TouchableOpacity>
);

export default function CuidadosScreen() {
  const router = useRouter();
  const careOptions = [
    {
      title: 'Alimentación Saludable',
      description: 'Descubre dietas ricas en nutrientes que fortalecen tu sistema cardiovascular.',
      icon: Utensils,
      onPress: () => alert('Navegando a Alimentación Saludable') 
    },
    {
      title: 'Actividad Física',
      description: 'Planes de ejercicios recomendados para mantener un corazón fuerte y sano.',
      icon: Dumbbell,
      onPress: () => alert('Navegando a Actividad Física') 
    },
    {
      title: 'Hábitos y Costumbres',
      description: 'Consejos para el manejo del estrés, sueño y abandono de malos hábitos.',
      icon: Zap,
      onPress: () => alert('Navegando a Hábitos y Costumbres') 
    },
  ];
  const mainAdvice = 'Adopta hábitos de vida saludables: mantén una dieta rica en frutas, verduras y granos integrales, haz ejercicio regularmente, controla tu peso y realiza chequeos médicos periódicos.';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={'#444'} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cuidados del Corazón</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- TARJETA PRINCIPAL con Degradado --- */}
        <View style={styles.mainCardWrapper}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0.5, y: 0 }} 
            end={{ x: 0.5, y: 1 }} 
            style={styles.mainCardGradient}
          >
            <HeartHandshake size={34} color={Colors.white} strokeWidth={2} style={styles.mainCardIcon}/>
            <Text style={styles.mainCardTitle}>Consejo Esencial</Text>
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
              onPress={option.onPress} 
            />
          ))}
        </View>
        
        <View style={{ height: 20 }} />

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
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  // --- TARJETA PRINCIPAL con Degradado ---
  mainCardWrapper: {
    borderRadius: 15,
    marginBottom: 25,
    overflow: 'hidden',
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  mainCardGradient: {
    padding: 25,
  },
  mainCardIcon: {
    marginBottom: 10,
  },
  mainCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  mainCardText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 20,
  },
  
  // --- OPCIONES DE CUIDADO (Tarjetas Blancas) ---
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 3,
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  optionArrow: {
    marginLeft: 15,
  },
});