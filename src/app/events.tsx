import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Calendar, Video, Users, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function EventsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center z-10 shadow-sm shadow-zinc-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Event Center</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        {/* Upcoming Live Events */}
        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Upcoming Livestreams</Text>
        
        <TouchableOpacity 
          className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 mb-8 border border-zinc-100 overflow-hidden"
          onPress={() => router.push('/live/l1')}
        >
          <View className="w-full aspect-[2/1] bg-zinc-100 relative">
            <Image source={{ uri: 'https://images.unsplash.com/photo-1515347619152-475a898b92b6?w=800' }} className="w-full h-full opacity-90" resizeMode="cover" />
            <View className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl flex-row items-center border border-white/20">
              <Calendar color="white" size={14} className="mr-2" />
              <Text className="text-white font-black text-xs uppercase tracking-widest">Today, 8:00 PM</Text>
            </View>
          </View>
          <View className="p-5 flex-row items-center justify-between">
            <View className="flex-1 mr-4">
              <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1.5">Urban Earth</Text>
              <Text className="text-woohl-dark font-black text-base leading-tight mb-2">Sustainable Fashion Drop & Founder AMA</Text>
              <View className="flex-row items-center">
                <Users color="#9CA3AF" size={14} className="mr-1" />
                <Text className="text-zinc-500 font-bold text-xs">1,204 Interested</Text>
              </View>
            </View>
            <TouchableOpacity className="w-12 h-12 bg-woohl-orange/10 rounded-full items-center justify-center border border-woohl-orange/20">
              <Bell color="#FF5A5F" size={20} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Offline Events */}
        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Local Pop-ups (Bengaluru)</Text>
        {[1, 2].map((item) => (
          <TouchableOpacity key={item} className="bg-white p-4 rounded-3xl shadow-sm shadow-zinc-200/50 mb-4 border border-zinc-100 flex-row items-center">
            <View className="w-20 h-20 rounded-2xl bg-zinc-100 mr-4 overflow-hidden border border-zinc-200">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200' }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View className="flex-1">
              <Text className="text-woohl-dark font-black text-sm mb-1" numberOfLines={2}>Indiranagar Flea Market - Startup Edition</Text>
              <Text className="text-woohl-orange font-bold text-xs mb-2">This Sunday, 10 AM - 9 PM</Text>
              <Text className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">12 Startups Participating</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
