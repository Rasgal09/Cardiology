import React, { useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import {
  Dumbbell,
  HeartHandshake,
  Utensils,
  Zap,
  ChevronRight,
  X,
  AlertCircle,
} from "lucide-react-native"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Navbar from "../components/Navbar"
import { Colors } from "../constants/Colors"

const CategoryModal = ({ visible, title, icon: IconComponent, content, onClose }: any) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <SafeAreaView style={styles.modalOverlay}>
        {/* Encabezado con gradiente */}
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.premiumHeader}
        >
          <View style={styles.headerTopBar}>
            <TouchableOpacity onPress={onClose} style={styles.closeButtonHeader}>
              <X size={28} color={Colors.white} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalHeaderIconContainer}>
            <View style={styles.modalHeaderIconCircle}>
              <IconComponent size={46} color={Colors.white} strokeWidth={2} />
            </View>
          </View>

          <Text style={styles.modalHeaderTitle}>{title}</Text>
          <Text style={styles.modalHeaderSubtitle}>
            Conoce los pilares clave para cuidar tu salud cardiovascular
          </Text>
        </LinearGradient>

        {/* Contenido rediseñado */}
        <ScrollView
          contentContainerStyle={styles.modalContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {Array.isArray(content) &&
            content.map((section: any, idx: number) => (
              <View key={idx} style={styles.sectionCard}>
                <LinearGradient
                  colors={["#ffffff", "#f7f9fc"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.sectionInnerCard}
                >
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.description && (
                    <Text style={styles.sectionDescription}>{section.description}</Text>
                  )}

                  {/* Items como tarjetas visuales, no listas */}
                  {section.items && (
                    <View style={styles.itemsContainer}>
                      {section.items.map((item: any, i: number) => (
                        <LinearGradient
                          key={i}
                          colors={["#ffffff", "#f0f4ff"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.itemElegantCard}
                        >
                          <View style={styles.itemTopBar}>
                            <Text style={styles.itemComponent}>{item.component}</Text>
                            <View style={styles.itemDivider} />
                          </View>

                          <Text style={styles.itemRecommendation}>{item.recommendation}</Text>

                          {item.details && (
                            <Text style={styles.itemDetails}>{item.details}</Text>
                          )}

                          {item.practicalExample && (
                            <View style={styles.exampleContainer}>
                              <Text style={styles.exampleTitle}>Considerar</Text>
                              <Text style={styles.exampleText}>{item.practicalExample}</Text>
                            </View>
                          )}
                        </LinearGradient>
                      ))}
                    </View>
                  )}
                </LinearGradient>
              </View>
            ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

// --- Tarjeta de Opción ---
const OptionCard = ({ title, description, icon: IconComponent, onPress }: any) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.optionHeader}>
      <IconComponent size={24} color={Colors.primary} strokeWidth={2.5} style={{ marginRight: 15 }} />

      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <ChevronRight size={20} color={"#999"} style={styles.optionArrow} />
    </View>
  </TouchableOpacity>
)

export default function CuidadosScreen() {
  const [selectedModal, setSelectedModal] = useState<string | null>(null)

  const modalData: Record<string, any> = {
    alimentacion: {
      title: "Alimentación Cardiosaludable",
      icon: Utensils,
      content: [
        {
          title: "Objetivo de la Dieta",
          description:
            "El objetivo es una dieta rica en fibra, baja en grasas saturadas, sodio y azúcares simples, siguiendo patrones como la Dieta Mediterránea o la dieta DASH.",
        },
        {
          title: "Recomendaciones por Categoría",
          items: [
            {
              component: "Grasas Saludables",
              recommendation: "Reemplazar las grasas saturadas por insaturadas.",
              practicalExample:
                "Salmón al horno con aceite de oliva virgen extra y limón. El salmón aporta Omega-3 (poliinsaturados). También usar aguacate como topping en tostadas.",
            },
            {
              component: "Aumento de Fibra",
              recommendation: "Consumir frutas, verduras y granos enteros en cada comida.",
              practicalExample:
                "Desayuno: Avena cocida con agua o leche descremada, con trozos de manzana, nueces y semillas de chía. Evitar avena instantánea azucarada.",
            },
            {
              component: "Reducción de Sodio",
              recommendation: "Cocinar en casa y limitar los alimentos procesados.",
              practicalExample:
                "Reemplazar sal por mezclas de especias naturales (pimienta, ajo en polvo, cebolla, pimentón, cúrcuma) e hierbas frescas. Evitar sopas en cubo o enlatadas.",
            },
            {
              component: "Control de Porciones y Azúcar",
              recommendation: "Ser consciente de la cantidad que se come y evitar el azúcar añadido.",
              practicalExample:
                "Snack: Sustituir galletas por frutos secos sin sal o yogur griego natural con bayas frescas.",
            },
          ],
        },
      ],
    },
    actividad: {
      title: "Actividad Física",
      icon: Dumbbell,
      content: [
        {
          title: "Beneficios del Ejercicio",
          description:
            "La actividad física regular fortalece el músculo cardíaco, mejora la circulación y ayuda a controlar el peso y el estrés.",
        },
        {
          title: "Rutinas Recomendadas",
          items: [
            {
              component: "Ejercicio Aeróbico",
              recommendation: "Acumular 150 minutos de actividad moderada semanal",
              practicalExample:
                "Camine a paso rápido 30 minutos al día, 5 días a la semana. O bien, tome una clase de baile o natación (60 min) 2 veces por semana y complete con caminatas cortas.",
            },
            {
              component: "Entrenamiento de Fuerza",
              recommendation: "Fortalecer los principales grupos musculares dos veces por semana",
              practicalExample:
                "Realizar sentadillas, flexiones de pared y levantamiento de pesas ligeras (botellas de agua) 20 minutos, 2 veces por semana.",
            },
            {
              component: "Flexibilidad",
              recommendation: "Ejercicios de estiramiento diarios",
              practicalExample: "Yoga o tai chi 15 minutos al día mejora la movilidad y reduce rigidez.",
            },
            {
              component: "Progresión",
              recommendation: "Incrementar gradualmente la intensidad",
              practicalExample:
                "Comenzar lentamente y aumentar duración e intensidad conforme mejora tu condición física.",
            },
          ],
        },
      ],
    },
    habitos: {
      title: "Hábitos y Costumbres",
      icon: Zap,
      content: [
        {
          title: "Cambios Importantes",
          description: "Modificar hábitos es clave para mantener la salud cardiovascular a largo plazo.",
        },
        {
          title: "Recomendaciones Clave",
          items: [
            {
              component: "Manejo del Estrés",
              recommendation: "Técnicas de relajación diarias",
              practicalExample:
                "Meditación, respiración profunda, yoga o tai chi. El estrés crónico afecta presión arterial.",
            },
            {
              component: "Calidad del Sueño",
              recommendation: "7-9 horas cada noche",
              practicalExample:
                "Mantén horarios regulares de sueño. Descanso inadecuado aumenta riesgos cardiovasculares.",
            },
            {
              component: "Abandonar el Tabaco",
              recommendation: "Dejar de fumar completamente",
              practicalExample:
                "Es uno de los factores de riesgo más importantes. Busca apoyo profesional si es necesario.",
            },
            {
              component: "Limitar Alcohol",
              recommendation: "Consumo moderado",
              practicalExample: "Hombres: máximo 2 bebidas/día. Mujeres: máximo 1 bebida/día.",
            },
            {
              component: "Control de Peso",
              recommendation: "Mantener IMC saludable",
              practicalExample: "Un peso adecuado reduce significativamente la carga sobre el corazón.",
            },
            {
              component: "Chequeos Médicos",
              recommendation: "Revisiones regulares",
              practicalExample: "Monitorea presión arterial, colesterol y glucosa según recomendación médica.",
            },
          ],
        },
      ],
    },
    monitoreo: {
      title: "Monitoreo de Síntomas",
      icon: HeartHandshake,
      content: [
        {
          title: "Importancia del Monitoreo",
          description: "Estar atento a los síntomas te permite detectar cambios y buscar ayuda médica a tiempo.",
        },
        {
          title: "Síntomas de Alerta",
          description: "Estar atento a los síntomas te permite detectar cambios y buscar ayuda médica a tiempo.",
          items: [
            {
              component: "Dolor o Presión en el Pecho",
              recommendation: "Busca atención médica inmediata",
              practicalExample: "Especialmente si va acompañado de dificultad para respirar, mareos o sudoración fría.",
            },
            {
              component: "Falta de Aliento",
              recommendation: "Reporta cualquier cambio respecto a lo normal",
              practicalExample: "Puede indicar problemas cardíacos o pulmonares. Anota cuándo ocurre.",
            },
            {
              component: "Palpitaciones",
              recommendation: "Registra la frecuencia y duración",
              practicalExample: "Si persisten o van acompañadas de mareos, consulta a tu médico inmediatamente.",
            },
            {
              component: "Fatiga Inusual",
              recommendation: "Descansa adecuadamente",
              practicalExample: "Si persiste, puede ser síntoma de problemas cardíacos. Reporta a tu médico.",
            },
            {
              component: "Hinchazón en Piernas o Tobillos",
              recommendation: "Contacta a tu médico",
              practicalExample: "Puede indicar problemas de circulación o acumulación de líquidos.",
            },
            {
              component: "Mareos o Desmayos",
              recommendation: "Busca atención médica",
              practicalExample: "Pueden indicar problemas graves. No ignores estos síntomas.",
            },
          ],
        },
      ],
    },
    medicamentos: {
      title: "Medicamentos",
      icon: AlertCircle, // Usamos AlertCircle para Medicamentos, ya que Utensils estaba repetido
      content: [
        {
          title: "Cumplimiento del Tratamiento",
          description:
            "Tomar los medicamentos prescritos es fundamental para controlar la enfermedad cardiovascular y prevenir complicaciones.",
        },
        {
          title: "Recomendaciones Importantes",
          items: [
            {
              component: "Adherencia al Tratamiento",
              recommendation: "Toma todos los medicamentos según lo prescrito",
              practicalExample:
                "No interrumpas ni cambies dosis sin consultar a tu médico. La consistencia es clave para efectividad.",
            },
            {
              component: "Horario Regular",
              recommendation: "Establece recordatorios",
              practicalExample: "Toma los medicamentos a la misma hora cada día para mejores resultados.",
            },
            {
              component: "Comprensión de Medicamentos",
              recommendation: "Conoce qué hace cada uno",
              practicalExample:
                "Pregunta a tu médico o farmacéutico sobre efectos de cada medicamento y efectos secundarios.",
            },
            {
              component: "Efectos Secundarios",
              recommendation: "Reporta cambios o molestias",
              practicalExample:
                "Si experimentas síntomas nuevos, no suspendas; consulta a tu médico para ajustar dosis.",
            },
            {
              component: "Almacenamiento",
              recommendation: "Conserva en lugar fresco y seco",
              practicalExample: "Evita luz solar directa y temperaturas extremas. Mantén fuera del alcance de niños.",
            },
            {
              component: "Interacciones",
              recommendation: "Informa todos tus medicamentos",
              practicalExample:
                "Algunos medicamentos pueden interactuar. Asegúrate de que tu médico conoce todo lo que tomas.",
            },
          ],
        },
      ],
    },
  }

  const careOptions = [
    {
      title: "Alimentación Saludable",
      description: "Descubre dietas ricas en nutrientes que fortalecen tu sistema cardiovascular.",
      icon: Utensils,
      key: "alimentacion",
    },
    {
      title: "Actividad Física",
      description: "Planes de ejercicios recomendados para mantener un corazón fuerte y sano.",
      icon: Dumbbell,
      key: "actividad",
    },
    {
      title: "Hábitos y Costumbres",
      description: "Consejos para el manejo del estrés, sueño y abandono de malos hábitos.",
      icon: Zap,
      key: "habitos",
    },
    {
      title: "Monitoreo de Síntomas",
      description: "Aprende a identificar síntomas de alerta y cuándo buscar ayuda médica.",
      icon: HeartHandshake,
      key: "monitoreo",
    },
    {
      title: "Medicamentos",
      description: "Información sobre la importancia de la adherencia al tratamiento farmacológico.",
      icon: AlertCircle,
      key: "medicamentos",
    },
  ]

  const mainAdvice =
    "Adopta hábitos de vida saludables: mantén una dieta rica en frutas, verduras y granos integrales, haz ejercicio regularmente, controla tu peso y realiza chequeos médicos periódicos."

  const handleCardPress = (key: string) => {
    setSelectedModal(key)
  }

  const handleCloseModal = () => {
    setSelectedModal(null)
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cuidados del Corazón</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainCardWrapper}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.mainCardGradient}
          >
            <HeartHandshake size={34} color={Colors.white} strokeWidth={2} style={styles.mainCardIcon} />
            <Text style={styles.mainCardTitle}>Consejo Esencial</Text>
            <Text style={styles.mainCardText}>{mainAdvice}</Text>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Explora por Categoría</Text>
        <View style={styles.optionsContainer}>
          {careOptions.map((option, index) => (
            <OptionCard
              key={index}
              title={option.title}
              description={option.description}
              icon={option.icon}
              onPress={() => handleCardPress(option.key)}
            />
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {selectedModal && (
        <CategoryModal
          visible={true}
          title={modalData[selectedModal].title}
          icon={modalData[selectedModal].icon}
          content={modalData[selectedModal].content}
          onClose={handleCloseModal}
        />
      )}

      <Navbar />
    </SafeAreaView>
  )
}

// ========================= ESTILOS =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  mainCardWrapper: {
    borderRadius: 15,
    marginBottom: 25,
    overflow: "hidden",
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
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 6,
  },
  mainCardText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
  },
  optionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 3,
  },
  optionDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  optionArrow: {
    marginLeft: 15,
  },

  // =================== MODAL REESTILIZADO ===================
  modalOverlay: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  premiumHeader: {
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 35,
  },
  headerTopBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  closeButtonHeader: {
    padding: 10,
  },
  modalHeaderIconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeaderIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeaderTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.white,
    textAlign: "center",
    marginBottom: 6,
  },
  modalHeaderSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 20,
  },
  modalContentContainer: {
    padding: 22,
    gap: 25,
  },
  sectionCard: {
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
    backgroundColor: "white",
  },
  sectionInnerCard: {
    borderRadius: 18,
    padding: 20,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primaryDark,
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 21,
    marginBottom: 10,
  },
  itemsContainer: {
    gap: 16,
  },
  itemElegantCard: {
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  itemTopBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  itemComponent: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
    flex: 1,
  },
  itemDivider: {
    height: 1,
    width: "20%",
    backgroundColor: "rgba(59,130,246,0.3)",
  },
  itemRecommendation: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    fontWeight: "500",
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#555",
    lineHeight: 19,
    marginBottom: 6,
  },
  exampleContainer: {
    backgroundColor: "rgba(59,130,246,0.08)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  exampleTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.primaryDark,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  exampleText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },
})
