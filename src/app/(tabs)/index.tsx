import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Bell, ShoppingBag, Flame, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { mockProducts } from '../../lib/mock-db/data';

export default function HomeScreen() {
  const router = useRouter();
  
  const categories = [
    { id: 1, name: "Women's Fashion", icon: "👗" },
    { id: 2, name: "Men's Fashion", icon: "👕" },
    { id: 3, name: "Skincare", icon: "✨" },
    { id: 4, name: "Gadgets", icon: "📱" },
    { id: 5, name: "Home Decor", icon: "🪴" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top App Bar */}
      <View className="px-5 py-4 flex-row items-center justify-between border-b border-zinc-100 z-10 bg-white">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-woohl-orange rounded-full items-center justify-center mr-3 shadow-sm shadow-woohl-orange/40">
            <Text className="text-white font-black italic text-lg">W.</Text>
          </View>
          <View>
            <Text className="text-woohl-dark font-black text-xl tracking-tight leading-tight">Woohl</Text>
            <Text className="text-woohl-orange font-bold text-[10px] uppercase tracking-widest leading-tight">Social Commerce</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
            <Search color="#0A1628" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell color="#0A1628" size={24} />
            <View className="absolute -top-1 -right-1 w-3 h-3 bg-woohl-red rounded-full border border-white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories Horizontal Scroll */}
        <View className="py-5">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} className="items-center mr-6">
                <View className="w-16 h-16 bg-white rounded-full items-center justify-center mb-3 shadow-lg shadow-zinc-200 border border-zinc-100">
                  <Text className="text-2xl">{cat.icon}</Text>
                </View>
                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Hero Banner */}
        <View className="px-5 mt-2 mb-8">
          <TouchableOpacity className="w-full aspect-[2/1.1] rounded-[2rem] overflow-hidden relative shadow-2xl shadow-woohl-orange/30">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800' }} 
              className="w-full h-full" 
              resizeMode="cover" 
            />
            <View className="absolute inset-0 bg-gradient-to-r from-woohl-dark/90 via-woohl-dark/60 to-transparent p-6 justify-center">
              <View className="bg-woohl-orange/20 self-start px-3 py-1.5 rounded-lg mb-3 border border-woohl-orange/40 backdrop-blur-md">
                <Text className="text-woohl-orange font-black text-[10px] uppercase tracking-widest">Mega Drop</Text>
              </View>
              <Text className="text-white font-black text-3xl w-[85%] leading-[1.1] mb-3">Get 30% Off On The Best Laptops</Text>
              <Text className="text-white/80 font-semibold text-xs mb-6">Limited time group buy offer!</Text>
              <View className="bg-woohl-orange py-3 px-6 rounded-2xl self-start shadow-xl shadow-woohl-orange/40">
                <Text className="text-white font-black text-xs uppercase tracking-wider">Shop Now</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Call to Action - Reels */}
        <View className="px-5 mb-10">
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/reels')}
            className="w-full bg-woohl-dark rounded-[2rem] p-6 flex-row items-center justify-between shadow-2xl shadow-woohl-dark/40 relative overflow-hidden"
          >
            {/* Background Glow */}
            <View className="absolute top-0 right-0 w-32 h-32 bg-woohl-orange/20 rounded-full blur-3xl" />
            
            <View className="flex-row items-center flex-1">
              <View className="w-14 h-14 bg-white/10 rounded-2xl items-center justify-center mr-4 border border-white/10 backdrop-blur-lg">
                <Sparkles color="#F34F17" size={28} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-black text-xl mb-1 tracking-tight">Watch & Shop</Text>
                <Text className="text-white/60 text-xs font-medium leading-relaxed pr-4">Swipe through our AI-curated video feed and discover products instantly.</Text>
              </View>
            </View>
            <View className="bg-woohl-orange px-4 py-2 rounded-xl shadow-lg shadow-woohl-orange/50">
              <Text className="text-white font-black text-[10px] uppercase tracking-widest">Watch</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recommended Deals (Grid) */}
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <Flame color="#F34F17" size={24} className="mr-2" />
              <Text className="text-2xl font-black text-woohl-dark tracking-tight">Deals For You</Text>
            </View>
            <TouchableOpacity className="bg-zinc-100 px-4 py-2 rounded-full">
              <Text className="text-woohl-dark font-black text-[10px] uppercase tracking-widest">See All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row flex-wrap justify-between">
            {mockProducts.map((product) => (
              <TouchableOpacity 
                key={product.id} 
                className="w-[48%] mb-8 bg-white rounded-3xl shadow-xl shadow-zinc-200/50"
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <View className="w-full aspect-[4/5] bg-zinc-100 relative rounded-t-3xl overflow-hidden">
                  <Image source={{ uri: product.images[0] }} className="w-full h-full" resizeMode="cover" />
                  {/* Glassmorphic Eco Badge */}
                  <View className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white">
                    <Text className="text-woohl-green text-[10px] font-black tracking-widest">{product.sustainabilityScore} ECO</Text>
                  </View>
                </View>
                <View className="p-4 border border-t-0 border-zinc-100 rounded-b-3xl">
                  <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1.5">{product.brandName}</Text>
                  <Text className="text-woohl-dark font-bold text-sm leading-tight mb-3" numberOfLines={2}>{product.name}</Text>
                  <View className="flex-row items-center justify-between mt-auto">
                    <Text className="text-woohl-dark font-black text-lg">₹{product.price}</Text>
                    <View className="w-10 h-10 bg-woohl-orange rounded-full items-center justify-center shadow-lg shadow-woohl-orange/40">
                      <ShoppingBag color="white" size={16} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
