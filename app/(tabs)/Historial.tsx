import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BarChart4, ChevronLeft, ChevronRight, Download, HeartPulse } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors';
import { getToken } from '../lib/auth';

// --- UTILIDADES DEL CALENDARIO (sin cambios, empieza en Domingo) ---
const WEEK_DAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

const generateMonthDays = (currentDate: Date) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); 

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push({ day: null, isCurrentMonth: false, hasData: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const hasData = i % 5 === 0; // Simulación de días con datos
        days.push({ day: i, isCurrentMonth: true, hasData });
    }

    while (days.length % 7 !== 0) {
        days.push({ day: null, isCurrentMonth: false, hasData: false });
    }

    return days;
};
// --- FIN UTILIDADES DEL CALENDARIO ---

export default function HistorialScreen() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState(new Date()); 

    const [recordings, setRecordings] = useState<Array<{ id: number; processed_at: string | null; filename: string }>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const fetchSummary = async () => {
            setLoading(true);
            try {
                const base = process.env.EXPO_PUBLIC_URL_BACK;
                if (!base) throw new Error('EXPO_PUBLIC_URL_BACK no configurada');
                const url = `${base}/analysis/summary`;
                const options: any = { method: 'GET' };
                const token = await getToken().catch(() => null);
                if (token) options.headers = { Authorization: `Bearer ${token}` };
                else options.credentials = 'include';

                const res = await fetch(url, options);
                console.log('Fetch summary response:', res);
                if (!res.ok) throw new Error('Error fetching analysis summary');
                const data = await res.json();
                if (mounted) setRecordings(Array.isArray(data) ? data : []);
            } catch (err) {
                console.warn('fetchSummary error', err);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchSummary();
        return () => { mounted = false; };
    }, []);

    const goToPreviousMonth = () => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        setCurrentDate(new Date(newDate));
    };

    const goToNextMonth = () => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        setCurrentDate(new Date(newDate));
    };
    
    const monthDays = useMemo(() => generateMonthDays(currentDate), [currentDate]);

    const monthYearText = currentDate.toLocaleDateString('es-ES', { 
        month: 'long', 
        year: 'numeric' 
    }).replace(/\b\w/g, l => l.charAt(0).toUpperCase() + l.slice(1)); // Capitalizar la primera letra

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* --- HEADER PRINCIPAL (Más compacto) --- */}
            <View style={styles.header}>
                
                <Text style={styles.headerTitle}>Historial</Text>
                <BarChart4 size={24} color={Colors.text} />
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* --- CALENDARIO DE DÍAS (Tarjeta, rediseñado) --- */}
                <View style={styles.calendarCard}>
                    {/* Selector de Mes (dentro de la tarjeta del calendario) */}
                    <View style={styles.monthSelector}>
                        <TouchableOpacity style={styles.monthNavButton} onPress={goToPreviousMonth}>
                            <ChevronLeft size={20} color={Colors.primary} />
                        </TouchableOpacity>
                        <Text style={styles.monthText}>{monthYearText}</Text>
                        <TouchableOpacity style={styles.monthNavButton} onPress={goToNextMonth}>
                            <ChevronRight size={20} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Fila de días de la semana */}
                    <View style={styles.daysRow}>
                        {WEEK_DAYS.map((day, index) => (
                            <View key={index} style={styles.dayHeaderBox}>
                                <Text style={styles.dayHeaderText}>{day}</Text>
                            </View>
                        ))}
                    </View>
                    {/* Cuadrícula de números de día */}
                    <View style={styles.dateGrid}>
                        {monthDays.map((item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={[
                                    styles.dayBox, 
                                    item.hasData && styles.dayBoxActive,
                                    !item.isCurrentMonth && styles.dayBoxInactive,
                                ]}
                                onPress={() => item.day && console.log(`Día ${item.day} seleccionado`)}
                                disabled={!item.day} 
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.dayNumber, 
                                    item.hasData && styles.dayNumberActive,
                                    !item.isCurrentMonth && styles.dayNumberInactive,
                                ]}>
                                    {item.day || ''}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* --- Botón Principal de Descarga (CTA, degradado y flotante) --- */}
                <TouchableOpacity style={styles.downloadButtonWrapper} activeOpacity={0.8}>
                    <LinearGradient
                        colors={[Colors.primary, Colors.primaryDark]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.downloadButtonGradient}
                    >
                        <Download size={20} color={Colors.white} style={{ marginRight: 10 }} />
                        <Text style={styles.downloadButtonText}>
                            Generar y Descargar Resumen
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* --- Registros --- */}
                <Text style={styles.recordingsSectionTitle}>Registros ({recordings.length})</Text>
                <View style={styles.recordingsList}>
                    {loading ? (
                        <ActivityIndicator color={Colors.primary} style={{ marginTop: 8 }} />
                    ) : (
                        recordings.map((r) => (
                            <TouchableOpacity
                                key={r.id}
                                style={styles.recordingCard}
                                onPress={() => router.push(`/Individual?result_id=${r.id}`)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.recordingIconContainer}>
                                    <HeartPulse size={24} color={Colors.primary} strokeWidth={2} />
                                </View>
                                
                                <View style={styles.recordingInfo}>
                                    <Text style={styles.recordingTitle}>Archivo: {r.filename}</Text>
                                    <Text style={styles.recordingStatus}>{r.processed_at ? new Date(r.processed_at).toLocaleString() : 'Pendiente'}</Text>
                                </View>

                                <ChevronRight size={20} color={Colors.darkGray} />
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            </ScrollView>

            <Navbar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background, // Un gris muy claro o blanco para la app
    },
    // --- HEADER PRINCIPAL (MÁS LIMPIO) ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Colors.white, // Fondo blanco para el header
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray, // Una línea sutil
        // Sombra suave para un efecto "elevado"
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.text, // Color de texto oscuro
    },
    
    // --- SECCIÓN PRINCIPAL (ScrollView) ---
    scrollContent: {
        padding: 20, // Padding uniforme para todo el contenido
        paddingBottom: 20,
    },

    // --- CALENDARIO (Ahora es una "Tarjeta" central) ---
    calendarCard: {
        backgroundColor: Colors.white,
        borderRadius: 18, // Bordes más redondeados
        padding: 18, // Padding interno
        marginBottom: 25, // Más espacio debajo
        // Sombra más pronunciada para el efecto de tarjeta flotante
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1, // Visible
        shadowRadius: 10,
        elevation: 8,
    },
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15, // Espacio entre el selector de mes y los días de la semana
    },
    monthNavButton: {
        padding: 8, // Área de toque más grande
        borderRadius: 10, // Un poco redondeado
        backgroundColor: Colors.lightGray, // Fondo sutil para los botones de navegación
    },
    monthText: {
        fontSize: 18, // Ligeramente más pequeño, más elegante
        fontWeight: '700',
        color: Colors.text, // Texto oscuro
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8, // Espacio entre los nombres de los días y los números
    },
    dayHeaderBox: {
        width: '14.28%', 
        alignItems: 'center',
        paddingVertical: 5,
    },
    dayHeaderText: {
        color: Colors.darkGray, // Color más oscuro
        fontSize: 12,
        fontWeight: '700',
    },
    dateGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    dayBox: {
        width: '14.28%', 
        height: 40,
        borderRadius: 10, // Más redondeado
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6, // Espacio entre filas de números
        marginHorizontal: 0, // Asegurar que no haya márgenes horizontales
    },
    dayBoxActive: {
        backgroundColor: Colors.primary, // Fondo rojo claro
        // No hay borde, el fondo es suficiente
    },
    dayBoxInactive: {
        opacity: 0.4, // Días fuera del mes se ven más tenues
    },
    dayNumber: {
        color: Colors.text, 
        fontSize: 15, // Un poco más grande
        fontWeight: '600',
    },
    dayNumberActive: {
        color: Colors.primaryDark, 
        fontWeight: '700',
    },
    dayNumberInactive: {
        color: Colors.darkGray, 
    },
    
    // --- BOTÓN DE DESCARGA (CTA con Degradado) ---
    downloadButtonWrapper: {
        borderRadius: 15, // Más redondeado
        marginBottom: 30, // Más espacio debajo
        // Sombra para hacerlo flotante
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: 6 }, // Sombra más profunda
        shadowOpacity: 0.4, // Muy visible
        shadowRadius: 12,
        elevation: 10,
        height: 55,
    },
    downloadButtonGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    downloadButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
    },

    // --- REGISTROS ---
    recordingsSectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 15, // Más espacio debajo
    },
    recordingsList: {
        gap: 15, // Más espacio entre las tarjetas de registro
    },
    recordingCard: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18, // Más padding
        borderRadius: 18, // Bordes más redondeados
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 }, // Sombra más visible
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 5,
    },
    recordingIconContainer: {
        width: 45, // Un poco más grande
        height: 45,
        borderRadius: 12, // Más redondeado
        backgroundColor: 'rgba(255, 100, 100, 0.15)', // Color más vibrante
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18, // Más espacio a la derecha
    },
    recordingInfo: {
        flex: 1,
    },
    recordingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    recordingStatus: {
        fontSize: 13,
        color: Colors.darkGray,
        fontWeight: '500',
    },
});

// Colores definidos para consistencia
// Puedes definir Colors.background, Colors.text, Colors.darkGray, Colors.lightGray en Colors.ts
// Ejemplo:
// export const Colors = {
//   primary: '#FF6347', // Tomate
//   primaryDark: '#2e1006ff', // Naranja rojizo
//   primaryLight: '#FFDAB9', // Melocotón claro (o un rojo muy claro)
//   white: '#FFFFFF',
//   black: '#000000',
//   text: '#333333', // Para textos principales
//   darkGray: '#666666', // Para textos secundarios
//   lightGray: '#EEEEEE', // Para bordes o fondos sutiles
//   background: '#F9F9F9', // Para el fondo general de la app
// };