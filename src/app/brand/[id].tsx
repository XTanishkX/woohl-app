import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, PlayCircle, MapPin, Heart } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { mockBrands, mockProducts, mockVideoFeed } from '../../lib/mock-db/data';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function BrandScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { followingBrands, toggleFollowBrand, addToCart } = useAppStore();
  
  const brand = mockBrands.find(b => b.id === id) || mockBrands[0];
  const isFollowing = followingBrands.includes(brand.id);
  const brandProducts = mockProducts.filter(p => p.brandId === brand.id);
  const brandReels = mockVideoFeed.filter(v => v.product.brandId === brand.id);

  const [activeTab, setActiveTab] = useState<'Products' | 'Our Story' | 'Reels'>('Products');

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const parallaxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollY.value, [-100, 0, 300], [0, 0, 150], Extrapolation.CLAMP)
        }
      ]
    };
  });

  const videoUrl = mockVideoFeed[0].videoUrl; // Fallback to a video for intro
  const player = useVideoPlayer(videoUrl, player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const handleFollow = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toggleFollowBrand(brand.id);
  };

  return (
    <View className="flex-1 bg-white">
      {/* HEADER / NAVIGATION OVERLAY */}
      <View className="absolute top-12 left-4 z-50 flex-row">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full items-center justify-center border border-white/20">
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView showsVerticalScrollIndicator={false} className="flex-1" onScroll={scrollHandler} scrollEventThrottle={16}>
        {/* HERO SECTION with Parallax */}
        <Animated.View style={[parallaxStyle, { height: 300, width: '100%', position: 'relative' }]}>
          <VideoView
            style={{ width: '100%', height: '100%' }}
            player={player}
            contentFit="cover"
            nativeControls={false}
          />
          <View className="absolute inset-0 bg-black/30" />
        </Animated.View>

        <View className="px-5 pb-6 bg-white rounded-t-3xl -mt-6">
          <View className="flex-row justify-between items-end mb-4">
            <View className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden -mt-12">
              <Image source={{ uri: brand.logo }} className="w-full h-full" />
            </View>
            <TouchableOpacity 
              onPress={handleFollow}
              className={`px-6 py-2 rounded-full border-2 ${isFollowing ? 'bg-gray-100 border-gray-200' : 'bg-woohl-orange border-woohl-orange shadow-lg shadow-woohl-orange/30'}`}
            >
              <Text className={`font-bold text-sm ${isFollowing ? 'text-gray-700' : 'text-white'}`}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-2xl font-black text-gray-900 mb-1">{brand.name}</Text>
            <View className="flex-row items-center">
              <MapPin color="#6B7280" size={14} className="mr-1" />
              <Text className="text-gray-500 font-medium text-sm">{brand.location || 'India'}</Text>
              <Text className="text-gray-300 mx-2">•</Text>
              <Text className="text-gray-500 font-medium text-sm">{brand.followersCount.toLocaleString()} followers</Text>
            </View>
          </View>
        </View>

        {/* TABS */}
        <View className="flex-row border-b border-gray-200 px-5 mb-4">
          {['Products', 'Our Story', 'Reels'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              onPress={() => setActiveTab(tab as any)}
              className="mr-6 pb-3 relative"
            >
              <Text className={`font-bold text-base ${activeTab === tab ? 'text-[#F34F17]' : 'text-gray-500'}`}>{tab}</Text>
              {activeTab === tab && (
                <View className="absolute bottom-0 left-0 right-0 h-1 bg-[#F34F17] rounded-t-md" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* TAB CONTENT */}
        <View className="px-4 pb-12">
          {activeTab === 'Products' && (
            <View className="flex-row flex-wrap justify-between">
              {brandProducts.length > 0 ? brandProducts.map(item => (
                <View key={item.id} className="w-[48%] mb-5">
                  <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)} className="h-56 w-full rounded-xl bg-gray-100 mb-2 relative overflow-hidden">
                    <Image source={{ uri: item.images[0] }} className="w-full h-full" />
                    <TouchableOpacity className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center">
                      <Heart color="#4B5563" size={14} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                  <Text className="text-sm font-medium text-gray-800 leading-tight" numberOfLines={2}>{item.name}</Text>
                  <View className="flex-row items-center mt-1.5">
                    <Text className="text-sm font-black text-[#F34F17] mr-1.5">₹{item.price}</Text>
                    <Text className="text-xs text-gray-400 line-through mr-1.5">₹{item.originalPrice}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => addToCart(item)}
                    className="w-full border border-orange-500 rounded-lg py-1.5 mt-2 items-center bg-orange-50"
                  >
                    <Text className="text-[#F34F17] font-bold text-xs uppercase tracking-wider">Add</Text>
                  </TouchableOpacity>
                </View>
              )) : (
                <Text className="text-gray-500 w-full text-center mt-10">No products available.</Text>
              )}
            </View>
          )}

          {activeTab === 'Our Story' && (
            <View>
              <Text className="text-gray-700 text-base leading-relaxed mb-6">
                {brand.ourStory} Founded in 2023, we aim to bring authentic craftsmanship directly to your doorstep. Every piece is a labor of love, preserving heritage while adapting to modern aesthetics.
              </Text>
              <View className="w-full h-48 rounded-xl overflow-hidden mb-6 bg-gray-200">
                <Image source={{ uri: brand.founder?.photo || 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800' }} className="w-full h-full" />
              </View>
              <Text className="text-lg font-black text-gray-900 mb-3">Our Values</Text>
              <View className="flex-row flex-wrap mb-6">
                {brand.tags.map(tag => (
                  <View key={tag} className="bg-orange-50 border border-orange-200 px-4 py-2 rounded-full mr-2 mb-2">
                    <Text className="text-[#F34F17] font-bold text-xs">{tag}</Text>
                  </View>
                ))}
                {brand.isWomenLed && (
                  <View className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-full mr-2 mb-2">
                    <Text className="text-purple-600 font-bold text-xs">Women-Led</Text>
                  </View>
                )}
                {brand.isSustainable && (
                  <View className="bg-green-50 border border-green-200 px-4 py-2 rounded-full mr-2 mb-2">
                    <Text className="text-green-600 font-bold text-xs">Organic</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {activeTab === 'Reels' && (
            <View className="flex-row flex-wrap -mx-1">
              {brandReels.length > 0 ? brandReels.map(reel => (
                <TouchableOpacity 
                  key={reel.id} 
                  onPress={() => router.push('/(tabs)/discover')}
                  className="w-1/3 aspect-square p-1 relative"
                >
                  <Image source={{ uri: reel.product.images[0] }} className="w-full h-full rounded-lg bg-gray-200" />
                  <View className="absolute inset-0 items-center justify-center">
                    <PlayCircle color="white" size={24} opacity={0.8} />
                  </View>
                </TouchableOpacity>
              )) : (
                <Text className="text-gray-500 w-full text-center mt-10">No reels available.</Text>
              )}
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
