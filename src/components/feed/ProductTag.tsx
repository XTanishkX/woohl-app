import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';

export interface ProductTagProps {
  id: number | string;
  title: string;
  price: string;
  imageUrl: string;
  brand: string;
  onPress?: () => void;
}

export function ProductTag({ title, price, imageUrl, brand, onPress }: ProductTagProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-white/90 backdrop-blur-xl rounded-2xl p-2 flex-row items-center border border-white/20 shadow-lg shadow-black/10 max-w-[280px]"
    >
      <View className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 mr-3">
        <Image 
          source={{ uri: imageUrl }} 
          className="w-full h-full" 
          resizeMode="cover" 
        />
      </View>
      <View className="flex-1 mr-2">
        <Text className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5" numberOfLines={1}>{brand}</Text>
        <Text className="text-sm font-semibold text-zinc-900 leading-tight" numberOfLines={1}>{title}</Text>
        <Text className="text-xs font-bold text-woohl-orange mt-0.5">{price}</Text>
      </View>
      <View className="w-8 h-8 rounded-full bg-zinc-100 items-center justify-center">
        <ShoppingBag size={14} color="#0A1628" />
      </View>
    </TouchableOpacity>
  );
}
