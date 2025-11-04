import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import { Activity, Ambulance, Home, LucideIcon, Shield, Stethoscope } from 'lucide-react-native';
import React from 'react';
import { Animated, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

// --- 1. Constantes de Diseño y Configuración ---
const ICON_SIZE = 28;
const ICON_STROKE_WIDTH = 1.8;
const INACTIVE_COLOR = '#888888'; 
const ACTIVE_ICON_COLOR = Colors.white; // Icono blanco dentro del degradado
const ACTIVE_INDICATOR_COLOR = Colors.primary; // Color para la sombra del degradado

// --- 2. Estructura de Elementos de Navegación (Simplificada para la lógica de ruta) ---
interface NavItem {
    path: string; // Usamos solo el nombre del archivo (ej: 'Home')
    label: string; 
    Icon: LucideIcon;
    accessibilityLabel: string;
}

const navItems: NavItem[] = [
    { path: 'Historial', label: 'Historial', Icon: Activity, accessibilityLabel: 'Historial de Actividad' },
    { path: 'Scanner', label: 'Escanear', Icon: Stethoscope, accessibilityLabel: 'Escaner Médico' },
    { path: 'Home', label: 'Inicio', Icon: Home, accessibilityLabel: 'Página de Inicio' },
    { path: 'Care', label: 'Cuidados', Icon: Shield, accessibilityLabel: 'Consejos de Cuidados' },
    { path: 'Emergency', label: 'Emergencia', Icon: Ambulance, accessibilityLabel: 'Llamada de Emergencia' },
];

// --- 3. Componente Individual de Ítem (REFACTORIZADO CON DEGRADADO) ---
interface NavItemComponentProps {
    item: NavItem;
    isActive: boolean;
    onPress: () => void;
}

const NavItemComponent: React.FC<NavItemComponentProps> = ({ item, isActive, onPress }) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
        ]).start();
        onPress();
    };

    return (
        <TouchableOpacity
            style={styles.navItem}
            onPress={handlePress}
            activeOpacity={0.7} 
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={item.accessibilityLabel}
        >
            {isActive ? (
                <Animated.View style={[styles.activeIconWrapper, { transform: [{ scale: scaleAnim }] }]}>
                    {/* 🌟 CÍRCULO CON DEGRADADO ROJO 🌟 */}
                    <LinearGradient
                        colors={[Colors.primary, Colors.primaryDark]} // Degradado Rojo
                        start={{ x: 0.5, y: 0 }} 
                        end={{ x: 0.5, y: 1 }}
                        style={styles.activeIconGradient} 
                    >
                        <item.Icon
                            size={ICON_SIZE}
                            color={ACTIVE_ICON_COLOR} // Blanco
                            strokeWidth={ICON_STROKE_WIDTH}
                        />
                    </LinearGradient>
                </Animated.View>
            ) : (
                <View style={styles.iconWrapper}>
                    <item.Icon
                        size={ICON_SIZE}
                        color={INACTIVE_COLOR} // Gris
                        strokeWidth={ICON_STROKE_WIDTH}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

// --- 4. Componente Principal Navbar (con Lógica de Ruta Corregida) ---
export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets(); 

    // 🌟 LÓGICA CORREGIDA PARA DETECCIÓN DE PESTAÑAS 🌟
    const isActive = (pathNameSegment: string) => {
        // 1. Manejar la ruta raíz (si /Home es la principal)
        if (pathNameSegment === 'Home' && pathname === '/') {
            return true;
        }
        
        // 2. Extraer el último segmento del path para la comparación flexible
        const normalizedPath = pathname.split('/').pop() || '';
        
        // Si el path normalizado contiene el nombre del archivo (más robusto)
        return normalizedPath.includes(pathNameSegment);
    };

    return (
        <View style={styles.container}>
            <View style={[
                styles.navbarBackground,
                { paddingBottom: insets.bottom || 0 }
            ]}>
                <View style={styles.navbar}>
                    {navItems.map((item) => (
                        <NavItemComponent 
                            key={item.path}
                            item={item}
                            isActive={isActive(item.path)}
                            // Navegamos usando la ruta completa
                            onPress={() => router.push(`/(tabs)/${item.path}` as any)} 
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

// --- 5. Estilos Ajustados (Visibilidad y Estilo de Círculo Degradado) ---
const styles = StyleSheet.create({
    container: {
        // Pin the navbar to the bottom. Use fixed on web so it stays attached
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        // 🌟 Sombra fuerte para asegurar la visibilidad sobre fondo blanco 🌟
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 }, 
        shadowOpacity: 0.3,
        shadowRadius: 10, 
        elevation: 15, 
        backgroundColor: 'transparent',
        zIndex: 999,
    },
    navbarBackground: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        overflow: 'hidden',
        paddingTop: 10, 
    },
    navbar: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60, 
    },
    navItem: {
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Wrapper para el icono inactivo (mismo tamaño que el activo para evitar saltos)
    iconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', 
    },
    // Wrapper para la animación del icono activo
    activeIconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Degradado para el botón activo
    activeIconGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', 
        // Sombra sutil para el círculo degradado
        shadowColor: ACTIVE_INDICATOR_COLOR, 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4, 
        shadowRadius: 3,
        elevation: 4, 
    },
});