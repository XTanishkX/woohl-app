import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Leaf, Droplets, Wind, ShieldCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const AnimatedCard = ({ children, className }: any) => {
  const scale = useSharedValue(1);
  const rotateX = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateX: `${rotateX.value}deg` }
    ]
  }));

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPressIn={() => {
        scale.value = withTiming(0.95, { duration: 150 });
        rotateX.value = withTiming(2, { duration: 150 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 150 });
        rotateX.value = withTiming(0, { duration: 150 });
      }}
    >
      <Animated.View className={className} style={style}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function SustainabilityScreen() {
  const router = useRouter();

  const player = useVideoPlayer('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center z-10 shadow-sm shadow-zinc-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Eco Hub</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        {/* Total Impact */}
        <AnimatedCard className="rounded-3xl p-6 shadow-2xl shadow-[#10B981]/40 mb-8 border border-white/20 relative overflow-hidden h-72">
          {/* Background Video */}
          <View className="absolute inset-0 bg-[#10B981]">
            <VideoView
              style={{ width: '100%', height: '100%', opacity: 0.6 }}
              player={player}
              contentFit="cover"
              nativeControls={false}
            />
            <View className="absolute inset-0 bg-black/20" />
          </View>

          <View className="relative z-10">
            <Text className="text-white font-black text-sm uppercase tracking-widest mb-4">Your Total Impact</Text>
            <View className="flex-row items-end mb-2">
              <Text className="text-white font-black text-6xl tracking-tight">24.5</Text>
              <Text className="text-white/80 font-black text-xl mb-1.5 ml-2 uppercase tracking-widest">KG CO2</Text>
            </View>
            <Text className="text-white font-medium text-sm leading-relaxed mb-6">Saved by choosing sustainable startups over fast fashion.</Text>
            
            <View className="flex-row gap-3">
              <View className="bg-white/20 p-3 rounded-2xl flex-1 border border-white/30 items-center">
                <Droplets color="white" size={20} className="mb-2" />
                <Text className="text-white font-black text-lg">1,200L</Text>
                <Text className="text-white/80 text-[10px] font-bold uppercase tracking-widest text-center">Water Saved</Text>
              </View>
              <View className="bg-white/20 p-3 rounded-2xl flex-1 border border-white/30 items-center">
                <Wind color="white" size={20} className="mb-2" />
                <Text className="text-white font-black text-lg">5.2%</Text>
                <Text className="text-white/80 text-[10px] font-bold uppercase tracking-widest text-center">Less Plastics</Text>
              </View>
            </View>
          </View>
        </AnimatedCard>

        {/* Certifications */}
        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Verified Eco-Startups</Text>
        {[1, 2].map((item) => (
          <AnimatedCard key={item} className="bg-white p-4 rounded-3xl shadow-sm shadow-zinc-200/50 mb-4 border border-zinc-100 flex-row items-center">
            <View className="w-16 h-16 rounded-2xl bg-zinc-100 mr-4 overflow-hidden border border-zinc-200">
              <Image source={{ uri: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200' }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="text-woohl-dark font-black text-sm mr-2" numberOfLines={1}>Urban Earth</Text>
                <ShieldCheck color="#10B981" size={14} />
              </View>
              <Text className="text-zinc-500 font-bold text-xs mb-2">100% Biodegradable Materials</Text>
              <View className="bg-woohl-green/10 self-start px-2 py-1 rounded-md">
                <Text className="text-woohl-green text-[10px] font-black uppercase tracking-widest">Eco Score: 98</Text>
              </View>
            </View>
          </AnimatedCard>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
