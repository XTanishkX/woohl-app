import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { ArrowLeft, Search as SearchIcon, Mic, Camera, TrendingUp, Store } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { mockProducts, mockBrands } from '../lib/mock-db/data';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const suggestions = debouncedQuery.length > 0 ? [
    ...mockProducts.filter(p => p.name.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(0, 5).map(p => ({ type: 'product', item: p })),
    ...mockBrands.filter(b => b.name.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(0, 3).map(b => ({ type: 'brand', item: b }))
  ] : [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 flex-row items-center z-10 border-b border-zinc-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center bg-zinc-50 border border-zinc-200 rounded-2xl px-4 h-12">
          <SearchIcon color="#9CA3AF" size={18} className="mr-3" />
          <TextInput 
            className="flex-1 text-woohl-dark font-medium text-sm h-full"
            placeholder="Search products, brands, or reels..."
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          <View className="flex-row items-center gap-4 ml-3">
            <TouchableOpacity>
              <Mic color="#FF5A5F" size={18} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Camera color="#111827" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        {debouncedQuery.length > 0 ? (
          <View>
            <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Suggestions</Text>
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  className="flex-row items-center py-4 border-b border-zinc-100"
                  onPress={() => {
                    if (suggestion.type === 'product') {
                      router.push(`/product/${suggestion.item.id}`);
                    } else {
                      router.push(`/brand/${suggestion.item.id}`);
                    }
                  }}
                >
                  {suggestion.type === 'product' ? (
                    <Image source={{ uri: suggestion.item.images[0] }} className="w-12 h-12 rounded-xl mr-4 bg-zinc-100" />
                  ) : (
                    <View className="w-12 h-12 rounded-full bg-zinc-100 items-center justify-center mr-4">
                       <Store color="#FF6A00" size={20} />
                    </View>
                  )}
                  <View className="flex-1">
                    <Text className="text-woohl-dark font-black text-sm">{suggestion.item.name}</Text>
                    <Text className="text-zinc-500 font-medium text-xs">{suggestion.type === 'product' ? 'Product' : 'Brand'}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="items-center justify-center py-10">
                <Text className="text-zinc-400 font-bold">No results found for "{debouncedQuery}"</Text>
              </View>
            )}
          </View>
        ) : (
          <View>
            {/* Trending Searches */}
        <View className="mb-8">
          <View className="flex-row items-center gap-2 mb-4">
            <TrendingUp color="#FF5A5F" size={20} />
            <Text className="text-sm font-black text-woohl-dark uppercase tracking-widest">Trending Now</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {['Linen Shirts', 'Handcrafted Decor', 'Sustainable Activewear', 'Women-led Brands', 'Local Spices'].map((tag, idx) => (
              <TouchableOpacity key={idx} className="bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-200 shadow-sm shadow-zinc-100">
                <Text className="text-woohl-dark font-bold text-xs">{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Suggestions */}
        <View className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-3xl border border-indigo-100 mb-8">
          <Text className="text-indigo-900 font-black text-lg mb-2 tracking-tight">AI Shopping Assistant</Text>
          <Text className="text-indigo-700 font-medium text-xs mb-4 w-5/6">Try saying: "Find me sustainable fashion near me for under ₹2,000"</Text>
          <TouchableOpacity className="bg-indigo-600 self-start px-5 py-3 rounded-xl flex-row items-center shadow-lg shadow-indigo-600/30">
            <Mic color="white" size={16} className="mr-2" />
            <Text className="text-white font-black text-xs uppercase tracking-widest">Start Voice Search</Text>
          </TouchableOpacity>
        </View>

            {/* Recent Searches */}
            <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2 mt-4">Recent Searches</Text>
            {['Bamboo Toothbrush', 'Urban Earth', 'Eco friendly shoes'].map((item, idx) => (
              <TouchableOpacity key={idx} className="flex-row items-center justify-between py-4 border-b border-zinc-100" onPress={() => setQuery(item)}>
                <View className="flex-row items-center">
                  <SearchIcon color="#9CA3AF" size={16} className="mr-4" />
                  <Text className="text-woohl-dark font-medium text-sm">{item}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
