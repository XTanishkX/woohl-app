import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Flame } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import { Colors } from '../../constants/Colors';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTags = ['Summer Fits', 'Sustainable', 'Tech Accessories', 'Minimalist', 'Home Decor'];
  
  const trendingProducts = [
    { id: 1, title: 'Oversized Linen Shirt', price: '₹1,299', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=300', brand: 'Minimalist' },
    { id: 2, title: 'Ceramic Matcha Bowl', price: '₹899', image: 'https://images.unsplash.com/photo-1610738043695-1f91910d68f7?q=80&w=300', brand: 'Earthly' },
    { id: 3, title: 'Wireless Charging Pad', price: '₹2,499', image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=300', brand: 'TechNova' },
    { id: 4, title: 'Vegan Leather Tote', price: '₹3,599', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=300', brand: 'Aura' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-woohl-offwhite">
      <View className="px-6 py-4 bg-white/80 backdrop-blur-md z-10 border-b border-zinc-100">
        <Text className="text-3xl font-bold text-woohl-dark mb-4 tracking-tight">Discover</Text>
        
        <Input 
          placeholder="Search products, brands, creators..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search color={Colors.zinc[400]} size={20} />}
        />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Trending Searches */}
        <View className="mt-6 px-6">
          <View className="flex-row items-center gap-2 mb-4">
            <Flame color={Colors.primary} size={20} />
            <Text className="text-lg font-bold text-woohl-dark">Trending Now</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <TouchableOpacity key={index} className="bg-zinc-100 px-4 py-2 rounded-full border border-zinc-200">
                <Text className="text-zinc-700 font-medium">{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Grid */}
        <View className="mt-10 px-6 pb-12">
          <Text className="text-xl font-bold text-woohl-dark mb-5">Recommended For You</Text>
          <View className="flex-row flex-wrap justify-between">
            {trendingProducts.map((product) => (
              <TouchableOpacity key={product.id} className="w-[48%] mb-6">
                <View className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 mb-3 border border-zinc-200 relative">
                  <Image source={{ uri: product.image }} className="w-full h-full" resizeMode="cover" />
                  <View className="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-md">
                    <Text className="text-xs font-bold text-woohl-dark">{product.price}</Text>
                  </View>
                </View>
                <Text className="text-zinc-500 text-xs font-medium mb-1">{product.brand}</Text>
                <Text className="text-woohl-dark font-semibold text-sm" numberOfLines={1}>{product.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
