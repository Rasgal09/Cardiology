import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import { Activity, Ambulance, Home, Shield, Stethoscope } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      start={{ x: 0.5, y: 0 }} // Empieza en el centro superior (arriba)
      end={{ x: 0.5, y: 1 }} // Termina en el centro inferior (abajo) 
    >
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/Historial')}
        >
          <Activity
            size={30}
            color={isActive('/(tabs)/Historial') ? Colors.white : 'rgba(255,255,255)'}
            strokeWidth={2.5}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/Scanner')}
        >
          <Stethoscope
            size={30}
            color={isActive('/(tabs)/Scanner') ? Colors.white : 'rgba(255,255,255)'}
            strokeWidth={2.5}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/Home')}
        >
          <Home
            size={30}
            color={isActive('/(tabs)/Home') ? Colors.white : 'rgba(255,255,255)'}
            strokeWidth={2.5}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/Care')}
        >
          <Shield
            size={30}
            color={isActive('/(tabs)/Care') ? Colors.white : 'rgba(255,255,255)'}
            strokeWidth={2.5}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/Emergency')}
        >
          <Ambulance
            size={28}
            color={isActive('/(tabs)/Emergency') ? Colors.white : 'rgba(255,255,255)'}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
      </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  navItem: {
    padding: 8,
  },
});