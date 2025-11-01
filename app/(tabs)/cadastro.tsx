// app/cadastro.tsx
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoSanguineo, setTipoSanguineo] = useState<string | undefined>(undefined);
  const [doenca, setDoenca] = useState<string | undefined>(undefined);

  function onContinuar() {
    // depois validamos e salvamos; por enquanto só navega para a tela principal
    router.replace("/(tabs)/explore");
  }

  function onGoogle() {
    alert("Login com Google (exemplo)");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Cadastro</Text>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput style={styles.input} placeholder="Seu nome" placeholderTextColor="#9CA3AF" value={nome} onChangeText={setNome} />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="voce@email.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Tipo sanguíneo</Text>
              <View style={styles.pickerBox}>
                <Picker
                  selectedValue={tipoSanguineo}
                  onValueChange={(v) => setTipoSanguineo(v)}
                  dropdownIconColor="#9CA3AF"
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione" value={undefined} color="#000000" />
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                    <Picker.Item key={t} label={t} value={t} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={{ width: 12 }} />

            <View style={styles.col}>
              <Text style={styles.label}>Doença cardíaca (opcional)</Text>
              <View style={styles.pickerBox}>
                <Picker
                  selectedValue={doenca}
                  onValueChange={(v) => setDoenca(v)}
                  dropdownIconColor="#000000"
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione" value={undefined} color="Black " />
                  {[
                    "Hipertensão",
                    "Arritmia",
                    "Insuficiência",
                    "Cardiopatia Congênita",
                    "Coronariana",
                    "Insuficiência Cardiaca",
                    "Cardiomiopatia",
                  ].map((d) => (
                    <Picker.Item key={d} label={d} value={d} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <Pressable onPress={onContinuar} style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]}>
            <Text style={styles.primaryText}>Continuar</Text>
          </Pressable>

          <Pressable onPress={onGoogle} style={({ pressed }) => [styles.googleBtn, pressed && { opacity: 0.9 }]}>
            <AntDesign name="google" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.googleText}>Continuar com o Google</Text>
          </Pressable>

          <Text style={styles.disclaimer}>
            Seus dados são protegidos e usados{"\n"}apenas para cuidar da sua saúde.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0F0F10" },
  content: { padding: 24 },
  title: { color: "#fff", fontSize: 28, fontWeight: "800", marginBottom: 24, alignSelf: "center" },
  label: { color: "#D1D5DB", marginBottom: 8, marginTop: 12 },
  input: {
    backgroundColor: "#16171A",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#2A2B2F",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
  },
  row: { flexDirection: "row", marginTop: 8 },
  col: { flex: 1 },
  pickerBox: {
    backgroundColor: "#16171A",
    borderWidth: 1,
    borderColor: "#2A2B2F",
    borderRadius: 10,
    overflow: "hidden",
  },
  // única alteração: fundo escuro + remove borda interna no Web
  picker: {
    color: "#fff",
    height: 44,
    backgroundColor: "#16171A",
    ...(Platform.OS === "web"
      ? {
          borderWidth: 0,
          outlineWidth: 0,
          outlineColor: "transparent",
          borderRadius: 0,
        }
      : {}),
  },
  primaryBtn: {
    backgroundColor: "#FF4D5A",
    borderRadius: 12,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  googleBtn: {
    backgroundColor: "#202125",
    borderRadius: 12,
    height: 48,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#2A2B2F",
  },
  googleText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  disclaimer: { color: "#9CA3AF", textAlign: "center", marginTop: 18, lineHeight: 20 },
});
 