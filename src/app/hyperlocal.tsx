import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, MapPin, Navigation2, Store, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HyperlocalScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Fake Map Background */}
      <View className="absolute inset-0 bg-[#f0f3f5]">
        <Image source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800' }} className="w-full h-1/2 opacity-60" resizeMode="cover" />
      </View>

      <View className="px-5 py-4 flex-row items-center justify-between z-10">
        <TouchableOpacity onPress={() => router.back()} className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-xl shadow-black/10">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        
        <View className="bg-white px-5 py-3 rounded-full shadow-xl shadow-black/10 flex-row items-center border border-zinc-100 flex-1 mx-4">
          <MapPin color="#FF5A5F" size={16} className="mr-2" />
          <Text className="font-black text-woohl-dark text-xs uppercase tracking-widest">HSR Layout, BLR</Text>
        </View>

        <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-xl shadow-black/10">
          <Search color="#111827" size={20} />
        </TouchableOpacity>
      </View>

      {/* Map Pins (Mock) */}
      <View className="absolute top-[30%] left-[40%]">
        <View className="bg-woohl-orange p-2 rounded-full border-4 border-white shadow-xl shadow-woohl-orange/50">
          <Store color="white" size={20} />
        </View>
      </View>

      <View className="absolute top-[20%] left-[70%]">
        <View className="bg-woohl-dark p-2 rounded-full border-4 border-white shadow-xl">
          <Store color="white" size={16} />
        </View>
      </View>

      {/* Bottom Sheet Overlay */}
      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] pt-8 px-5 pb-12 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <View className="w-16 h-1.5 bg-zinc-200 rounded-full self-center absolute top-3" />
        
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-xl font-black text-woohl-dark tracking-tight">Nearby Startups</Text>
          <View className="bg-woohl-orange/10 px-3 py-1.5 rounded-lg border border-woohl-orange/20">
            <Text className="text-woohl-orange font-black text-[10px] uppercase tracking-widest">Powered by Digipin</Text>
          </View>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal className="-mx-5 px-5 mb-6" contentContainerStyle={{ paddingRight: 40 }}>
          <TouchableOpacity className="mr-4 w-72 bg-zinc-50 rounded-3xl p-4 border border-zinc-200 shadow-sm shadow-zinc-200">
            <View className="flex-row mb-3">
              <View className="w-16 h-16 bg-white rounded-2xl mr-3 overflow-hidden border border-zinc-100">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200' }} className="w-full h-full" />
              </View>
              <View className="flex-1 justify-center">
                <Text className="font-black text-woohl-dark text-base mb-1" numberOfLines={1}>Urban Earth</Text>
                <Text className="text-zinc-500 font-bold text-xs mb-2">Sustainable Fashion</Text>
                <View className="flex-row items-center">
                  <Navigation2 color="#FF5A5F" size={12} className="mr-1" />
                  <Text className="text-woohl-dark font-black text-[10px] uppercase tracking-widest">1.2 km away</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="w-full bg-woohl-dark py-3 rounded-xl items-center shadow-lg shadow-black/10">
              <Text className="text-white font-black text-xs uppercase tracking-widest">Deliver in 45 Mins</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}
