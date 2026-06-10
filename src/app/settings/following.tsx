import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { mockBrands } from '../../lib/mock-db/data';

export default function FollowingScreen() {
  const router = useRouter();
  const { followingBrands, toggleFollowBrand } = useAppStore();
  
  const following = mockBrands.filter(b => followingBrands.includes(b.id));

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Following Brands</Text>
      </View>

      <ScrollView className="flex-1 p-5">
        {following.length > 0 ? (
          following.map(brand => (
            <TouchableOpacity 
              key={brand.id}
              onPress={() => router.push(`/brand/${brand.id}`)}
              className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 mb-4 flex-row items-center"
            >
              <Image source={{ uri: brand.logo }} className="w-14 h-14 rounded-full mr-4 bg-zinc-100" />
              <View className="flex-1">
                <Text className="text-woohl-dark font-black text-base">{brand.name}</Text>
                <Text className="text-zinc-500 text-xs">{brand.followersCount} Followers</Text>
              </View>
              <TouchableOpacity 
                onPress={() => toggleFollowBrand(brand.id)}
                className="bg-zinc-100 px-4 py-2 rounded-full border border-zinc-200"
              >
                <Text className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">Following</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View className="items-center justify-center mt-32 px-10">
            <Users color="#9CA3AF" size={48} className="mb-4" />
            <Text className="text-woohl-dark font-black text-lg mb-2">Not following anyone</Text>
            <Text className="text-zinc-500 text-center">Discover new startups and brands on the explore page.</Text>
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/explore')}
              className="mt-8 bg-woohl-dark px-8 py-4 rounded-full"
            >
              <Text className="text-white font-black uppercase tracking-widest text-xs">Explore Brands</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
