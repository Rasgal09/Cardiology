import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CareHeader from '@/app/components/tabs/Care/CareHeader';
import CareMainCard from '@/app/components/tabs/Care/CareMainCard';
import CareOptionCard from '@/app/components/tabs/Care/CareOptionCard';
import Navbar from '@/app/components/Navbar';
import { s } from '@/app/components/tabs/Care/Care.styles';
import { Utensils, Dumbbell, Zap } from 'lucide-react-native';

export default function CuidadosScreen() {
  const careOptions = [
    {
      title: 'Alimentación Saludable',
      description: 'Descubre dietas ricas en nutrientes que fortalecen tu sistema cardiovascular.',
      icon: Utensils,
      onPress: () => alert('Navegando a Alimentación Saludable'),
    },
    {
      title: 'Actividad Física',
      description: 'Planes de ejercicios recomendados para mantener un corazón fuerte y sano.',
      icon: Dumbbell,
      onPress: () => alert('Navegando a Actividad Física'),
    },
    {
      title: 'Hábitos y Costumbres',
      description: 'Consejos para el manejo del estrés, sueño y abandono de malos hábitos.',
      icon: Zap,
      onPress: () => alert('Navegando a Hábitos y Costumbres'),
    },
  ];

  const mainAdvice =
    'Adopta hábitos de vida saludables: mantén una dieta rica en frutas, verduras y granos integrales, ' +
    'haz ejercicio regularmente, controla tu peso y realiza chequeos médicos periódicos.';

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <CareHeader />
      <ScrollView contentContainerStyle={s.scrollContent}>
        <CareMainCard text={mainAdvice} />
        <Text style={s.sectionTitle}>Explora por Categoría</Text>
        <View style={s.optionsContainer}>
          {careOptions.map((opt, i) => (
            <CareOptionCard
              key={i}
              title={opt.title}
              description={opt.description}
              icon={opt.icon}
              onPress={opt.onPress}
            />
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
}