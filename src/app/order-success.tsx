import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { CheckCircle, Package } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/useAppStore';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const { clearCart } = useAppStore();
  const scale = useSharedValue(0);

  useEffect(() => {
    clearCart();
    scale.value = withDelay(300, withSpring(1, { damping: 10, stiffness: 100 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-woohl-green items-center justify-center p-5">
      <Animated.View style={animatedStyle} className="items-center mb-10">
        <View className="w-24 h-24 bg-white rounded-full items-center justify-center shadow-xl shadow-black/20 mb-6">
          <CheckCircle color="#10B981" size={48} />
        </View>
        <Text className="text-white font-black text-4xl mb-2 text-center">Order Placed!</Text>
        <Text className="text-white/90 text-center font-medium">Your items are being prepared for shipping. Get ready for an amazing unboxing experience.</Text>
      </Animated.View>

      <View className="w-full bg-white/20 p-5 rounded-3xl mb-10 border border-white/30 backdrop-blur-md">
        <View className="flex-row items-center mb-2">
          <Package color="white" size={20} className="mr-3" />
          <Text className="text-white font-bold text-lg">Order #ORD_1003</Text>
        </View>
        <Text className="text-white/80 text-sm">Estimated Delivery: Tomorrow by 9 PM</Text>
      </View>

      <TouchableOpacity 
        onPress={() => router.push('/settings/orders')}
        className="w-full bg-white py-4 rounded-2xl items-center mb-4 shadow-lg shadow-black/20"
      >
        <Text className="text-woohl-green font-black uppercase tracking-widest text-sm">Track Order</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.push('/(tabs)')}
        className="w-full bg-transparent border-2 border-white py-4 rounded-2xl items-center"
      >
        <Text className="text-white font-black uppercase tracking-widest text-sm">Continue Shopping</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
