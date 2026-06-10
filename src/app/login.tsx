import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { withRepeat, withTiming, useSharedValue, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { useAppStore } from '../store/useAppStore';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const login = useAppStore(state => state.login);
  const router = useRouter();

  const handleLogin = () => {
    if (name.trim()) {
      login(name);
      router.replace('/(tabs)');
    }
  };

  const glowOpacity = useSharedValue(0.4);
  const glowScale = useSharedValue(1);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withTiming(0.8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    glowScale.value = withRepeat(
      withTiming(1.1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-woohl-dark">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-8"
      >
        <View className="mb-12 items-center">
          <View className="relative items-center justify-center mb-8 mt-6 w-56 h-24">
            <Animated.View 
              style={[
                glowStyle, 
                { position: 'absolute', width: 140, height: 60, backgroundColor: '#FF6A00', borderRadius: 40 }
              ]} 
              className="shadow-2xl shadow-woohl-orange"
            />
            <Image 
              source={require('../../public/logo.png')} 
              style={{ width: '100%', height: '100%', zIndex: 10 }}
              contentFit="contain"
              transition={300}
            />
          </View>
          <Text className="text-4xl font-black text-white tracking-tighter mb-2 text-center">Enter the New Era of Commerce.</Text>
          <Text className="text-zinc-400 text-center">Discover, Trust, and Shop without friction.</Text>
        </View>

        <View className="gap-4">
          <View className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4">
            <TextInput
              placeholder="What should we call you?"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
              className="text-white text-lg font-semibold"
              autoFocus
            />
          </View>
          
          <TouchableOpacity 
            onPress={handleLogin}
            disabled={!name.trim()}
            className={`py-5 rounded-2xl items-center shadow-lg transition-all ${
              name.trim() ? 'bg-woohl-orange shadow-woohl-orange/30' : 'bg-white/5 border border-white/10'
            }`}
          >
            <Text className={`font-bold text-lg ${name.trim() ? 'text-white' : 'text-white/30'}`}>
              Continue to Woohl
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
