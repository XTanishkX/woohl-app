import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Coins, Award, Target, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function RewardsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center z-10 shadow-sm shadow-zinc-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Rewards Center</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        {/* Wallet Balance */}
        <View className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-3xl p-6 shadow-2xl shadow-[#F59E0B]/40 mb-8 border border-white/20">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3 border border-white/30">
              <Coins color="white" size={20} />
            </View>
            <Text className="text-white font-black text-sm uppercase tracking-widest">Woohl Coins</Text>
          </View>
          <Text className="text-white font-black text-5xl mb-2 tracking-tight">1,240</Text>
          <Text className="text-white/80 font-bold text-sm">Value: ₹1,240 (1 Coin = ₹1)</Text>
          <TouchableOpacity className="mt-6 bg-white py-3 rounded-xl items-center shadow-lg shadow-black/10">
            <Text className="text-[#D97706] font-black text-xs uppercase tracking-widest">Redeem Coins</Text>
          </TouchableOpacity>
        </View>

        {/* Milestones & Gamification */}
        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Your Shopping Milestones</Text>
        <View className="bg-white rounded-3xl p-5 shadow-xl shadow-zinc-200/50 mb-8 border border-zinc-100">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Award color="#10B981" size={24} className="mr-3" />
              <View>
                <Text className="text-woohl-dark font-black text-base mb-0.5">Eco Champion</Text>
                <Text className="text-zinc-500 font-bold text-xs">Buy 5 Sustainable Products</Text>
              </View>
            </View>
            <Text className="text-woohl-green font-black text-xs uppercase tracking-widest">+500 Coins</Text>
          </View>
          <View className="h-2 bg-zinc-100 w-full rounded-full overflow-hidden mb-2">
            <View className="h-full bg-woohl-green w-[80%]" />
          </View>
          <Text className="text-zinc-400 text-[10px] font-black text-right uppercase tracking-widest">4 / 5 Bought</Text>
        </View>

        <View className="bg-white rounded-3xl p-5 shadow-xl shadow-zinc-200/50 mb-8 border border-zinc-100">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Target color="#3B82F6" size={24} className="mr-3" />
              <View>
                <Text className="text-woohl-dark font-black text-base mb-0.5">Startup Supporter</Text>
                <Text className="text-zinc-500 font-bold text-xs">Follow 10 Startups</Text>
              </View>
            </View>
            <Text className="text-[#3B82F6] font-black text-xs uppercase tracking-widest">+200 Coins</Text>
          </View>
          <View className="h-2 bg-zinc-100 w-full rounded-full overflow-hidden mb-2">
            <View className="h-full bg-[#3B82F6] w-[100%]" />
          </View>
          <TouchableOpacity className="mt-2 bg-[#3B82F6]/10 py-2 rounded-xl items-center border border-[#3B82F6]/20">
            <Text className="text-[#3B82F6] font-black text-[10px] uppercase tracking-widest">Claim Reward</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Recent Activity</Text>
        {[1, 2, 3].map((item) => (
          <View key={item} className="flex-row items-center justify-between bg-white p-4 rounded-2xl mb-3 border border-zinc-100 shadow-sm shadow-zinc-200/50">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-zinc-50 rounded-full items-center justify-center mr-3">
                <Coins color="#F59E0B" size={16} />
              </View>
              <View>
                <Text className="text-woohl-dark font-bold text-sm">Purchase Cashback</Text>
                <Text className="text-zinc-500 text-[10px] uppercase tracking-widest">Order #12345</Text>
              </View>
            </View>
            <Text className="text-[#F59E0B] font-black text-sm">+45 Coins</Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
