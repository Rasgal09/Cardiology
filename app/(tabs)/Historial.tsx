import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BarChart4, ChevronLeft, ChevronRight, Download, HeartPulse, FileText } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { Colors } from '../constants/Colors'; 

// --- UTILIDADES DEL CALENDARIO ---
const WEEK_DAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

interface DayItem {
    day: number | null;
    isCurrentMonth: boolean;
    dateKey?: string; // Formato YYYY-MM-DD
    hasData: boolean;
}

const generateMonthDays = (currentDate: Date): DayItem[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); 

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: DayItem[] = [];
    
    // Días del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push({ day: null, isCurrentMonth: false, hasData: false });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
        // Simulación: Un día tiene datos si es múltiplo de 3 o 5
        const hasData = i % 3 === 0 || i % 5 === 0;
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        days.push({ day: i, isCurrentMonth: true, hasData, dateKey });
    }

    // Días del mes siguiente
    while (days.length % 7 !== 0) {
        days.push({ day: null, isCurrentMonth: false, hasData: false });
    }

    return days;
};
// --- FIN UTILIDADES DEL CALENDARIO ---

// --- SIMULACIÓN DE REGISTROS ---
interface Recording {
    id: number;
    date: string;
    time: string;
    status: string;
    icon: any; 
}

const getRecordingsForDay = (day: number | null, dateKey: string | undefined): Recording[] => {
    if (!day || !dateKey) return [];
    
    const dayNumber = parseInt(dateKey.slice(-2));
    const baseCount = dayNumber % 4; 
    
    // Solo devuelve registros si el día tiene datos (para simular el punto rojo)
    const month = parseInt(dateKey.substring(5, 7));
    const simulatedDate = new Date(parseInt(dateKey.substring(0,4)), month - 1, dayNumber);
    
    // Simulamos que algunos días tienen datos, coherente con generateMonthDays
    const hasData = dayNumber % 3 === 0 || dayNumber % 5 === 0;

    if (!hasData) return [];

    return Array.from({ length: baseCount }, (_, i) => ({
        id: (day * 10) + i, 
        date: dateKey,
        time: `${10 + i}:00 ${i % 2 === 0 ? 'am' : 'pm'}`,
        status: i % 3 === 0 ? 'Realizado en reposo' : 'Actividad física',
        icon: HeartPulse,
    }));
};

export default function HistorialScreen() {
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState(new Date()); 
    const [selectedRange, setSelectedRange] = useState<[number | null, number | null]>([null, null]);
    const [startDay, endDay] = selectedRange;

    // --- LÓGICA DE SELECCIÓN DE RANGO DE 7 DÍAS ---
    const handleDaySelect = (day: number) => {
        const [start] = selectedRange;

        if (start === null) {
            setSelectedRange([day, day]);
        } else if (start === day && selectedRange[1] === day) {
            // Deseleccionar si es el mismo día y ya está en un rango de un solo día
            setSelectedRange([null, null]);
        } else {
            const newStart = Math.min(start!, day); 
            const newEnd = Math.max(start!, day);
            const rangeLength = newEnd - newStart + 1;

            if (rangeLength > 7) {
                setSelectedRange([day, day]); 
                Alert.alert("Límite de Selección", "Solo puedes seleccionar un rango máximo de 7 días. Se ha reiniciado la selección.");
            } else {
                setSelectedRange([newStart, newEnd]);
            }
        }
    };
    // ------------------------------------------------

    const goToPreviousMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(newDate);
        setSelectedRange([null, null]); 
    };

    const goToNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(newDate);
        setSelectedRange([null, null]); 
    };
    
    // --- DATOS MEMORIZADOS (Optimizado) ---
    const monthDays = useMemo(() => generateMonthDays(currentDate), [currentDate]);

    const monthYearText = currentDate.toLocaleDateString('es-ES', { 
        month: 'long', 
        year: 'numeric' 
    }).replace(/\b\w/g, l => l.charAt(0).toUpperCase() + l.slice(1));
    
    // --- NUEVA LÓGICA: Obtener todos los registros del rango seleccionado ---
    const selectedRecordings = useMemo(() => {
        if (startDay === null || endDay === null) return [];

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        
        const allRecordings: Recording[] = [];
        for (let day = startDay; day <= endDay; day++) {
            const dayStr = String(day).padStart(2, '0');
            const dateKey = `${year}-${month}-${dayStr}`;
            // Aseguramos que solo se agreguen si hay datos para ese día simulado
            const records = getRecordingsForDay(day, dateKey);
            if (records.length > 0) {
                allRecordings.push(...records);
            }
        }
        return allRecordings;
    }, [selectedRange, currentDate, startDay, endDay]);
    
    // --- Helpers Visuales para el Calendario ---
    const isSingleDay = startDay !== null && startDay === endDay;
    const isRangeValid = startDay !== null && endDay !== null && startDay !== endDay; 

    const isDaySelected = (day: number | null) => {
        if (day === null || startDay === null || endDay === null) return false;
        return day >= startDay && day <= endDay;
    };
    const isDayStart = (day: number | null) => day !== null && day === startDay;
    const isDayEnd = (day: number | null) => day !== null && day === endDay;
    
    // --- LÓGICA DE REPORTE ---
    const handleGenerateReport = () => {
        const [start, end] = selectedRange;
        if (start === null || end === null || start === end) {
            Alert.alert("Selección Inválida", "Por favor, selecciona un rango de al menos dos días.");
            return;
        }

        const totalRecords = selectedRecordings.length;

        Alert.alert(
            "Reporte Generado", 
            `Reporte exitoso para el rango: ${start} al ${end} de ${monthYearText}.\n\nTotal de registros: ${totalRecords}`
        );
    };
    
    // --- Título de registros dinámico (Mejorado) ---
    const recordsTitle = useMemo(() => {
        if (startDay === null) {
            return "Selecciona un día o un rango (máx 7)";
        }
        if (isSingleDay) {
            return `Registros del Día ${startDay} (${selectedRecordings.length})`;
        }
        return `Registros del ${startDay} al ${endDay} (${selectedRecordings.length})`;
    }, [selectedRange, selectedRecordings.length, isSingleDay, startDay, endDay]);


    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tu Historial</Text>
                <TouchableOpacity onPress={() => console.log('Ir a estadísticas')} style={styles.headerAction}>
                    <BarChart4 size={24} color={Colors.primaryDark} />
                </TouchableOpacity>
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* --- CALENDARIO DE DÍAS (Tarjeta Minimalista) --- */}
                <View style={styles.calendarCard}>
                    <View style={styles.monthSelector}>
                        <TouchableOpacity style={styles.monthNavButton} onPress={goToPreviousMonth}>
                            <ChevronLeft size={22} color={Colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.monthText}>{monthYearText}</Text>
                        <TouchableOpacity style={styles.monthNavButton} onPress={goToNextMonth}>
                            <ChevronRight size={22} color={Colors.text} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.daysRow}>
                        {WEEK_DAYS.map((day, index) => (
                            <View key={index} style={styles.dayHeaderBox}>
                                <Text style={styles.dayHeaderText}>{day}</Text>
                            </View>
                        ))}
                    </View>
                    
                    {/* --- Cuadrícula de días (Lógica de estilo mejorada) --- */}
                    <View style={styles.dateGrid}>
                        {monthDays.map((item, index) => {
                            const isClickable = item.day !== null && item.isCurrentMonth;
                            const isSelected = isClickable && isDaySelected(item.day);
                            const isStart = isClickable && isDayStart(item.day);
                            const isEnd = isClickable && isDayEnd(item.day);
                            const isSingle = isSelected && isSingleDay;

                            return (
                                <TouchableOpacity 
                                    key={index} 
                                    style={[
                                        styles.dayBox, 
                                        // Estilo para días en medio del rango
                                        isSelected && !isSingle && styles.dayBoxInRange,
                                        // Estilo para el día inicial del rango
                                        isStart && !isSingle && styles.dayBoxStart,
                                        // Estilo para el día final del rango
                                        isEnd && !isSingle && styles.dayBoxEnd,
                                        // Estilo para un solo día seleccionado
                                        isSingle && styles.dayBoxSingleSelected,
                                    ]}
                                    onPress={() => {
                                        if(isClickable) {
                                            handleDaySelect(item.day!); 
                                        }
                                    }}
                                    disabled={!isClickable} 
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.dayNumber, 
                                        item.isCurrentMonth ? styles.dayNumberCurrent : styles.dayNumberInactive,
                                        isSelected && styles.dayNumberSelected, // Texto blanco si está seleccionado
                                    ]}>
                                        {item.day || ''}
                                    </Text>
                                    {item.hasData && <View style={[
                                        styles.dataDot, 
                                        isSelected && styles.dataDotSelected, // El punto rojo se mantiene si hay datos
                                    ]} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* --- Botón Generar Reporte (Aparece si el rango es válido) --- */}
                {isRangeValid && (
                    <TouchableOpacity 
                        style={[styles.reportButtonWrapper, { marginBottom: 15 }]} 
                        activeOpacity={0.9} 
                        onPress={handleGenerateReport}
                    >
                        <LinearGradient
                            colors={[Colors.primary, Colors.primaryDark]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.reportButtonGradient}
                        >
                            <FileText size={22} color={Colors.white} style={{ marginRight: 15 }} />
                            <Text style={styles.reportButtonText}>
                                Generar Reporte (Días {startDay} al {endDay})
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}

                {/* --- Botón de Descarga Mensual (Reporte mensual) --- */}
                <TouchableOpacity style={styles.downloadButtonWrapper} activeOpacity={0.9} onPress={() => console.log('Descargar Resumen Mensual')}>
                    <LinearGradient
                        colors={['#808080', '#606060']} 
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.downloadButtonGradient}
                    >
                        <Download size={22} color={Colors.white} style={{ marginRight: 15 }} />
                        <Text style={styles.downloadButtonText}>
                            Descargar Resumen Mensual
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* --- Registros --- */}
                <Text style={styles.recordingsSectionTitle}>{recordsTitle}</Text>
                <View style={styles.recordingsList}>
                    {selectedRecordings.length > 0 ? (
                        selectedRecordings.map((recording, index) => (
                            <TouchableOpacity
                                key={recording.id}
                                style={[styles.recordingCard, index > 0 && { marginTop: 15 }]}
                                onPress={() => router.push('/Individual')} 
                                activeOpacity={0.7}
                            >
                                <View style={styles.recordingIconContainer}>
                                    <recording.icon size={22} color={Colors.primaryDark} strokeWidth={2.5} />
                                </View>
                                
                                <View style={styles.recordingInfo}>
                                    <Text style={styles.recordingTitle}>Medición del {recording.date}</Text>
                                    <Text style={styles.recordingSubTitle}>{recording.time} - {recording.status}</Text>
                                </View>

                                <ChevronRight size={20} color={Colors.darkGray} />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                {startDay === null
                                    ? "Selecciona un día para ver tus registros."
                                    : "No hay registros para los días seleccionados."
                                }
                            </Text>
                        </View>
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
        backgroundColor: Colors.background, 
    },
    // --- HEADER PRINCIPAL ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        backgroundColor: Colors.white, 
        borderBottomColor: Colors.lightGray,
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.text, 
    },
    headerAction: {
        padding: 5,
    },
    
    // --- SCROLL CONTENT ---
    scrollContent: {
        padding: 20, 
        paddingBottom: 100,
    },

    // --- CALENDARIO (Elegante) ---
    calendarCard: {
        backgroundColor: Colors.white,
        borderRadius: 20, 
        padding: 15,
        marginBottom: 20, 
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 5 }, 
        shadowOpacity: 0.08,
        shadowRadius: 15,
        elevation: 10,
    },
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginBottom: 8, 
    },
    monthNavButton: {
        padding: 10,
        borderRadius: 15,
    },
    monthText: {
        fontSize: 19,
        fontWeight: '700',
        color: Colors.text, 
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 6, 
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        paddingBottom: 8, 
    },
    dayHeaderBox: {
        width: '14.28%', 
        alignItems: 'center',
    },
    dayHeaderText: {
        color: Colors.darkGray, 
        fontSize: 13,
        fontWeight: '700',
    },
    dateGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    dayBox: {
        width: '14.28%', 
        height: 44, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2, 
        position: 'relative',
    },
    
    // --- ESTILOS MEJORADOS PARA LA SELECCIÓN DE RANGO (Ajustados según la imagen) ---
    dayBoxSingleSelected: {
        backgroundColor: Colors.primaryDark, // Azul oscuro para un solo día
        borderRadius: 22, // Redondeado completo
    },
    dayBoxInRange: {
        backgroundColor: Colors.selectionLight, // Azul claro para días intermedios
        borderRadius: 0, // Cuadrado
    },
    dayBoxStart: {
        backgroundColor: Colors.primaryDark, // Azul oscuro para el inicio
        borderTopLeftRadius: 22,
        borderBottomLeftRadius: 22,
    },
    dayBoxEnd: {
        backgroundColor: Colors.primaryDark, // Azul oscuro para el final
        borderTopRightRadius: 22,
        borderBottomRightRadius: 22,
    },
    // --- FIN ESTILOS DE RANGO ---
    
    dayNumber: {
        fontSize: 15, 
        fontWeight: '600',
        color: Colors.text, // Por defecto texto oscuro
    },
    dayNumberCurrent: {
        color: Colors.text, 
    },
    dayNumberSelected: {
        color: Colors.white, // Texto blanco si está seleccionado (oscuro o claro)
        fontWeight: '700',
    },
    dayNumberInactive: {
        color: Colors.darkGray,
        opacity: 0.5,
    },
    dataDot: {
        position: 'absolute',
        bottom: 5,
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: Colors.red, // Rojo para indicar datos
    },
    dataDotSelected: {
        backgroundColor: Colors.white, // Punto blanco si el día está seleccionado
    },
    
    // --- BOTÓN GENERAR REPORTE (CTA PRINCIPAL) ---
    reportButtonWrapper: {
        borderRadius: 18, 
        height: 55, 
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: 6 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 10,
        elevation: 10,
    },
    reportButtonGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
    },
    reportButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    
    // --- BOTÓN DESCARGA MENSUAL (CTA SECUNDARIO) ---
    downloadButtonWrapper: {
        borderRadius: 15, 
        marginBottom: 30, 
        height: 50, 
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    downloadButtonGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    downloadButtonText: {
        color: Colors.white,
        fontSize: 15, 
        fontWeight: '600',
        letterSpacing: 0.5,
    },

    // --- REGISTROS ---
    recordingsSectionTitle: {
        fontSize: 18, 
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 12, 
        marginTop: 5,
    },
    recordingsList: {},
    recordingCard: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18, 
        borderRadius: 15, 
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    recordingIconContainer: {
        width: 48, 
        height: 48, 
        borderRadius: 12, 
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15, 
    },
    recordingInfo: {
        flex: 1,
    },
    recordingTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    recordingSubTitle: { 
        fontSize: 14,
        color: Colors.darkGray,
        fontWeight: '500',
    },
    emptyState: {
        padding: 20,
        backgroundColor: Colors.white,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.lightGray,
    },
    emptyStateText: {
        color: Colors.darkGray,
        fontSize: 15,
        textAlign: 'center',
    }
});