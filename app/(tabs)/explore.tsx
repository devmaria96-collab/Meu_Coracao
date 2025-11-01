import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const cards = [
    { id: 1, title: "Remédios", icon: "💊", route: "/remedios" },
    { id: 2, title: "Alergias", icon: "🩸", route: "/alergias" },
    { id: 3, title: "Agenda", icon: "📅", route: "/agenda" },
    { id: 4, title: "Laudos", icon: "🧬", route: "/laudos" },
    { id: 5, title: "Emocional", icon: "💗", route: "/emocional" },
    { id: 6, title: "Meu Coração", icon: "💗", route: "/meu-coracao" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>Olá, Maria</Text>

        <View style={styles.grid}>
          {cards.map((card) => (
            <Pressable
              key={card.id}
              style={({ pressed }) => [styles.card, pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }]}
              onPress={() => console.log(`Navegando para ${card.route}`)}
            >
              <Text style={styles.icon}>{card.icon}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    padding: 20,
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
