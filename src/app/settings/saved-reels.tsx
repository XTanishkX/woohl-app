import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, PlayCircle, Bookmark } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { mockVideoFeed } from '../../lib/mock-db/data';

export default function SavedReelsScreen() {
  const router = useRouter();
  const { savedReels } = useAppStore();
  
  const savedVideos = mockVideoFeed.filter(v => savedReels.includes(v.id));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 border-b border-zinc-100 flex-row items-center pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Saved Reels</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {savedVideos.length > 0 ? (
          <View className="flex-row flex-wrap">
            {savedVideos.map((reel) => (
              <TouchableOpacity 
                key={reel.id} 
                className="w-1/3 aspect-[9/16] p-[1px] relative"
                onPress={() => router.push('/(tabs)/discover')}
              >
                <Image source={{ uri: reel.product.images[0] }} className="w-full h-full bg-zinc-200" />
                <View className="absolute bottom-2 left-2 flex-row items-center">
                  <PlayCircle color="white" size={14} />
                  <Text className="text-white text-[10px] font-bold ml-1 shadow-sm shadow-black">{reel.views}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="items-center justify-center mt-32 px-10">
            <Bookmark color="#9CA3AF" size={48} className="mb-4" />
            <Text className="text-woohl-dark font-black text-lg mb-2">No Saved Reels</Text>
            <Text className="text-zinc-500 text-center">Videos you save will appear here. Go discover some amazing content!</Text>
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/discover')}
              className="mt-8 bg-woohl-dark px-8 py-4 rounded-full"
            >
              <Text className="text-white font-black uppercase tracking-widest text-xs">Explore Reels</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
