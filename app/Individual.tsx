import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Activity, ArrowLeft, CheckCircle, Clock, Cpu, Download, File, Hourglass, Layers, Pause, Play, Speaker, XCircle, Zap } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Polyline } from 'react-native-svg';
import { Colors } from './constants/Colors';
import { getToken } from './lib/auth';

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


const SAMPLE_RESULT: any = {
        ok: true,
        model_version: 'file:murmur-linux-x86_64-v5.eim@1756081101-10363560',
        sample_rate: 1150,
        window_size: 2875,
        start_index: 23694,
        results: [
            { label: 'Murmur_absent', value: 0.62890625 },
            { label: 'Murmur_present', value: 0.37109375 },
        ],
        top_label: 'Murmur_absent',
        top_probability: 0.62890625,
        threshold_used: 0.5,
        decision_flag: true,
        quality: {
            duration_sec: 26.688,
            rms: 0.03714513033628464,
            peak_amplitude: 0.5280576944351196,
            snr_db: 1.1391811547929422,
            noise_rms: 0.03257938101887703,
        },
        audio_url: 'https://agro-ai.s3.us-east-2.amazonaws.com/Files-esteto/audio/2530_MV.wav',
        processed_at: '2025-11-04T17:47:39.983471Z',
        id: 3,
        filename: '2530_MV.wav',
        owner_id: 10,
};

export default function IndividualScreen() {
        const router = useRouter();
        const params = useLocalSearchParams();
        const insets = useSafeAreaInsets();
        const [isPlaying, setIsPlaying] = useState(false); // Estado funcional para simular reproducción
        const [loading, setLoading] = useState(true);
        const [result, setResult] = useState<any>(SAMPLE_RESULT);

        const filenameFromParams = typeof params.filename === 'string' ? params.filename : null;
        const idFromParams = params.result_id ? Number(params.result_id) : null;

        useEffect(() => {
            let mounted = true;
            const fetchFull = async () => {
                setLoading(true);
                try {
                    const base = process.env.EXPO_PUBLIC_URL_BACK;
                    if (!base) throw new Error('EXPO_PUBLIC_URL_BACK no configurada');

                    // If we have an explicit id, fetch that record
                    if (idFromParams) {
                        const token = await getToken().catch(() => null);
                        const headers: any = {};
                        if (token) headers.Authorization = `Bearer ${token}`;
                        const res = await fetch(`${base}/analysis/analyses/${idFromParams}`, { headers, credentials: token ? undefined : 'include' });
                        if (!res.ok) throw new Error('record not found');
                        const data = await res.json();
                        if (mounted) setResult(data);
                        return;
                    }

                    // otherwise fetch the list and pick by filename or first
                    const token = await getToken().catch(() => null);
                    const options: any = { method: 'GET' };
                    if (token) options.headers = { Authorization: `Bearer ${token}` };
                    else options.credentials = 'include';

                    const res = await fetch(`${base}/my/analyses/full?skip=0&limit=200`, options);
                    if (!res.ok) throw new Error('Error fetching analyses');
                    const list = await res.json();
                    if (!Array.isArray(list) || list.length === 0) {
                        if (mounted) setResult(SAMPLE_RESULT);
                        return;
                    }

                    let picked: any = null;
                    if (filenameFromParams) {
                        picked = list.find((r: any) => r.filename === filenameFromParams || String(r.filename).includes(filenameFromParams));
                    }
                    if (!picked) picked = list[0];

                    // Some APIs wrap the analysis JSON inside a field, try common keys
                    const jsonCandidate = picked?.json ?? picked?.result ?? picked?.analysis ?? picked;
                    if (mounted) setResult(jsonCandidate);
                } catch (err) {
                    console.warn('Individual fetch error', err);
                    if (mounted) setResult(SAMPLE_RESULT);
                } finally {
                    if (mounted) setLoading(false);
                }
            };
            fetchFull();
            return () => { mounted = false; };
        }, [filenameFromParams, idFromParams]);

        const handleTogglePlay = () => {
                setIsPlaying(!isPlaying);
                // Aquí iría la lógica real de expo-av (reproducir/pausar)
        };

        const handleDownload = async () => {
                if (result?.audio_url) {
                    await Linking.openURL(result.audio_url);
                } else {
                    alert('Iniciando descarga del archivo de audio.');
                }
        };

        if (loading) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={[styles.header, { paddingTop: insets.top + 10 }] }>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <ArrowLeft size={24} color={Colors.text} strokeWidth={2.5} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Cargando...</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
                </SafeAreaView>
            );
        }

        return (
                <SafeAreaView style={styles.container}>
                        {/* --- HEADER (Transparente y Flotante) --- */}
                        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                                        <ArrowLeft size={24} color={Colors.text} strokeWidth={2.5} />
                                </TouchableOpacity>
                                <View>
                                    <Text style={styles.headerTitle}>{result?.filename || 'Fonocardiograma'}</Text>
                                    <Text style={{ fontSize: 12, color: Colors.darkGray }}>{result?.processed_at ? new Date(result.processed_at).toLocaleString() : ''}</Text>
                                </View>
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

                                        <View style={{ marginTop: 12 }}>
                                            {(result?.results || []).map((r: any) => (
                                                <View key={r.label} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
                                                    <Text style={{ fontWeight: '600', color: '#333' }}>{r.label.replace(/_/g, ' ')}</Text>
                                                    <View style={{ flex: 1, height: 8, backgroundColor: '#eee', marginHorizontal: 12, borderRadius: 6, overflow: 'hidden' }}>
                                                        <View style={{ width: `${Math.round((r.value||0) * 100)}%`, height: '100%', backgroundColor: r.label === result.top_label ? Colors.primary : Colors.primary }} />
                                                    </View>
                                                    <Text style={{ width: 60, textAlign: 'right' }}>{((r.value||0) * 100).toFixed(1)}%</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>

                                    {/* --- METADATA / SUMMARY WITH ICONS --- */}
                                    <View style={styles.infoCard}>
                                        <Text style={styles.infoTitle}>Detalles del Análisis</Text>

                                        <View style={styles.infoRow}>
                                            <Clock size={18} color={Colors.darkGray} />
                                            <View style={styles.infoTextWrap}>
                                                <Text style={styles.infoLabel}>Procesado</Text>
                                                <Text style={styles.infoValue}>{result?.processed_at ? new Date(result.processed_at).toLocaleString() : '—'}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.infoRow}>
                                            <File size={18} color={Colors.darkGray} />
                                            <View style={styles.infoTextWrap}>
                                                <Text style={styles.infoLabel}>Archivo</Text>
                                                <Text style={styles.infoValue}>{result?.filename ?? '—'}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.infoRow}>
                                            <Layers size={18} color={Colors.darkGray} />
                                            <View style={styles.infoTextWrap}>
                                                <Text style={styles.infoLabel}>Modelo</Text>
                                                <Text style={styles.infoValue}>{result?.analysis?.model?.display?.name ? `${result.analysis.model.display.name} ${result.analysis.model.display.version ?? ''}` : (result?.analysis?.model_version ?? '—')}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.infoRow}>
                                            <Cpu size={18} color={Colors.darkGray} />
                                            <View style={styles.infoTextWrap}>
                                                <Text style={styles.infoLabel}>Sample rate</Text>
                                                <Text style={styles.infoValue}>{result?.analysis?.sample_rate ?? '—'}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.infoRow}>
                                            <Hourglass size={18} color={Colors.darkGray} />
                                            <View style={styles.infoTextWrap}>
                                                <Text style={styles.infoLabel}>Procesamiento (ms)</Text>
                                                <Text style={styles.infoValue}>{result?.analysis?.processing_time_ms ?? '—'}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.infoRow}>
                                            {result?.decision_flag ? <CheckCircle size={18} color={Colors.primary} /> : <XCircle size={18} color={Colors.darkGray} />}
                                            <View style={styles.infoTextWrap}>
                                                <Text style={styles.infoLabel}>Decisión</Text>
                                                <Text style={styles.infoValue}>{result?.top_label ?? (result?.decision_flag ? 'Positivo' : 'Negativo')}</Text>
                                            </View>
                                        </View>

                                        <View style={[styles.infoRow, { marginTop: 6 }]}>
                                            <Text style={[styles.infoLabel, { fontWeight: '700' }]}>Calidad</Text>
                                        </View>

                                        <View style={styles.infoRowSmall}>
                                            <Zap size={14} color={Colors.darkGray} />
                                            <View style={styles.infoTextWrapSmall}>
                                                <Text style={styles.infoLabelSmall}>Pico</Text>
                                                <Text style={styles.infoValueSmall}>{result?.analysis?.quality?.peak_amplitude ?? '—'}</Text>
                                            </View>
                                            <Activity size={14} color={Colors.darkGray} />
                                            <View style={styles.infoTextWrapSmall}>
                                                <Text style={styles.infoLabelSmall}>RMS</Text>
                                                <Text style={styles.infoValueSmall}>{result?.analysis?.quality?.rms ?? '—'}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.infoRowSmall}>
                                            <Text style={{ width: 18 }} />
                                            <View style={styles.infoTextWrapSmall}>
                                                <Text style={styles.infoLabelSmall}>Duración</Text>
                                                <Text style={styles.infoValueSmall}>{result?.analysis?.quality?.duration_sec ? `${result.analysis.quality.duration_sec.toFixed(2)} s` : '—'}</Text>
                                            </View>
                                            <Zap size={14} color={Colors.darkGray} />
                                            <View style={styles.infoTextWrapSmall}>
                                                <Text style={styles.infoLabelSmall}>SNR (dB)</Text>
                                                <Text style={styles.infoValueSmall}>{result?.analysis?.quality?.snr_db ?? '—'}</Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity style={styles.audioRow} onPress={handleDownload}>
                                            <Speaker size={18} color={Colors.primary} />
                                            <Text style={[styles.infoValue, { marginLeft: 10, color: Colors.primary }]}>Abrir audio</Text>
                                        </TouchableOpacity>
                                    </View>

                                {/* --- REPRODUCTOR DE AUDIO REDISEÑADO --- */}
                                <AudioPlayer 
                                        isPlaying={isPlaying} 
                                        onTogglePlay={handleTogglePlay} 
                                        onDownload={handleDownload} 
                                />

                                {/* --- DESCRIPCIÓN Y ANÁLISIS (Tarjeta de Contraste) --- */}
                                <View style={styles.descriptionCard}>
                                        <Text style={styles.descriptionTitle}>Calidad y Metadatos</Text>
                    
                                        <View style={styles.statusBox}>
                                                <Text style={styles.statusLabel}>Duración:</Text>
                                                <Text style={styles.statusValue}>{result?.analysis?.quality?.duration_sec ? `${result.analysis.quality.duration_sec.toFixed(2)} s` : '—'}</Text>
                                        </View>
                                        <View style={styles.statusBox}>
                                                <Text style={styles.statusLabel}>RMS:</Text>
                                                <Text style={styles.statusValue}>{result?.analysis?.quality?.rms ?? '—'}</Text>
                                        </View>
                                        <View style={styles.statusBox}>
                                                <Text style={styles.statusLabel}>SNR (dB):</Text>
                                                <Text style={styles.statusValue}>{result?.analysis?.quality?.snr_db ?? '—'}</Text>
                                        </View>

                                        <Text style={styles.analysisTitle}>Decisión</Text>
                                        <Text style={styles.descriptionText}>
                                            Etiqueta superior: <Text style={styles.bold}>{result?.analysis?.top_label}</Text> — Probabilidad {(result?.analysis?.top_probability * 100 || 0).toFixed(1)}%
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
    // --- METADATA / INFO ---
    infoCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },
    infoTitle: { fontSize: 16, fontWeight: '700', color: Colors.darkGray, marginBottom: 8 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
    infoTextWrap: { marginLeft: 10 },
    infoLabel: { fontSize: 12, color: Colors.darkGray },
    infoValue: { fontSize: 14, color: Colors.text, fontWeight: '600' },
    infoRowSmall: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 },
    infoTextWrapSmall: { marginLeft: 8, width: '40%' },
    infoLabelSmall: { fontSize: 12, color: Colors.darkGray },
    infoValueSmall: { fontSize: 13, color: Colors.text, fontWeight: '600' },
    audioRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
});