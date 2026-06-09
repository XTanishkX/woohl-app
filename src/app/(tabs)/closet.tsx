import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Shirt, Sparkles, Plus } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';

export default function ClosetScreen() {
  const { ownedItems } = useAppStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-4 border-b border-zinc-100 z-10 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-woohl-dark tracking-tight">My Digital Closet</Text>
        <TouchableOpacity className="bg-woohl-orange/10 p-2 rounded-full">
          <Plus color="#F34F17" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* AI Analysis Banner */}
        <View className="m-5 bg-woohl-dark p-5 rounded-2xl flex-row items-center justify-between shadow-lg shadow-woohl-dark/30">
          <View className="flex-1 mr-4">
            <View className="flex-row items-center mb-2">
              <Sparkles color="#10B981" size={16} className="mr-2" />
              <Text className="text-white font-bold text-sm">AI Style Intel</Text>
            </View>
            <Text className="text-white/80 text-xs leading-relaxed">
              Based on your closet, you lean towards <Text className="font-bold text-white">Minimalist Earth Tones</Text>. We've curated the Explore feed to match your vibe!
            </Text>
          </View>
          <View className="w-16 h-16 bg-white/10 rounded-full items-center justify-center border border-white/20">
            <Shirt color="white" size={28} />
          </View>
        </View>

        {/* Owned Items Grid */}
        <View className="px-5 pb-20">
          <Text className="text-lg font-bold text-woohl-dark mb-4">Your Wardrobe ({ownedItems.length || 0})</Text>
          
          {ownedItems.length === 0 ? (
            <View className="items-center justify-center py-12 bg-zinc-50 rounded-2xl border border-zinc-200 border-dashed">
              <View className="w-16 h-16 bg-white rounded-full items-center justify-center mb-4 shadow-sm">
                <Shirt color="#9CA3AF" size={24} />
              </View>
              <Text className="text-woohl-dark font-bold text-base mb-1">Your closet is empty</Text>
              <Text className="text-zinc-500 text-xs text-center px-8">
                Buy items on Woohl to automatically digitize your wardrobe and unlock AI outfit matching!
              </Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {ownedItems.map((item, index) => (
                <View key={index} className="w-[48%] mb-4 bg-zinc-50 rounded-xl overflow-hidden border border-zinc-200">
                  <Image source={{ uri: item.images[0] }} className="w-full aspect-[4/5]" resizeMode="cover" />
                  <View className="p-3">
                    <Text className="text-woohl-dark font-bold text-xs" numberOfLines={1}>{item.name}</Text>
                    <Text className="text-zinc-500 text-[10px] mt-1">{item.brandName}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
