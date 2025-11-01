import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Animated,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EmocionalScreen() {
  const [exercicioAtivo, setExercicioAtivo] = useState(false);
  const [fase, setFase] = useState(''); // 'inspirar', 'segurar', 'expirar'
  const [contador, setContador] = useState(0);
  const [ciclo, setCiclo] = useState(0);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    if (!exercicioAtivo) return;

    const iniciarCiclo = () => {
      // Inspirar (4 segundos)
      setFase('Inspire profundamente');
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 4000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        // Segurar (4 segundos)
        setFase('Segure a respiração');
        setTimeout(() => {
          // Expirar (4 segundos)
          setFase('Expire lentamente');
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            setCiclo(prev => prev + 1);
            if (ciclo < 4) {
              iniciarCiclo();
            } else {
              setExercicioAtivo(false);
              setFase('');
              setCiclo(0);
            }
          }, 4000);
        }, 4000);
      }, 4000);
    };

    iniciarCiclo();
  }, [exercicioAtivo]);

  const iniciarExercicio = () => {
    setExercicioAtivo(true);
    setCiclo(1);
  };

  const pararExercicio = () => {
    setExercicioAtivo(false);
    setFase('');
    setCiclo(0);
    scaleAnim.setValue(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerIcon}>😊</Text>
            <Text style={styles.title}>Bem-estar Emocional</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Exercício de respiração guiada para acalmar
        </Text>

        {/* Card principal */}
        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>Respiração Guiada</Text>
          <Text style={styles.cardSubtitle}>
            Técnica 4-4-4: Inspire, segure e expire
          </Text>

          {/* Ícone animado */}
          <View style={styles.breathingContainer}>
            <Animated.View 
              style={[
                styles.breathingCircle,
                { transform: [{ scale: scaleAnim }] }
              ]}
            >
              <Text style={styles.breathingIcon}>🧘</Text>
            </Animated.View>
          </View>

          {/* Texto da fase */}
          {fase ? (
            <View style={styles.faseContainer}>
              <Text style={styles.faseTexto}>{fase}</Text>
              <Text style={styles.cicloTexto}>Ciclo {ciclo} de 5</Text>
            </View>
          ) : (
            <View style={styles.instructionsCard}>
              <Text style={styles.instructionTitle}>Como fazer:</Text>
              <Text style={styles.instructionText}>1. Inspire profundamente pelo nariz (4 segundos)</Text>
              <Text style={styles.instructionText}>2. Segure a respiração (4 segundos)</Text>
              <Text style={styles.instructionText}>3. Expire lentamente pela boca (4 segundos)</Text>
              <Text style={styles.instructionText}>4. Repita o ciclo 5 vezes</Text>
            </View>
          )}
        </View>

        {/* Botão de ação */}
        <View style={styles.actionButtons}>
          {!exercicioAtivo ? (
            <TouchableOpacity 
              style={styles.startButton} 
              onPress={iniciarExercicio}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>▶ Iniciar Exercício</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.stopButton} 
              onPress={pararExercicio}
              activeOpacity={0.8}
            >
              <Text style={styles.stopButtonText}>⏹ Parar Exercício</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Benefícios */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Benefícios:</Text>
          <Text style={styles.benefitText}>• Reduz ansiedade e estresse</Text>
          <Text style={styles.benefitText}>• Melhora a oxigenação</Text>
          <Text style={styles.benefitText}>• Acalma o sistema nervoso</Text>
          <Text style={styles.benefitText}>• Promove relaxamento</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F10',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 32,
    color: '#DC143C',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    marginBottom: 24,
    marginLeft: 52,
  },
  mainCard: {
    backgroundColor: '#1A1A1E',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 32,
    textAlign: 'center',
  },
  breathingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  breathingCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#DC143C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC143C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  breathingIcon: {
    fontSize: 60,
  },
  faseContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  faseTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DC143C',
    marginBottom: 8,
  },
  cicloTexto: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  instructionsCard: {
    backgroundColor: '#2A2B2F',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginTop: 20,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 15,
    color: '#D1D5DB',
    marginBottom: 8,
    lineHeight: 22,
  },
  actionButtons: {
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#DC143C',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC143C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: '#2A2B2F',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#DC143C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  benefitsCard: {
    backgroundColor: '#1A1A1E',
    borderRadius: 16,
    padding: 20,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 15,
    color: '#D1D5DB',
    marginBottom: 8,
    lineHeight: 22,
  },
});
