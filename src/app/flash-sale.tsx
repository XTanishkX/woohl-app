import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Zap, Clock, ShoppingCart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { mockProducts } from '../lib/mock-db/data';

export default function FlashSaleScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <View className="px-5 py-4 flex-row justify-between items-center z-10 border-b border-white/10">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-white/10 rounded-full items-center justify-center">
            <ArrowLeft color="white" size={20} />
          </TouchableOpacity>
          <Text className="text-xl font-black text-white tracking-tight flex-row items-center">
            Midnight Drop <Zap color="#FF5A5F" size={20} className="ml-2" fill="#FF5A5F" />
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Timer Banner */}
        <View className="bg-woohl-orange rounded-3xl p-6 items-center shadow-2xl shadow-woohl-orange/40 mb-8 border border-white/20">
          <Text className="text-white font-black text-xs uppercase tracking-widest mb-2">Sale Ends In</Text>
          <View className="flex-row gap-4 items-center">
            <View className="bg-black/20 px-4 py-3 rounded-2xl border border-white/20">
              <Text className="text-white font-black text-3xl">02</Text>
              <Text className="text-white/80 font-bold text-[10px] text-center mt-1 uppercase tracking-widest">Hours</Text>
            </View>
            <Text className="text-white font-black text-2xl">:</Text>
            <View className="bg-black/20 px-4 py-3 rounded-2xl border border-white/20">
              <Text className="text-white font-black text-3xl">45</Text>
              <Text className="text-white/80 font-bold text-[10px] text-center mt-1 uppercase tracking-widest">Mins</Text>
            </View>
            <Text className="text-white font-black text-2xl">:</Text>
            <View className="bg-black/20 px-4 py-3 rounded-2xl border border-white/20">
              <Text className="text-white font-black text-3xl animate-pulse">12</Text>
              <Text className="text-white/80 font-bold text-[10px] text-center mt-1 uppercase tracking-widest">Secs</Text>
            </View>
          </View>
        </View>

        {/* Product Grid */}
        <View className="flex-row flex-wrap justify-between">
          {mockProducts.slice(0, 4).map((product, idx) => (
            <TouchableOpacity 
              key={idx} 
              className="w-[48%] mb-8 bg-zinc-800 rounded-3xl overflow-hidden border border-white/10"
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <View className="w-full aspect-[4/5] bg-zinc-700 relative rounded-t-3xl overflow-hidden">
                <Image source={{ uri: product.images[0] }} className="w-full h-full opacity-90" resizeMode="cover" />
                <View className="absolute top-3 left-3 bg-woohl-red px-3 py-1.5 rounded-xl">
                  <Text className="text-white text-[10px] font-black tracking-widest uppercase">70% OFF</Text>
                </View>
                <View className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20">
                  <View className="h-1.5 bg-zinc-700 w-full rounded-full overflow-hidden mb-1">
                    <View className="h-full bg-woohl-red w-[85%]" />
                  </View>
                  <Text className="text-white/80 text-[10px] font-black uppercase tracking-widest">85% Claimed</Text>
                </View>
              </View>
              <View className="p-4 bg-zinc-800">
                <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1.5">{product.brandName}</Text>
                <Text className="text-white font-bold text-sm leading-tight mb-2" numberOfLines={1}>{product.name}</Text>
                <View className="flex-row items-center mb-4">
                  <Text className="text-white font-black text-xl mr-2">₹{Math.floor(product.price * 0.3)}</Text>
                  <Text className="text-zinc-500 font-bold text-xs line-through">₹{product.price}</Text>
                </View>
                <TouchableOpacity className="bg-white py-3 rounded-xl items-center flex-row justify-center">
                  <ShoppingCart color="#111827" size={14} className="mr-2" />
                  <Text className="text-woohl-dark font-black text-[10px] uppercase tracking-widest">Grab Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
