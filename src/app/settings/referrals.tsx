import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Share } from 'react-native';
import { ArrowLeft, Users, ShieldCheck, Share2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function ReferralsScreen() {
  const router = useRouter();
  const { referralCredits } = useAppStore();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Use my code WHL-9824 to get ₹200 off your first purchase on Woohl!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Referrals</Text>
      </View>

      <ScrollView className="flex-1 p-5">
        <View className="bg-woohl-dark rounded-3xl p-8 items-center mb-6 shadow-xl shadow-black/20">
          <ShieldCheck color="#10B981" size={48} className="mb-4" />
          <Text className="text-white/80 font-bold uppercase tracking-widest text-xs mb-1">Total Earned</Text>
          <Text className="text-white font-black text-4xl mb-4">₹{referralCredits}</Text>
          
          <View className="bg-white/10 w-full p-4 rounded-2xl flex-row items-center justify-between border border-white/20">
            <View>
              <Text className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Your Code</Text>
              <Text className="text-white font-black text-xl tracking-widest">WHL-9824</Text>
            </View>
            <TouchableOpacity onPress={handleShare} className="w-10 h-10 bg-white rounded-full items-center justify-center">
              <Share2 color="#111827" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-woohl-dark font-black text-lg mb-4 ml-2">How it works</Text>
        <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-6 mb-8">
          <View className="flex-row mb-6">
            <View className="w-8 h-8 bg-zinc-100 rounded-full items-center justify-center mr-4">
              <Text className="text-woohl-dark font-black">1</Text>
            </View>
            <View className="flex-1">
              <Text className="font-black text-woohl-dark text-base mb-1">Share your link</Text>
              <Text className="text-zinc-500 text-sm">Send your unique referral link or code to your friends.</Text>
            </View>
          </View>
          <View className="flex-row mb-6">
            <View className="w-8 h-8 bg-zinc-100 rounded-full items-center justify-center mr-4">
              <Text className="text-woohl-dark font-black">2</Text>
            </View>
            <View className="flex-1">
              <Text className="font-black text-woohl-dark text-base mb-1">Friends get ₹200</Text>
              <Text className="text-zinc-500 text-sm">When they sign up and make their first purchase.</Text>
            </View>
          </View>
          <View className="flex-row">
            <View className="w-8 h-8 bg-woohl-green/20 rounded-full items-center justify-center mr-4">
              <Text className="text-woohl-green font-black">3</Text>
            </View>
            <View className="flex-1">
              <Text className="font-black text-woohl-dark text-base mb-1">You get ₹200</Text>
              <Text className="text-zinc-500 text-sm">Once their order is successfully delivered.</Text>
            </View>
          </View>
        </View>

      </ScrollView>
      
      <View className="p-5 bg-white border-t border-zinc-100">
        <TouchableOpacity 
          onPress={handleShare}
          className="w-full bg-woohl-orange h-14 rounded-full items-center justify-center shadow-lg shadow-woohl-orange/40"
        >
          <Text className="text-white font-black uppercase tracking-widest text-sm">Invite Friends</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
