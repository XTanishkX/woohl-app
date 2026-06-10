import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Search, Heart, Plus, Share2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function WishlistScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row justify-between items-center z-10 shadow-sm shadow-zinc-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
            <ArrowLeft color="#111827" size={20} />
          </TouchableOpacity>
          <Text className="text-xl font-black text-woohl-dark tracking-tight">Wishlist</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <Search color="#111827" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest ml-2">My Collections</Text>
          <TouchableOpacity className="flex-row items-center bg-woohl-orange/10 px-3 py-1.5 rounded-lg">
            <Plus color="#FF5A5F" size={14} className="mr-1" />
            <Text className="text-woohl-orange font-bold text-[10px] uppercase tracking-widest">New</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between mb-8">
          {[
            { title: 'Summer Fits', items: 12, images: ['https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=200'] },
            { title: 'Tech Gadgets', items: 5, images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200'] }
          ].map((col, idx) => (
            <TouchableOpacity key={idx} className="w-[48%] bg-white rounded-3xl p-3 shadow-xl shadow-zinc-200/50 border border-zinc-100">
              <View className="w-full aspect-square bg-zinc-100 rounded-2xl mb-3 overflow-hidden">
                <Image source={{ uri: col.images[0] }} className="w-full h-full" resizeMode="cover" />
              </View>
              <Text className="text-woohl-dark font-black text-sm mb-1 px-1">{col.title}</Text>
              <Text className="text-zinc-400 font-bold text-xs px-1">{col.items} Items</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest ml-2">All Saved Items</Text>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {[1, 2, 3, 4].map((item) => (
            <View key={item} className="w-[48%] mb-6 bg-white rounded-3xl shadow-xl shadow-zinc-200/50 overflow-hidden">
              <View className="w-full aspect-[4/5] bg-zinc-100 relative border-b border-zinc-100">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=300' }} className="w-full h-full" resizeMode="cover" />
                <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full items-center justify-center shadow-sm">
                  <Heart color="#FF5A5F" size={14} fill="#FF5A5F" />
                </TouchableOpacity>
              </View>
              <View className="p-3">
                <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Urban Earth</Text>
                <Text className="text-woohl-dark font-bold text-sm mb-2" numberOfLines={1}>Classy White Linen</Text>
                <Text className="text-woohl-dark font-black text-lg mb-2">₹1,299</Text>
                <TouchableOpacity className="bg-woohl-dark py-2 rounded-xl items-center">
                  <Text className="text-white font-black text-[10px] uppercase tracking-widest">Move to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
