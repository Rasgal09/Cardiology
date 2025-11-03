import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { Dumbbell, HeartHandshake, Utensils, Zap, ChevronRight, X } from "lucide-react-native"
import { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Navbar from "../components/Navbar"
import { Colors } from "../constants/Colors"

const CategoryModal = ({ visible, title, icon: IconComponent, content, onClose }: any) => {
  const { height } = Dimensions.get("window")

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <SafeAreaView style={styles.modalOverlay}>
        {/* Header del Modal - Diseño profesional mejorado */}
        <View style={styles.modalHeader}>
          <View style={styles.modalHeaderContent}>
            <View style={styles.modalIconContainer}>
              <IconComponent size={26} color={Colors.white} strokeWidth={2.5} />
            </View>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#666" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* Contenido del Modal */}
        <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
          {Array.isArray(content) ? (
            content.map((section, idx) => (
              <View key={idx} style={styles.contentSection}>
                <Text style={styles.contentSectionTitle}>{section.title}</Text>
                <Text style={styles.sectionDescription}>{section.description}</Text>

                {/* Si hay items (tabla de recomendaciones) */}
                {section.items && section.items.length > 0 && (
                  <View style={styles.itemsContainer}>
                    {section.items.map((item, itemIdx) => (
                      <View key={itemIdx} style={styles.itemRow}>
                        <View style={styles.itemBullet} />
                        <View style={styles.itemTextContainer}>
                          <Text style={styles.itemComponent}>{item.component}</Text>
                          <Text style={styles.itemRecommendation}>{item.recommendation}</Text>
                          <Text style={styles.itemDetails}>{item.details}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.contentText}>{content}</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

// --- COMPONENTE: Tarjeta de Opción ---
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
  const router = useRouter()
  const [selectedModal, setSelectedModal] = useState(null)

  const modalData = {
    alimentacion: {
      title: "Alimentación Cardiosaludable",
      icon: Utensils,
      content: [
        {
          title: "Importancia",
          description:
            "La dieta es fundamental para gestionar factores de riesgo como el colesterol, la presión arterial y el peso corporal.",
        },
        {
          title: "Componentes Recomendados",
          items: [
            {
              component: "Frutas y Verduras",
              recommendation: "Consumir abundantemente, priorizando la variedad.",
              details:
                'Son fuente de vitaminas, minerales y fibra. La fibra ayuda a reducir la absorción del colesterol LDL ("malo").',
            },
            {
              component: "Grasas",
              recommendation: "Priorizar grasas insaturadas; limitar las saturadas y trans.",
              details:
                "Usar aceite de oliva o canola. Consumir pescado graso (salmón, atún) por su aporte de ácidos grasos Omega-3.",
            },
            {
              component: "Granos y Carbohidratos",
              recommendation: "Elegir granos integrales sobre los refinados.",
              details: "Aportan fibra dietética esencial. Incluir avena, arroz integral y pan integral.",
            },
            {
              component: "Proteínas",
              recommendation: "Optar por fuentes magras.",
              details:
                "Incluir aves sin piel, pescado, legumbres y productos de soja. Limitar carnes rojas procesadas.",
            },
            {
              component: "Sodio (Sal)",
              recommendation: "Reducir drásticamente la ingesta.",
              details:
                "Limitar alimentos procesados, enlatados y comidas rápidas, altos en sodio, un factor de riesgo para la hipertensión.",
            },
            {
              component: "Azúcares y Bebidas",
              recommendation: "Evitar o minimizar el consumo de azúcares agregados.",
              details: "Preferir agua o bebidas sin azúcar. El exceso contribuye al aumento de peso.",
            },
            {
              component: "Porciones",
              recommendation: "Controlar el tamaño de las raciones.",
              details: "Comer en porciones adecuadas y distribuir calorías en varias comidas al día.",
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
          title: "Beneficios",
          description:
            "La actividad física regular fortalece el músculo cardíaco, mejora la circulación y ayuda a controlar el peso y el estrés.",
        },
        {
          title: "Recomendaciones",
          items: [
            {
              component: "Ejercicio Aeróbico",
              recommendation: "Mínimo 150 minutos semanales de actividad moderada",
              details:
                "Caminar a paso ligero, nadar o andar en bicicleta. Si prefieres ejercicio vigoroso, 75 minutos a la semana.",
            },
            {
              component: "Entrenamiento de Fuerza",
              recommendation: "Al menos dos veces por semana",
              details: "Fortalece los músculos y mejora la densidad ósea. Incluye ejercicios de resistencia.",
            },
            {
              component: "Flexibilidad",
              recommendation: "Ejercicios de estiramiento diarios",
              details: "Mejora la movilidad y reduce la rigidez muscular.",
            },
            {
              component: "Progresión",
              recommendation: "Incrementar gradualmente la intensidad",
              details: "Comenzar lentamente y aumentar la duración e intensidad conforme mejora tu condición.",
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
          description: "Modificar hábitos es clave para mantener la salud cardiovascular.",
        },
        {
          title: "Recomendaciones Clave",
          items: [
            {
              component: "Manejo del Estrés",
              recommendation: "Técnicas de relajación diarias",
              details:
                "Meditación, respiración profunda, yoga o tai chi. El estrés crónico afecta la presión arterial.",
            },
            {
              component: "Calidad del Sueño",
              recommendation: "7-9 horas cada noche",
              details: "Mantén horarios regulares de sueño. El descanso inadecuado aumenta riesgos cardiovasculares.",
            },
            {
              component: "Abandonar el Tabaco",
              recommendation: "Dejar de fumar completamente",
              details: "Es uno de los factores de riesgo más importantes. Busca apoyo profesional si es necesario.",
            },
            {
              component: "Limitar Alcohol",
              recommendation: "Consumo moderado",
              details: "Para hombres: máximo 2 bebidas/día. Para mujeres: máximo 1 bebida/día.",
            },
            {
              component: "Control de Peso",
              recommendation: "Mantener IMC saludable",
              details: "Un peso adecuado reduce la carga sobre el corazón.",
            },
            {
              component: "Chequeos Médicos",
              recommendation: "Revisiones regulares",
              details: "Monitorea presión arterial, colesterol y glucosa según recomendación médica.",
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
          description:
            "Estar atento a los síntomas te permite detectar cambios en tu estado de salud y buscar ayuda médica a tiempo.",
        },
        {
          title: "Síntomas de Alerta",
          items: [
            {
              component: "Dolor o Presión en el Pecho",
              recommendation: "Busca atención médica inmediata",
              details: "Especialmente si va acompañado de dificultad para respirar, mareos o sudoración fría.",
            },
            {
              component: "Falta de Aliento",
              recommendation: "Reporta cualquier cambio respecto a lo normal",
              details: "Puede indicar problemas cardíacos o pulmonares. Anota cuándo ocurre.",
            },
            {
              component: "Palpitaciones",
              recommendation: "Registra la frecuencia y duración",
              details: "Si persisten o van acompañadas de mareos, consulta a tu médico.",
            },
            {
              component: "Fatiga Inusual",
              recommendation: "Descansa adecuadamente",
              details: "Si persiste, puede ser síntoma de problemas cardíacos. Reporta a tu médico.",
            },
            {
              component: "Hinchazón en Piernas o Tobillos",
              recommendation: "Contacta a tu médico",
              details: "Puede indicar problemas de circulación o acumulación de líquidos.",
            },
            {
              component: "Mareos o Desmayos",
              recommendation: "Busca atención médica",
              details: "Pueden indicar problemas graves. No ignores estos síntomas.",
            },
          ],
        },
      ],
    },
    medicamentos: {
      title: "Medicamentos",
      icon: Utensils,
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
              details:
                "No interrumpas ni cambies dosis sin consultar a tu médico. La consistencia es clave para su efectividad.",
            },
            {
              component: "Horario Regular",
              recommendation: "Establece recordatorios",
              details: "Toma los medicamentos a la misma hora cada día para mejores resultados.",
            },
            {
              component: "Comprensión de Medicamentos",
              recommendation: "Conoce qué hace cada uno",
              details:
                "Pregunta a tu médico o farmacéutico sobre los efectos de cada medicamento y efectos secundarios posibles.",
            },
            {
              component: "Efectos Secundarios",
              recommendation: "Reporta cambios o molestias",
              details: "Si experimentas síntomas nuevos, no suspendas; consulta a tu médico para ajustar la dosis.",
            },
            {
              component: "Almacenamiento",
              recommendation: "Conserva en lugar fresco y seco",
              details: "Evita luz solar directa y temperaturas extremas. Mantén fuera del alcance de niños.",
            },
            {
              component: "Interacciones",
              recommendation: "Informa todos tus medicamentos",
              details: "Algunos medicamentos pueden interactuar. Asegúrate de que tu médico conoce todo lo que tomas.",
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
      icon: Utensils,
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
      {/* --- HEADER --- */}
      <View style={styles.header}>
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
            <HeartHandshake size={34} color={Colors.white} strokeWidth={2} style={styles.mainCardIcon} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  // --- HEADER ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 4,
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

  // --- TARJETA PRINCIPAL con Degradado ---
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

  // --- OPCIONES DE CUIDADO (Tarjetas Blancas) ---
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  modalHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  modalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    flex: 1,
  },
  closeButton: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  modalContent: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  contentSection: {
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  contentSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 14,
    fontWeight: "500",
  },
  itemsContainer: {
    marginTop: 14,
    gap: 2,
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 14,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    gap: 12,
  },
  itemBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 8,
    flexShrink: 0,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemComponent: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 3,
  },
  itemRecommendation: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginBottom: 3,
    lineHeight: 18,
  },
  itemDetails: {
    fontSize: 12,
    color: "#777",
    lineHeight: 16,
    fontStyle: "italic",
  },
  contentText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
})
