import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors';


export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={28} color={Colors.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/(tabs)/Scanner')}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0.5, y: 0 }} // Empieza en el centro superior (arriba)
            end={{ x: 0.5, y: 1 }} // Termina en el centro inferior (abajo)
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Comenzar{'\n'}Mediciones</Text>
              <View style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Conoce más</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/(tabs)/Historial')}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0.5, y: 0 }} // Empieza en el centro superior (arriba)
            end={{ x: 0.5, y: 1 }}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Historial de{'\n'}mediciones</Text>
              <View style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Ver más</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/(tabs)/Care')}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0.5, y: 0 }} // Empieza en el centro superior (arriba)
            end={{ x: 0.5, y: 1 }}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Conoce el cuidado tu{'\n'}corazón</Text>
              <View style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Conoce más</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/(tabs)/Emergency')}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0.5, y: 0 }} // Empieza en el centro superior (arriba)
            end={{ x: 0.5, y: 1 }} // Termina en el centro inferior (abajo)
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Botón de{'\n'}emergencia</Text>
              <View style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Iniciar</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    flex: 1,
  },
  cardButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cardButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});