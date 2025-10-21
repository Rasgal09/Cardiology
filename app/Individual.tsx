import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Download, Pause, Play } from 'lucide-react-native';
import React, { useState } from 'react'; // 🌟 CORRECCIÓN: Agregado useState 🌟
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Polyline } from 'react-native-svg';
import { Colors } from './constants/Colors';

// Componente para el reproductor de audio con degradado
const AudioPlayer = ({ isPlaying, onTogglePlay, onDownload }: any) => (
    <View style={styles.audioPlayerCard}>
        <TouchableOpacity style={styles.playButtonWrapper} onPress={onTogglePlay}>
            <LinearGradient
                colors={[Colors.primary, Colors.primaryDark]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.playButtonGradient}
            >
                {isPlaying ? (
                    <Pause size={24} color={Colors.white} fill={Colors.white} />
                ) : (
                    <Play size={24} color={Colors.white} fill={Colors.white} />
                )}
            </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.waveform}>
            {/* Onda de audio simulada más limpia */}
            {[...Array(25)].map((_, i) => (
                <View
                    key={i}
                    style={[
                        styles.waveformBar,
                        // Ajuste de altura más estilizado
                        { height: Math.max(5, (Math.sin(i * 0.5) + 1) * 15) }, 
                        isPlaying && { backgroundColor: Colors.primary }
                    ]}
                />
            ))}
        </View>
        
        <TouchableOpacity onPress={onDownload} style={styles.downloadIcon}>
            <Download size={22} color={Colors.primaryDark} />
        </TouchableOpacity>
    </View>
);


export default function IndividualScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [isPlaying, setIsPlaying] = useState(false); // Estado funcional para simular reproducción

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
        // Aquí iría la lógica real de expo-av (reproducir/pausar)
    };

    const handleDownload = () => {
        alert('Iniciando descarga del archivo de audio.');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER (Transparente y Flotante) --- */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.text} strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Fonocardiograma 12:20 pm</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* --- GRÁFICO PRINCIPAL (Se mantiene la funcionalidad SVG) --- */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Gráfico de Amplitud (FCG)</Text>
                    <Svg width="100%" height={150} viewBox="0 0 300 100">
                        <Polyline
                            // Datos de muestra
                            points="0,50 20,45 40,30 60,55 80,25 100,60 120,35 140,50 160,40 180,55 200,30 220,50 240,45 260,35 280,50 300,45"
                            fill="none"
                            stroke={Colors.primary}
                            strokeWidth="3"
                        />
                    </Svg>
                </View>

                {/* --- REPRODUCTOR DE AUDIO REDISEÑADO --- */}
                <AudioPlayer 
                    isPlaying={isPlaying} 
                    onTogglePlay={handleTogglePlay} 
                    onDownload={handleDownload} 
                />

                {/* --- DESCRIPCIÓN Y ANÁLISIS (Tarjeta de Contraste) --- */}
                <View style={styles.descriptionCard}>
                    <Text style={styles.descriptionTitle}>Análisis de Ondas Cardíacas</Text>
                    
                    <View style={styles.statusBox}>
                        <Text style={styles.statusLabel}>Modo de Registro:</Text>
                        <Text style={styles.statusValue}>Reposo</Text>
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={styles.statusLabel}>Duración:</Text>
                        <Text style={styles.statusValue}>15 segundos</Text>
                    </View>

                    <Text style={styles.analysisTitle}>Observaciones detalladas:</Text>
                    <Text style={styles.descriptionText}>
                        Muestra una línea de registro que fluctúa en amplitud (verticalmente) a lo largo del tiempo (horizontalmente), representando los sonidos producidos por los latidos del corazón. La línea base plana se interrumpe por complejos de ondas más grandes y más pequeñas que se repiten de forma rítmica.
                    </Text>
                    <Text style={styles.descriptionText}>
                        <Text style={styles.bold}>1. Ruidos Cardíacos (S1 y S2):</Text> Dentro de cada grupo se observan dos picos de mayor amplitud (más altos), que corresponden al primero ruido (S1) y segundo ruido (S2). Estos indican que el cierre de las válvulas cardíacas.
                    </Text>
                    <Text style={styles.descriptionText}>
                        <Text style={styles.bold}>2. Sístole y Diástole:</Text> El espacio entre el primer ruido grande de un latido y el segundo ruido grande del intervalo de menor amplitud.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    // --- HEADER (Transparente y Flotante) ---
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    // --- SCROLL CONTENT ---
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 80, 
        paddingBottom: 40,
    },
    // --- GRÁFICO CARD ---
    chartCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.darkGray,
        marginBottom: 10,
    },
    // --- REPRODUCTOR DE AUDIO ---
    audioPlayerCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    playButtonWrapper: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        overflow: 'hidden',
    },
    playButtonGradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    downloadIcon: {
        padding: 5,
    },
    waveform: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 35,
        paddingVertical: 5,
    },
    waveformBar: {
        width: 4,
        backgroundColor: Colors.lightGray,
        borderRadius: 2,
    },
    // --- DESCRIPCIÓN Y ANÁLISIS ---
    descriptionCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.primaryDark,
        marginBottom: 15,
    },
    analysisTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginTop: 15,
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.text,
        lineHeight: 22,
        marginBottom: 12,
    },
    statusBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    statusLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.darkGray,
    },
    statusValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
    },
    bold: {
        fontWeight: '700',
    },
});