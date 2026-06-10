import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { mockProducts } from '../../lib/mock-db/data';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row justify-between items-center z-10 shadow-sm shadow-zinc-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
            <ArrowLeft color="#111827" size={20} />
          </TouchableOpacity>
          <Text className="text-xl font-black text-woohl-dark tracking-tight capitalize">{id || 'Fashion'}</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <Search color="#111827" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Category Hero Banner */}
        <View className="w-full aspect-[2/1] relative bg-zinc-100 mb-6">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800' }} className="w-full h-full opacity-90" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/40 p-6 justify-center">
            <Text className="text-white font-black text-3xl mb-2">Sustainable Fashion</Text>
            <Text className="text-white/80 font-medium text-sm w-3/4">Discover eco-friendly clothing from local Indian startups.</Text>
          </View>
        </View>

        {/* Subcategories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mt-2 px-5" contentContainerStyle={{ paddingRight: 40 }}>
          {['All', 'Shirts', 'Dresses', 'Accessories', 'Shoes', 'Activewear'].map((sub, idx) => (
            <TouchableOpacity key={idx} className={`px-5 py-2.5 rounded-full mr-3 border ${idx === 0 ? 'bg-woohl-dark border-woohl-dark' : 'bg-white border-zinc-200'}`}>
              <Text className={`font-black text-xs uppercase tracking-widest ${idx === 0 ? 'text-white' : 'text-zinc-500'}`}>{sub}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filters */}
        <View className="px-5 flex-row justify-between items-center mb-6">
          <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest">240 Products</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-row items-center bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200">
              <Text className="text-woohl-dark font-bold text-xs mr-2">Sort</Text>
              <ChevronDown color="#111827" size={14} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-200">
              <SlidersHorizontal color="#111827" size={14} className="mr-2" />
              <Text className="text-woohl-dark font-bold text-xs">Filter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Grid */}
        <View className="px-5 flex-row flex-wrap justify-between">
          {mockProducts.map((product, idx) => (
            <TouchableOpacity 
              key={idx} 
              className="w-[48%] mb-8 bg-white rounded-3xl shadow-xl shadow-zinc-200/50 overflow-hidden"
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <View className="w-full aspect-[4/5] bg-zinc-100 relative rounded-t-3xl overflow-hidden">
                <Image source={{ uri: product.images[0] }} className="w-full h-full" resizeMode="cover" />
                <View className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white">
                  <Text className="text-woohl-green text-[10px] font-black tracking-widest">{product.sustainabilityScore} ECO</Text>
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
