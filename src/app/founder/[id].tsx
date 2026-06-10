import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Play, Award, CheckCircle } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function FounderStoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Founder Hero Video */}
        <View className="w-full h-[60vh] relative bg-zinc-900">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800' }} className="w-full h-full opacity-60" resizeMode="cover" />
          <View className="absolute inset-0 justify-center items-center">
            <TouchableOpacity className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/50 pl-1">
              <Play color="white" size={28} fill="white" />
            </TouchableOpacity>
          </View>
          
          <SafeAreaView className="absolute top-0 w-full px-5 py-4 z-10 flex-row justify-between">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full items-center justify-center border border-white/20">
              <ArrowLeft color="white" size={20} />
            </TouchableOpacity>
            <View className="bg-woohl-orange px-3 py-1.5 rounded-full border border-white/20">
              <Text className="text-white font-black text-[10px] uppercase tracking-widest">Founder Pitch</Text>
            </View>
          </SafeAreaView>

          <View className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <Text className="text-white font-black text-4xl mb-2 tracking-tight">Riya Singh</Text>
            <Text className="text-white/80 font-medium text-base mb-4">Founder, Urban Earth</Text>
            <Text className="text-white font-bold text-sm leading-relaxed w-5/6">
              "We started in a 10x10 garage in Jaipur with a simple mission: Decarbonize Indian fashion."
            </Text>
          </View>
        </View>

        {/* Mission Statement */}
        <View className="p-6 bg-white -mt-4 rounded-t-[2rem] shadow-xl shadow-black/10">
          <View className="flex-row items-center mb-4">
            <Award color="#FF5A5F" size={24} className="mr-2" />
            <Text className="text-xl font-black text-woohl-dark">The Mission</Text>
          </View>
          <Text className="text-zinc-600 font-medium leading-relaxed mb-6">
            Every year, the fast fashion industry dumps millions of tons of waste into Indian landfills. Urban Earth was created to disrupt this cycle by partnering directly with rural artisans, ensuring fair wages, and using 100% biodegradable materials.
          </Text>

          {/* Timeline */}
          <Text className="text-xl font-black text-woohl-dark mb-6 mt-4">Growth Timeline</Text>
          <View className="ml-2 border-l-2 border-zinc-100 pl-6 pb-4">
            <View className="relative mb-8">
              <View className="absolute -left-[31px] w-4 h-4 bg-woohl-orange rounded-full border-4 border-white" />
              <Text className="text-woohl-orange font-black text-[10px] uppercase tracking-widest mb-1">Jan 2023</Text>
              <Text className="text-woohl-dark font-black text-base mb-1">The Garage Days</Text>
              <Text className="text-zinc-500 text-xs">Started experimenting with hemp fabrics.</Text>
            </View>
            <View className="relative mb-8">
              <View className="absolute -left-[31px] w-4 h-4 bg-woohl-green rounded-full border-4 border-white" />
              <Text className="text-woohl-green font-black text-[10px] uppercase tracking-widest mb-1">Sep 2023</Text>
              <Text className="text-woohl-dark font-black text-base mb-1">First 1,000 Customers</Text>
              <Text className="text-zinc-500 text-xs">Hit our first major milestone purely through community word-of-mouth.</Text>
            </View>
            <View className="relative">
              <View className="absolute -left-[31px] w-4 h-4 bg-[#3B82F6] rounded-full border-4 border-white" />
              <Text className="text-[#3B82F6] font-black text-[10px] uppercase tracking-widest mb-1">Today</Text>
              <Text className="text-woohl-dark font-black text-base mb-1">50+ Artisan Families Supported</Text>
              <Text className="text-zinc-500 text-xs">Scaling across India with the Woohl community.</Text>
            </View>
          </View>
        </View>

        {/* Manufacturing Insights */}
        <View className="px-5 py-8">
          <Text className="text-xl font-black text-woohl-dark mb-4">Behind The Scenes</Text>
          <View className="flex-row justify-between mb-4">
            <View className="w-[48%] aspect-[4/5] bg-zinc-200 rounded-3xl overflow-hidden">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400' }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View className="w-[48%] aspect-[4/5] bg-zinc-200 rounded-3xl overflow-hidden">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400' }} className="w-full h-full" resizeMode="cover" />
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Sticky Support CTA */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-zinc-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <TouchableOpacity 
          className="w-full h-14 bg-woohl-dark rounded-2xl items-center justify-center shadow-lg shadow-black/20"
          onPress={() => router.push(`/creator/${id}`)}
        >
          <Text className="text-white font-black text-sm uppercase tracking-widest">Shop Urban Earth</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
