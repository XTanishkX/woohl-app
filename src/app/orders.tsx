import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Package, MapPin, Search, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row justify-between items-center z-10 shadow-sm shadow-zinc-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
            <ArrowLeft color="#111827" size={20} />
          </TouchableOpacity>
          <Text className="text-xl font-black text-woohl-dark tracking-tight">My Orders</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <Search color="#111827" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        {/* Active Order / Live Tracking */}
        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Active Orders</Text>
        <View className="bg-white p-5 rounded-3xl shadow-xl shadow-zinc-200/50 mb-8 border border-zinc-100">
          <View className="flex-row justify-between items-center mb-4">
            <View className="bg-woohl-green/10 px-3 py-1.5 rounded-lg border border-woohl-green/20 flex-row items-center">
              <View className="w-2 h-2 bg-woohl-green rounded-full mr-2 animate-pulse" />
              <Text className="text-woohl-green font-black text-[10px] uppercase tracking-widest">Out For Delivery</Text>
            </View>
            <Text className="text-zinc-400 font-bold text-xs">Arriving Today, 4 PM</Text>
          </View>

          <View className="flex-row mb-5">
            <View className="w-20 h-24 rounded-2xl bg-zinc-100 mr-4 overflow-hidden">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=200' }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-woohl-dark font-black text-base leading-tight mb-1">Handcrafted Hemp Linen Shirt</Text>
              <Text className="text-zinc-500 font-bold text-xs mb-2">Urban Earth • Qty: 1</Text>
              <Text className="text-woohl-dark font-black text-lg">₹1,899</Text>
            </View>
          </View>

          <View className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 mb-5">
            <View className="flex-row items-center mb-2">
              <MapPin color="#FF5A5F" size={16} className="mr-2" />
              <Text className="font-bold text-woohl-dark text-sm">Track Package via Digipin</Text>
            </View>
            <View className="h-1 bg-zinc-200 w-full rounded-full overflow-hidden mb-2">
              <View className="h-full bg-woohl-green w-[80%]" />
            </View>
            <Text className="text-zinc-500 text-xs font-medium">Delivery partner is 1.2 km away.</Text>
          </View>

          <TouchableOpacity className="w-full bg-woohl-dark py-3 rounded-xl items-center flex-row justify-center">
            <Package color="white" size={16} className="mr-2" />
            <Text className="text-white font-black text-xs uppercase tracking-widest">Track Order</Text>
          </TouchableOpacity>
        </View>

        {/* Past Orders */}
        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Past Orders</Text>
        {[1, 2, 3].map((item) => (
          <TouchableOpacity key={item} className="bg-white p-4 rounded-3xl shadow-sm shadow-zinc-200/50 mb-4 border border-zinc-100 flex-row items-center">
            <View className="w-16 h-16 rounded-2xl bg-zinc-100 mr-4 overflow-hidden">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View className="flex-1">
              <Text className="text-woohl-dark font-bold text-sm mb-1" numberOfLines={1}>Classic Analog Watch</Text>
              <Text className="text-zinc-500 text-xs mb-1">Delivered on 12 May</Text>
              <View className="flex-row items-center">
                <Text className="text-woohl-dark font-black text-sm mr-2">₹399</Text>
                <Text className="text-woohl-orange text-[10px] font-bold uppercase tracking-widest">Write Review</Text>
              </View>
            </View>
            <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
