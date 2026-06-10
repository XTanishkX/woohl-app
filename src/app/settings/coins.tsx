import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Coins as CoinsIcon, History, Gift } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function CoinsScreen() {
  const router = useRouter();
  const { woohlCoins } = useAppStore();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Woohl Coins</Text>
      </View>

      <ScrollView className="flex-1 p-5">
        <View className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-3xl p-8 items-center mb-6 shadow-xl shadow-[#F59E0B]/40">
          <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mb-4 border border-white/40">
            <CoinsIcon color="white" size={32} />
          </View>
          <Text className="text-white/80 font-bold uppercase tracking-widest text-xs mb-1">Available Balance</Text>
          <Text className="text-white font-black text-5xl mb-2">{woohlCoins}</Text>
          <Text className="text-white/90 text-sm font-medium">1 Woohl Coin = ₹1 on your next purchase</Text>
        </View>

        <Text className="text-woohl-dark font-black text-lg mb-4 ml-2">Recent History</Text>
        <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-5">
          {[
            { id: 1, title: 'Order #ORD_1002 Cashback', date: 'Today, 2:30 PM', amount: '+50' },
            { id: 2, title: 'Referral Bonus', date: 'Yesterday', amount: '+100' },
            { id: 3, title: 'Redeemed on #ORD_1001', date: 'Oct 12, 2023', amount: '-25', isNegative: true },
          ].map(tx => (
            <View key={tx.id} className="flex-row items-center justify-between py-4 border-b border-zinc-100 last:border-0 last:pb-0">
              <View className="flex-row items-center flex-1">
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${tx.isNegative ? 'bg-zinc-100' : 'bg-[#F59E0B]/10'}`}>
                  {tx.isNegative ? <Gift color="#111827" size={16} /> : <CoinsIcon color="#F59E0B" size={16} />}
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-woohl-dark text-sm mb-1">{tx.title}</Text>
                  <Text className="text-zinc-500 text-xs">{tx.date}</Text>
                </View>
              </View>
              <Text className={`font-black text-lg ${tx.isNegative ? 'text-zinc-500' : 'text-[#10B981]'}`}>{tx.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
