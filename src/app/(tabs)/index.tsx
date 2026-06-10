import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { mockProducts, mockBrands, mockVideoFeed, HOME_TABS, HERO_BANNERS, QUICK_LINKS } from '../../lib/mock-db/data';
import { MapPin, ChevronDown, Coins, Search, Mic, Camera, ChevronRight, Heart, Play, Home as HomeIcon, Sparkles, Users, ShieldCheck, Gift, Leaf } from 'lucide-react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const QuickLinkIcons: Record<string, any> = { Sparkles, Users, ShieldCheck, Gift, Leaf };

export default function HomeScreen() {
  const router = useRouter();
  const { woohlCoins, addToCart } = useAppStore();
  
  // For Hero Banner dots
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View className="flex-1 bg-white">
      {/* STICKY HEADER */}
      <View className="pt-12 bg-white pb-2 shadow-sm z-50">
        {/* Top Bar */}
        <View className="flex-row items-center justify-between px-4 mb-3">
          <View className="flex-row items-center">
            <HomeIcon color="#111827" size={20} className="mr-2" />
            <Text className="text-sm font-bold text-gray-800">Deliver to: Delhi 110001</Text>
            <ChevronDown color="#111827" size={16} className="ml-1" />
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/settings/coins')}
            className="flex-row items-center bg-orange-100 border border-orange-200 px-3 py-1 rounded-full"
          >
            <Coins color="#F34F17" size={14} className="mr-1" />
            <Text className="text-[#F34F17] font-black">{woohlCoins}</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-3">
          <Pressable 
            onPress={() => router.push('/explore')}
            className="h-12 bg-gray-100 rounded-xl flex-row items-center px-4"
          >
            <Search color="#9CA3AF" size={20} className="mr-3" />
            <Text className="flex-1 text-gray-500 text-sm">Search for startups, products...</Text>
            <View className="flex-row items-center gap-3">
              <Mic color="#6B7280" size={20} />
              <Camera color="#6B7280" size={20} />
            </View>
          </Pressable>
        </View>

        {/* Category Tabs */}
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            {HOME_TABS.map((tab) => (
              <TouchableOpacity key={tab.id} className="mr-4 pb-2 relative">
                <Text className={`font-medium ${tab.active ? 'text-[#F34F17]' : 'text-gray-600'}`}>{tab.label}</Text>
                {tab.active && (
                  <View className="absolute bottom-0 left-0 right-0 h-1 bg-[#F34F17] rounded-t-md" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* SCROLLING CANVAS */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-gray-50">
        
        {/* Section 1: Hero Carousel */}
        <View className="mt-4 items-center">
          <Animated.FlatList
            data={HERO_BANNERS}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View style={{ width: width - 32, marginHorizontal: 16 }}>
                <View className="h-[200px] w-full rounded-2xl overflow-hidden relative">
                  <Image source={{ uri: item.image }} className="w-full h-full absolute" />
                  <View className="absolute inset-0 bg-black/30" />
                  <View className="absolute bottom-4 left-4 right-4">
                    <Text className="text-white font-black text-xl mb-1">{item.title}</Text>
                    <Text className="text-white/90 text-sm font-medium">{item.subtitle}</Text>
                  </View>
                </View>
              </View>
            )}
          />
          {/* Pagination Dots */}
          <View className="flex-row items-center justify-center mt-3">
            {HERO_BANNERS.map((_, i) => {
              const animatedStyle = useAnimatedStyle(() => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = interpolate(scrollX.value, inputRange, [6, 20, 6], Extrapolation.CLAMP);
                const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], Extrapolation.CLAMP);
                
                return {
                  width: dotWidth,
                  opacity,
                  backgroundColor: scrollX.value >= (i * width) - (width/2) && scrollX.value <= (i * width) + (width/2) ? '#F34F17' : '#D1D5DB',
                };
              });
              return (
                <Animated.View key={i} className="h-1.5 rounded-full mx-1" style={animatedStyle} />
              );
            })}
          </View>
        </View>

        {/* Section 2: Quick Links */}
        <View className="mt-6 mb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            {QUICK_LINKS.map(link => {
              const IconComp = QuickLinkIcons[link.icon] || Sparkles;
              return (
                <TouchableOpacity key={link.id} className="w-20 items-center mr-2" onPress={() => router.push(link.route as any)}>
                  <View className="h-14 w-14 rounded-full bg-orange-50 flex items-center justify-center mb-1">
                    <IconComp color="#F34F17" size={24} />
                  </View>
                  <Text className="text-xs text-center font-medium text-gray-700">{link.label}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* Section 3: Trending Now */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-lg font-black text-gray-900">Trending Now</Text>
            <TouchableOpacity className="w-6 h-6 bg-orange-100 rounded-full items-center justify-center">
              <ChevronRight color="#F34F17" size={14} />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            data={mockProducts.slice(0, 5)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View className="w-40 mr-4">
                <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)} className="h-48 w-full rounded-xl bg-gray-100 mb-2 relative overflow-hidden">
                  <Image source={{ uri: item.images[0] }} className="w-full h-full" />
                  <TouchableOpacity className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center">
                    <Heart color="#4B5563" size={14} />
                  </TouchableOpacity>
                </TouchableOpacity>
                <Text className="text-sm font-medium text-gray-800 line-clamp-2" numberOfLines={2}>{item.name}</Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-sm font-black text-[#F34F17] mr-1.5">₹{item.price}</Text>
                  <Text className="text-xs text-gray-400 line-through mr-1.5">₹{item.originalPrice}</Text>
                  <Text className="text-[10px] font-bold text-green-600">{Math.round((1 - item.price / item.originalPrice) * 100)}% Off</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => addToCart(item)}
                  className="w-full border border-orange-500 rounded-lg py-1.5 mt-2 items-center"
                >
                  <Text className="text-[#F34F17] font-bold text-xs uppercase tracking-wider">Add</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Section 4: Spotlight on Startups */}
        <View className="mt-8">
          <Text className="text-lg font-black text-gray-900 px-4 mb-3">Brands in Spotlight</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            data={mockBrands}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => router.push(`/brand/${item.id}`)}
                className="w-64 mr-4 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100"
              >
                <View className="h-32 w-full relative">
                  <Image source={{ uri: item.coverImage }} className="w-full h-full" />
                  <View className="absolute inset-0 bg-black/20" />
                  <View className="absolute -bottom-6 left-4 w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white">
                    <Image source={{ uri: item.logo }} className="w-full h-full" />
                  </View>
                </View>
                <View className="pt-8 pb-4 px-4 bg-white">
                  <Text className="font-black text-base text-gray-900 mb-1">{item.name}</Text>
                  <View className="flex-row items-center">
                    <Text className="text-[#F34F17] font-bold text-xs">Shop Collection</Text>
                    <ChevronRight color="#F34F17" size={12} className="ml-0.5" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Section 5: Promotional Full-Width Banner */}
        <View className="mt-8 px-4">
          <Pressable 
            onPress={() => router.push('/brand/b3')}
            className="w-full h-32 rounded-xl overflow-hidden relative"
          >
            <Image source={{ uri: 'https://images.unsplash.com/photo-1605814562095-f269d95f8e56?q=80&w=800' }} className="w-full h-full absolute" />
            <View className="absolute inset-0 bg-black/40" />
            <View className="absolute inset-0 p-5 justify-center">
              <Text className="text-white font-black text-xl mb-1 w-3/4 leading-tight">Meet the Artisans of Jaipur</Text>
              <Text className="text-white/90 text-xs mb-3 w-2/3">Hand block printed textiles & more.</Text>
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-xs">Explore Now</Text>
                <ChevronRight color="white" size={14} className="ml-1" />
              </View>
            </View>
          </Pressable>
        </View>

        {/* Section 6: Top Selection (2x2 Grid) */}
        <View className="mt-8">
          <Text className="text-lg font-black text-gray-900 px-4 mb-3">Top Selection</Text>
          <View className="flex-row flex-wrap justify-between px-4">
            {mockProducts.slice(5, 9).map(item => (
              <TouchableOpacity key={item.id} onPress={() => router.push(`/product/${item.id}`)} className="w-[48%] mb-4 bg-[#F8F9FA] rounded-xl p-3 border border-gray-100">
                <Image source={{ uri: item.images[0] }} className="w-full aspect-square rounded-lg bg-gray-200 mb-2" />
                <Text className="font-semibold text-gray-900 text-sm line-clamp-1" numberOfLines={1}>{item.name}</Text>
                <Text className="text-xs text-gray-500 mt-0.5 line-clamp-1" numberOfLines={1}>{item.brandName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section 7: Watch & Buy */}
        <View className="mt-4 py-6 bg-gray-900">
          <View className="flex-row items-center px-4 mb-4">
            <Text className="text-lg font-black text-white mr-2">Watch & Buy</Text>
            <View className="w-5 h-5 rounded-full bg-[#F34F17] items-center justify-center pl-0.5">
              <Play color="white" size={10} />
            </View>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            data={mockVideoFeed.slice(0, 4)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => router.push('/(tabs)/discover')}
                className="w-32 h-56 mr-3 rounded-xl overflow-hidden relative border border-gray-700 bg-gray-800"
              >
                <Image source={{ uri: item.product.images[0] }} className="w-full h-full absolute opacity-80" />
                <View className="absolute inset-0 items-center justify-center">
                  <View className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md items-center justify-center pl-1 border border-white/20">
                    <Play color="white" size={16} />
                  </View>
                </View>
                <View className="absolute bottom-2 left-2 right-2 bg-white/95 rounded-lg p-1.5 flex-row items-center">
                  <Image source={{ uri: item.product.images[0] }} className="w-6 h-6 rounded bg-gray-200 mr-1.5" />
                  <View className="flex-row items-center justify-between flex-1">
                    <View className="flex-1">
                      <Text className="text-[9px] font-bold text-gray-900" numberOfLines={1}>{item.product.name}</Text>
                      <Text className="text-[10px] font-black text-[#F34F17]">₹{item.product.price}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Section 8: Suggested For You */}
        <View className="mt-8 pb-12">
          <Text className="text-lg font-black text-gray-900 px-4 mb-4">Suggested For You</Text>
          <View className="flex-row flex-wrap justify-between px-4">
            {mockProducts.slice(9, 15).map(item => (
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
            ))}
          </View>
          
          <View className="px-4 mt-2 mb-8">
            <TouchableOpacity onPress={() => router.push('/explore')} className="w-full border border-gray-300 py-3 rounded-xl items-center">
              <Text className="text-gray-700 font-bold text-sm">View All Products</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
