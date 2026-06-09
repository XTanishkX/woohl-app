import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Bell } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const categories = ['Apparel', 'Watches', 'Phones', 'Shoes', 'More'];
  const latestProducts = [
    { id: '1', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
    { id: '2', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
    { id: '3', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
  ];

  const keepShopping = [
    { id: '1', title: 'T-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
    { id: '2', title: 'Cases', image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=100' },
    { id: '3', title: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
    { id: '4', title: 'Plates', image: 'https://images.unsplash.com/photo-1610738043695-1f91910d68f7?w=100' },
  ];

  const deals = [
    { 
      id: '1', 
      title: 'Classic Analog Watch for Men', 
      brand: 'emporio', 
      price: '399', 
      rating: 4.5,
      reviews: 120,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' 
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-4 flex-row justify-between items-center border-b border-zinc-100">
        <Text className="text-2xl font-bold text-woohl-dark tracking-tighter">pie</Text>
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Search size={24} color={Colors.dark} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={24} color={Colors.dark} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="py-4 pl-5"
        >
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              className={`mr-3 px-5 py-2 rounded-full border ${index === 0 ? 'bg-woohl-dark border-woohl-dark' : 'bg-white border-zinc-200'}`}
            >
              <Text className={`font-medium ${index === 0 ? 'text-white' : 'text-zinc-600'}`}>{cat}</Text>
            </TouchableOpacity>
          ))}
          <View className="w-5" />
        </ScrollView>

        {/* Hero Banner */}
        <TouchableOpacity className="mx-5 mb-8 rounded-2xl overflow-hidden bg-woohl-dark h-48 relative">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800' }}
            className="absolute inset-0 w-full h-full opacity-60"
          />
          <View className="absolute inset-0 bg-gradient-to-r from-woohl-dark/80 to-transparent" />
          <View className="p-6 justify-center flex-1">
            <Text className="text-white text-3xl font-bold w-2/3 mb-4 leading-tight">Get 30% Off On The Best Laptops</Text>
            <View className="bg-white/20 self-start px-4 py-2 rounded-full backdrop-blur-md">
              <Text className="text-white font-bold text-xs uppercase tracking-wider">Shop Now</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Latest Products */}
        <View className="mb-8">
          <View className="px-5 flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-woohl-dark">Latest Products</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5">
            {latestProducts.map((prod) => (
              <TouchableOpacity key={prod.id} className="mr-4 w-32 h-40 rounded-2xl overflow-hidden bg-zinc-100">
                <Image source={{ uri: prod.image }} className="w-full h-full" resizeMode="cover" />
              </TouchableOpacity>
            ))}
            <View className="w-5" />
          </ScrollView>
        </View>

        {/* Keep shopping for */}
        <View className="mb-8">
          <View className="px-5 flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-woohl-dark">Keep shopping for</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5">
            {keepShopping.map((item) => (
              <TouchableOpacity key={item.id} className="mr-6 items-center">
                <View className="w-20 h-20 rounded-full bg-zinc-100 mb-2 overflow-hidden border border-zinc-200">
                  <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                </View>
                <Text className="text-zinc-600 font-medium text-sm">{item.title}</Text>
              </TouchableOpacity>
            ))}
            <View className="w-5" />
          </ScrollView>
        </View>

        {/* Deals for you */}
        <View className="px-5 mb-10">
          <Text className="text-lg font-bold text-woohl-dark mb-4">Deals for you</Text>
          {deals.map((deal) => (
            <TouchableOpacity 
              key={deal.id} 
              onPress={() => router.push(`/product/${deal.id}`)}
              className="flex-row bg-white border border-zinc-100 rounded-2xl p-3 shadow-sm shadow-zinc-200 mb-4"
            >
              <View className="w-28 h-28 bg-zinc-100 rounded-xl overflow-hidden mr-4">
                <Image source={{ uri: deal.image }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">{deal.brand}</Text>
                <Text className="text-woohl-dark font-bold text-base leading-tight mb-2" numberOfLines={2}>{deal.title}</Text>
                <Text className="text-woohl-orange font-bold text-lg">₹{deal.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
