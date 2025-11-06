// app/_layout.tsx
import { AgendaProvider } from '@/contexts/AgendaContext';
import { AlergiaProvider } from '@/contexts/AlergiaContext';
import { LaudoProvider } from '@/contexts/LaudoContext';
import { RemedioProvider } from '@/contexts/RemedioContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AgendaProvider>
      <LaudoProvider>
        <RemedioProvider>
          <AlergiaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="agenda" options={{ headerShown: false }} />
            <Stack.Screen name="agenda-adicionar" options={{ headerShown: false }} />
            <Stack.Screen name="agenda-editar" options={{ headerShown: false }} />
            <Stack.Screen name="laudos" options={{ headerShown: false }} />
            <Stack.Screen name="laudos-adicionar" options={{ headerShown: false }} />
            <Stack.Screen name="laudos-editar" options={{ headerShown: false }} />
            <Stack.Screen name="emocional" options={{ headerShown: false }} />
            <Stack.Screen name="remedios" options={{ headerShown: false }} />
            <Stack.Screen name="remedios-adicionar" options={{ headerShown: false }} />
            <Stack.Screen name="remedios-editar" options={{ headerShown: false }} />
            <Stack.Screen name="alergias" options={{ headerShown: false }} />
            <Stack.Screen name="alergias-adicionar" options={{ headerShown: false }} />
            <Stack.Screen name="alergias-editar" options={{ headerShown: false }} />
            <Stack.Screen name="dados" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
          </AlergiaProvider>
        </RemedioProvider>
      </LaudoProvider>
    </AgendaProvider>
  );
}
