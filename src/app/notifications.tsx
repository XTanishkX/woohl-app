import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Package, Video, Tag, CheckCircle2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row justify-between items-center z-10 shadow-sm shadow-zinc-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
            <ArrowLeft color="#111827" size={20} />
          </TouchableOpacity>
          <Text className="text-xl font-black text-woohl-dark tracking-tight">Notifications</Text>
        </View>
        <TouchableOpacity>
          <CheckCircle2 color="#FF5A5F" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Today</Text>
        
        <TouchableOpacity className="flex-row p-4 bg-white rounded-3xl mb-3 shadow-sm shadow-zinc-200/50 border border-zinc-100 items-start">
          <View className="w-12 h-12 bg-green-50 rounded-full items-center justify-center mr-4">
            <Package color="#10B981" size={20} />
          </View>
          <View className="flex-1">
            <Text className="text-woohl-dark font-black text-sm mb-1">Out for Delivery</Text>
            <Text className="text-zinc-500 font-medium text-xs mb-2 leading-relaxed">Your order for "Urban Earth Linen" is arriving today by 4 PM.</Text>
            <Text className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">2 hours ago</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row p-4 bg-white rounded-3xl mb-8 shadow-sm shadow-zinc-200/50 border border-zinc-100 items-start">
          <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center mr-4">
            <Video color="#EF4444" size={20} />
          </View>
          <View className="flex-1">
            <Text className="text-woohl-dark font-black text-sm mb-1">Urban Earth is LIVE! 🔴</Text>
            <Text className="text-zinc-500 font-medium text-xs mb-2 leading-relaxed">Join the Founder AMA and get exclusive flash sale discounts.</Text>
            <Text className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">5 hours ago</Text>
          </View>
        </TouchableOpacity>

        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Yesterday</Text>

        <TouchableOpacity className="flex-row p-4 bg-zinc-50 rounded-3xl mb-3 border border-zinc-100 items-start opacity-70">
          <View className="w-12 h-12 bg-orange-50 rounded-full items-center justify-center mr-4">
            <Tag color="#F97316" size={20} />
          </View>
          <View className="flex-1">
            <Text className="text-woohl-dark font-black text-sm mb-1">Price Drop Alert</Text>
            <Text className="text-zinc-500 font-medium text-xs mb-2 leading-relaxed">An item in your wishlist "Classic Analog Watch" just went on sale!</Text>
            <Text className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">1 day ago</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
