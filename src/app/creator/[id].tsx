import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ArrowLeft, Share2, Star, CheckCircle, ShieldCheck, MapPin, Video, Grid } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { mockProducts } from '../../lib/mock-db/data';

const { width } = Dimensions.get('window');

export default function SellerProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Products' | 'Reels' | 'About' | 'Reviews' | 'Live'>('Products');
  const [isFollowing, setIsFollowing] = useState(false);

  const startup = {
    id: id as string || 's1',
    name: 'Urban Earth',
    logo: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800',
    followers: '124K',
    following: '23',
    rating: 4.8,
    location: 'Jaipur, Rajasthan',
    story: 'Started in a garage in 2023, Urban Earth aims to decarbonize the Indian fashion industry by working directly with rural weavers.',
    isWomenLed: true,
    isSustainable: true
  };

  const tabs = ['Products', 'Reels', 'About', 'Reviews', 'Live'];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header / Cover Image */}
      <View className="h-48 relative bg-zinc-100">
        <Image source={{ uri: startup.coverImage }} className="w-full h-full opacity-80" resizeMode="cover" />
        <View className="absolute inset-0 bg-black/30" />
        
        <SafeAreaView className="absolute top-0 w-full px-5 py-4 flex-row justify-between items-center z-10">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/30">
            <ArrowLeft color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/30">
            <Share2 color="white" size={20} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Profile Info */}
        <View className="px-5 -mt-10 mb-6">
          <View className="flex-row justify-between items-end mb-4">
            <View className="w-24 h-24 bg-white rounded-[2rem] p-1 shadow-xl shadow-black/10">
              <Image source={{ uri: startup.logo }} className="w-full h-full rounded-[1.75rem]" />
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity 
                onPress={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2.5 rounded-full ${isFollowing ? 'bg-zinc-100 border border-zinc-200' : 'bg-woohl-dark'}`}
              >
                <Text className={`font-black text-sm tracking-widest uppercase ${isFollowing ? 'text-woohl-dark' : 'text-white'}`}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-2xl font-black text-woohl-dark tracking-tight mr-2">{startup.name}</Text>
              <ShieldCheck color="#10B981" size={20} />
            </View>
            <View className="flex-row items-center mb-3">
              <Text className="text-zinc-500 font-bold text-xs">{startup.followers} Followers</Text>
              <Text className="text-zinc-300 mx-2">•</Text>
              <Text className="text-zinc-500 font-bold text-xs">{startup.following} Following</Text>
              <Text className="text-zinc-300 mx-2">•</Text>
              <View className="flex-row items-center">
                <Star color="#F59E0B" size={12} fill="#F59E0B" />
                <Text className="text-woohl-dark font-black text-xs ml-1">{startup.rating}</Text>
              </View>
            </View>

            <View className="flex-row flex-wrap gap-2">
              <View className="bg-woohl-orange/10 px-3 py-1 rounded-md">
                <Text className="text-woohl-orange text-[10px] font-black uppercase tracking-widest">Women-Led</Text>
              </View>
              <View className="bg-woohl-green/10 px-3 py-1 rounded-md">
                <Text className="text-woohl-green text-[10px] font-black uppercase tracking-widest">Sustainable</Text>
              </View>
              <View className="bg-zinc-100 px-3 py-1 rounded-md flex-row items-center">
                <MapPin color="#52525B" size={10} className="mr-1" />
                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{startup.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Custom Tabs */}
        <View className="px-5 border-b border-zinc-100 mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab} 
                onPress={() => setActiveTab(tab as any)}
                className="mr-6 pb-3 relative"
              >
                <Text className={`font-black text-sm uppercase tracking-widest ${activeTab === tab ? 'text-woohl-dark' : 'text-zinc-400'}`}>
                  {tab}
                </Text>
                {activeTab === tab && (
                  <View className="absolute bottom-0 left-0 right-0 h-1 bg-woohl-dark rounded-t-full" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        <View className="px-5 pb-12">
          {activeTab === 'Products' && (
            <View className="flex-row flex-wrap justify-between">
              {mockProducts.map((product) => (
                <TouchableOpacity 
                  key={product.id} 
                  className="w-[48%] mb-6 bg-white rounded-3xl shadow-xl shadow-zinc-200/50 overflow-hidden"
                  onPress={() => router.push(`/product/${product.id}`)}
                >
                  <View className="w-full aspect-[4/5] bg-zinc-100 relative">
                    <Image source={{ uri: product.images[0] }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <View className="p-3">
                    <Text className="text-woohl-dark font-bold text-sm mb-1" numberOfLines={1}>{product.name}</Text>
                    <Text className="text-woohl-dark font-black text-lg">₹{product.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === 'Reels' && (
            <View className="flex-row flex-wrap justify-between">
              {[1, 2, 3, 4].map((reel) => (
                <TouchableOpacity key={reel} onPress={() => router.push('/(tabs)/discover')} className="w-[32%] aspect-[9/16] bg-zinc-100 mb-2 rounded-xl overflow-hidden relative">
                  <Image source={{ uri: `https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=200&sig=${reel}` }} className="w-full h-full" resizeMode="cover" />
                  <View className="absolute bottom-1 right-1 flex-row items-center">
                    <Video color="white" size={12} />
                    <Text className="text-white text-[10px] font-bold ml-1">12K</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === 'About' && (
            <View className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200">
              <Text className="text-woohl-dark font-black text-lg mb-2">Our Story</Text>
              <Text className="text-zinc-600 font-medium leading-relaxed mb-6">
                {startup.story}
              </Text>
              <TouchableOpacity onPress={() => router.push(`/founder/${startup.id}`)} className="w-full aspect-video bg-zinc-200 rounded-2xl overflow-hidden relative justify-center items-center">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600' }} className="absolute inset-0 w-full h-full opacity-60" />
                <View className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full items-center justify-center shadow-xl">
                  <View className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-woohl-dark border-b-[8px] border-b-transparent ml-1" />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'Reviews' && (
            <View className="items-center py-10">
              <Star color="#F59E0B" size={48} fill="#F59E0B" className="mb-4" />
              <Text className="text-woohl-dark font-black text-3xl mb-1">{startup.rating}</Text>
              <Text className="text-zinc-500 font-bold mb-6">Based on 1,245 reviews</Text>
            </View>
          )}

          {activeTab === 'Live' && (
            <View className="items-center py-10 bg-zinc-50 rounded-3xl border border-zinc-200">
              <View className="w-16 h-16 bg-woohl-red/10 rounded-full items-center justify-center mb-4">
                <View className="w-4 h-4 bg-woohl-red rounded-full animate-pulse" />
              </View>
              <Text className="text-woohl-dark font-black text-xl mb-2">No Live Events</Text>
              <Text className="text-zinc-500 font-medium text-center">Urban Earth is not live right now. Follow them to get notified when they go live next.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
