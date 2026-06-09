import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, Gift, Share2, Copy, Unlock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/useAppStore';

export default function WalletScreen() {
  const router = useRouter();
  const { referralBalance, referralThreshold } = useAppStore();
  const progress = Math.min((referralBalance / referralThreshold) * 100, 100);
  const isUnlocked = referralBalance >= referralThreshold;

  return (
    <SafeAreaView className="flex-1 bg-woohl-dark">
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center border-b border-white/10 z-10">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 bg-white/10 p-2 rounded-full">
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white tracking-tight">Referral Wallet</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        className="px-5 pt-8"
      >
        {/* Hero Graphic */}
        <View className="items-center mb-10">
          <View className="w-24 h-24 bg-woohl-orange/20 rounded-full items-center justify-center mb-6 relative">
            <View className="absolute inset-0 border-2 border-woohl-orange/40 rounded-full animate-ping" />
            <Gift color="#F34F17" size={48} />
          </View>
          <Text className="text-3xl font-black text-white text-center mb-2">Share & Earn</Text>
          <Text className="text-white/60 text-center px-4 leading-relaxed">
            Invite friends to Woohl. Both get ₹20-₹30. Unlock at ₹600 and use it as real cash!
          </Text>
        </View>

        {/* Dynamic Progression Wheel/Bar */}
        <View className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 relative overflow-hidden">
          {/* Background Glow */}
          <View className="absolute top-0 right-0 w-32 h-32 bg-woohl-orange/10 rounded-full blur-3xl" />
          
          <View className="flex-row justify-between items-end mb-4">
            <View>
              <Text className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Current Balance</Text>
              <Text className="text-4xl font-black text-woohl-orange">₹{referralBalance}</Text>
            </View>
            <View className="items-end">
              <Text className="text-white/40 text-xs font-bold uppercase">Target</Text>
              <Text className="text-white/80 font-bold text-lg">₹{referralThreshold}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="h-4 bg-white/10 rounded-full mb-4 overflow-hidden relative">
            <View className="h-full bg-gradient-to-r from-woohl-orange/50 to-woohl-orange rounded-full" style={{ width: `${progress}%` }} />
          </View>

          {isUnlocked ? (
            <View className="bg-woohl-green/20 border border-woohl-green/30 rounded-xl p-3 flex-row items-center justify-center mt-2">
              <Unlock color="#10B981" size={16} className="mr-2" />
              <Text className="text-woohl-green font-bold text-sm">Credits Unlocked! Ready to use.</Text>
            </View>
          ) : (
            <Text className="text-white/60 text-xs text-center mt-2">
              ₹{referralThreshold - referralBalance} more to unlock your credits.
            </Text>
          )}
        </View>

        {/* Share Section */}
        <View className="gap-4 mb-12">
          <TouchableOpacity className="bg-woohl-orange py-4 rounded-xl flex-row items-center justify-center shadow-lg shadow-woohl-orange/30">
            <Share2 color="white" size={20} className="mr-2" />
            <Text className="text-white font-bold text-lg">Share via WhatsApp</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-white/10 py-4 rounded-xl flex-row items-center justify-center border border-white/20">
            <Text className="text-white font-bold text-base mr-3 tracking-widest">WOOHLGENZ99</Text>
            <Copy color="white" size={18} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
