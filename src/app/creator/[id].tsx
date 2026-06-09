import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Search, Bell, Star } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

export default function CreatorProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Product');

  const store = {
    name: 'Thor',
    rating: 4.5,
    followers: '12K',
    bio: "Welcome to Thor's Thunderous Emporium!",
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
  };

  const products = [
    { id: '1', title: 'Hammer - MGB372A3', code: 'Or 01009832', price: 400, rating: 5, reviews: 140, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
    { id: '2', title: 'Hammer - MGB372A3', code: 'Or 01009832', price: 200, rating: 5, reviews: 140, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
  ];

  const posts = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
    'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=200',
    'https://images.unsplash.com/photo-1610738043695-1f91910d68f7?w=200'
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-3 flex-row justify-between items-center border-b border-zinc-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft color="#18181b" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-woohl-dark tracking-tighter">pie</Text>
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Search color="#18181b" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell color="#18181b" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View className="px-5 py-6">
          <View className="flex-row items-center mb-4">
            <View className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-zinc-100">
              <Image source={{ uri: store.imageUrl }} className="w-full h-full" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-1">
                <Text className="text-xl font-bold text-woohl-dark">{store.name}</Text>
                <View className="flex-row items-center">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} size={12} color="#EF4444" fill={star <= Math.floor(store.rating) ? "#EF4444" : "transparent"} />
                  ))}
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                <Star size={12} color="#9CA3AF" />
                <Text className="text-zinc-500 text-xs font-medium">{store.rating} ({store.followers} followers)</Text>
              </View>
            </View>
          </View>
          <Text className="text-zinc-600 text-sm mb-5">{store.bio}</Text>
          <Button label="Follow" variant="primary" className="w-full bg-woohl-orange/10 border border-transparent shadow-none" />
        </View>

        {/* Tabs */}
        <View className="px-5 flex-row gap-4 mb-6">
          {['Product', 'POSTS', 'REELS'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full border ${activeTab === tab ? 'bg-woohl-dark border-woohl-dark' : 'bg-transparent border-transparent'}`}
            >
              <Text className={`font-bold text-xs ${activeTab === tab ? 'text-white' : 'text-zinc-500'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'Product' ? (
          <View className="px-5 pb-10">
            {products.map((prod) => (
              <View key={prod.id} className="flex-row bg-white border border-zinc-100 shadow-sm shadow-zinc-200 rounded-2xl p-3 mb-4">
                <View className="w-24 h-24 bg-zinc-100 rounded-xl overflow-hidden mr-4">
                  <Image source={{ uri: prod.image }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View className="flex-1 justify-between">
                  <View>
                    <Text className="text-woohl-dark font-bold text-sm">{prod.title}</Text>
                    <Text className="text-zinc-400 text-[10px] mb-1">{prod.code}</Text>
                    <View className="flex-row items-center mb-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} size={10} color="#EF4444" fill={star <= prod.rating ? "#EF4444" : "transparent"} />
                      ))}
                    </View>
                    <Text className="text-woohl-dark font-bold text-base mb-1">₹{prod.price}</Text>
                  </View>
                  <Button 
                    label="Add to cart" 
                    variant="primary" 
                    size="sm" 
                    className="py-2 bg-woohl-orange/10 border border-transparent shadow-none"
                  />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="px-5 flex-row flex-wrap justify-between pb-10 gap-y-4">
            {posts.map((img, idx) => (
              <View key={idx} className="w-[31%] aspect-square bg-zinc-100 rounded-lg overflow-hidden">
                <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
