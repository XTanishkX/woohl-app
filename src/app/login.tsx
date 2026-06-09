import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
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

  return (
    <SafeAreaView className="flex-1 bg-woohl-dark">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-8"
      >
        <View className="mb-12 items-center">
          <View className="w-20 h-20 bg-woohl-orange rounded-3xl items-center justify-center mb-6 shadow-lg shadow-woohl-orange/40" style={{ transform: [{ rotate: '12deg' }] }}>
            <Text className="text-white text-4xl font-black italic" style={{ transform: [{ rotate: '-12deg' }] }}>W.</Text>
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
