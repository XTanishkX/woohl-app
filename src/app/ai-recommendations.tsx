import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Sparkles, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { mockProducts } from '../lib/mock-db/data';

export default function AIRecommendationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 flex-row items-center justify-between z-10 border-b border-zinc-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center border border-zinc-200">
            <ArrowLeft color="#111827" size={20} />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-black text-woohl-dark tracking-tight flex-row items-center">
              For You <Sparkles color="#6366F1" size={16} className="ml-2" />
            </Text>
            <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Curated by Woohl AI</Text>
          </View>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-zinc-50 rounded-full items-center justify-center border border-zinc-200">
          <Filter color="#111827" size={16} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        {/* Why this was picked */}
        <View className="bg-indigo-50 rounded-3xl p-5 mb-8 border border-indigo-100 shadow-sm">
          <Text className="text-indigo-900 font-bold text-sm leading-relaxed">
            Based on your recent interest in <Text className="font-black">sustainable linen</Text> and your saves from <Text className="font-black">Urban Earth</Text>.
          </Text>
        </View>

        {/* Product Grid */}
        <View className="flex-row flex-wrap justify-between">
          {mockProducts.map((product, idx) => (
            <TouchableOpacity 
              key={idx} 
              className="w-[48%] mb-8 bg-white rounded-3xl shadow-xl shadow-zinc-200/50 overflow-hidden"
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <View className="w-full aspect-[4/5] bg-zinc-100 relative rounded-t-3xl overflow-hidden">
                <Image source={{ uri: product.images[0] }} className="w-full h-full" resizeMode="cover" />
                <View className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex-row items-center border border-white/20">
                  <Sparkles color="#6366F1" size={10} className="mr-1" />
                  <Text className="text-white text-[10px] font-bold">98% Match</Text>
                </View>
              </View>
              <View className="p-4 border border-t-0 border-zinc-100 rounded-b-3xl">
                <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1.5">{product.brandName}</Text>
                <Text className="text-woohl-dark font-bold text-sm leading-tight mb-3" numberOfLines={2}>{product.name}</Text>
                <Text className="text-woohl-dark font-black text-lg">₹{product.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
