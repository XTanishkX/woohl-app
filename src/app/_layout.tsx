import '../global.css';

import { Stack, ErrorBoundary as ExpoErrorBoundary } from 'expo-router';
import { useColorScheme, View, Text, TouchableOpacity } from 'react-native';

import { AppQueryProvider } from '@/providers/query-provider';
import { Button } from '@/components/ui/Button';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  return (
    <AppQueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="checkout/index" />
        <Stack.Screen name="creator/[id]" />
      </Stack>
    </AppQueryProvider>
  );
}
