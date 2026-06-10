import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Users, Share2, Copy, Wallet } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ReferralScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center z-10 shadow-sm shadow-zinc-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Refer & Earn</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        {/* Banner */}
        <View className="bg-gradient-to-br from-[#10B981] to-[#047857] rounded-3xl p-6 shadow-2xl shadow-[#10B981]/40 mb-8 border border-white/20">
          <Text className="text-white font-black text-3xl mb-2 tracking-tight">Get ₹500 for every friend who joins</Text>
          <Text className="text-white/80 font-bold text-sm mb-6 w-5/6">Your friend gets ₹200 on sign up. You get ₹500 when they make their first purchase.</Text>
          
          <View className="bg-white/20 p-4 rounded-2xl border border-white/30 flex-row justify-between items-center">
            <View>
              <Text className="text-white/60 font-black text-[10px] uppercase tracking-widest mb-1">Your Code</Text>
              <Text className="text-white font-black text-2xl tracking-widest">WHL-ADITI24</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg">
              <Copy color="#047857" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Stats */}
        <View className="flex-row justify-between mb-8 gap-4">
          <View className="flex-1 bg-white p-5 rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 items-center">
            <View className="w-12 h-12 bg-[#10B981]/10 rounded-full items-center justify-center mb-3">
              <Wallet color="#10B981" size={24} />
            </View>
            <Text className="text-woohl-dark font-black text-2xl mb-1">₹1,500</Text>
            <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest text-center">Total Earned</Text>
          </View>
          <View className="flex-1 bg-white p-5 rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 items-center">
            <View className="w-12 h-12 bg-[#3B82F6]/10 rounded-full items-center justify-center mb-3">
              <Users color="#3B82F6" size={24} />
            </View>
            <Text className="text-woohl-dark font-black text-2xl mb-1">3</Text>
            <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest text-center">Successful Invites</Text>
          </View>
        </View>

        <TouchableOpacity className="w-full h-14 bg-woohl-dark rounded-2xl items-center justify-center flex-row shadow-xl shadow-black/20 mb-8">
          <Share2 color="white" size={20} className="mr-2" />
          <Text className="text-white font-black text-sm uppercase tracking-widest">Share Invite Link</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
