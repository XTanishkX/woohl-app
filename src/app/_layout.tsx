import '../global.css';

import { Stack, ErrorBoundary as ExpoErrorBoundary } from 'expo-router';
import { useColorScheme, View, Text, TouchableOpacity } from 'react-native';

import { AppQueryProvider } from '@/providers/query-provider';
import { Button } from '@/components/ui/Button';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';
import { LiveActivityTicker } from '@/components/ui/LiveActivityTicker';

function ToastNotification() {
  const { toastMessage } = useAppStore();

  if (!toastMessage) return null;

  return (
    <Animated.View 
      entering={FadeInUp.springify()} 
      exiting={FadeOutUp}
      className="absolute top-14 left-5 right-5 bg-woohl-green/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl shadow-woohl-green/30 flex-row items-center justify-center z-50"
    >
      <Text className="text-white font-black text-sm text-center">{toastMessage}</Text>
    </Animated.View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppQueryProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="creator/[id]" />
        </Stack>
        <ToastNotification />
        <LiveActivityTicker />
      </AppQueryProvider>
    </GestureHandlerRootView>
  );
}
