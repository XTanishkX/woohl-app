import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Mic, X, TrendingUp, Search as SearchIcon, Camera } from 'lucide-react-native';
import { Image as ExpoImage } from 'expo-image';
import { Input } from '../../components/ui/Input';
import { mockProducts } from '../../lib/mock-db/data';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiText, setAiText] = useState('');
  const [showResults, setShowResults] = useState(false);

  const mainCategories = [
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200' },
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200' },
    { name: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54c28?w=200' },
    { name: 'Home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200' },
    { name: 'Sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200' },
    { name: 'Books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200' },
  ];

  const startupCollections = [
    { name: 'New Startups', icon: '🚀', color: 'bg-[#1D4ED8]' },
    { name: 'Sustainable Brands', icon: '🌿', color: 'bg-[#10B981]' },
    { name: 'Women-led', icon: '👑', color: 'bg-[#FF5A5F]' },
    { name: 'Student Founders', icon: '🎓', color: 'bg-[#F59E0B]' },
  ];

  const trendingSearches = ['Summer Fits', 'Minimalist', 'Tech Accessories', 'Home Decor'];

  // Simulate AI Voice Search
  useEffect(() => {
    if (isListening) {
      setAiText('');
      const textToType = "Find me sustainable fashion near me...";
      let i = 0;
      
      const typingInterval = setInterval(() => {
        setAiText(prev => prev + textToType.charAt(i));
        i++;
        if (i >= textToType.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsListening(false);
            setShowResults(true);
            setSearchQuery("Sustainable fashion near me");
          }, 1000);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [isListening]);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="px-5 py-4 border-b border-zinc-100 z-10">
        <ExpoImage source={require('../../../public/wordmark.png')} style={{ height: 24, width: 80, marginBottom: 16 }} contentFit="contain" />
        <View className="flex-row items-center gap-3">
          <View className="flex-1">
            <Input 
              placeholder="Search products, brands, reels..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={<SearchIcon color="#9CA3AF" size={20} />}
            />
          </View>
          <TouchableOpacity className="w-12 h-12 bg-zinc-50 rounded-2xl items-center justify-center border border-zinc-200">
            <Camera color="#111827" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        className="bg-zinc-50"
      >
        {!showResults ? (
          <>
            {/* Startup Collections */}
            <View className="mt-6 px-5 mb-8">
              <Text className="text-lg font-black text-woohl-dark tracking-tight mb-4 uppercase">Startup Collections</Text>
              <View className="flex-row flex-wrap justify-between gap-y-4">
                {startupCollections.map((col, index) => (
                  <TouchableOpacity key={index} className={`w-[48%] ${col.color} p-4 rounded-3xl shadow-xl shadow-black/20`}>
                    <Text className="text-2xl mb-2">{col.icon}</Text>
                    <Text className="text-white font-black text-sm">{col.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Trending Searches */}
            <View className="px-5 mb-8">
              <View className="flex-row items-center gap-2 mb-4">
                <TrendingUp color="#FF5A5F" size={24} />
                <Text className="text-lg font-black text-woohl-dark tracking-tight uppercase">Trending Searches</Text>
              </View>
              <View className="flex-row flex-wrap gap-3">
                {trendingSearches.map((tag, index) => (
                  <TouchableOpacity key={index} className="bg-white px-4 py-2 rounded-xl shadow-sm shadow-zinc-200/50 border border-zinc-100">
                    <Text className="text-woohl-dark font-bold text-xs">{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Main Categories Grid */}
            <View className="px-5 pb-24">
              <Text className="text-lg font-black text-woohl-dark tracking-tight mb-4 uppercase">Categories</Text>
              <View className="flex-row flex-wrap justify-between gap-y-4">
                {mainCategories.map((category, index) => (
                  <TouchableOpacity key={index} className="w-[48%] aspect-square rounded-3xl overflow-hidden relative shadow-lg shadow-zinc-200/50">
                    <Image source={{ uri: category.image }} className="w-full h-full" resizeMode="cover" />
                    <View className="absolute inset-0 bg-black/40 p-4 justify-end">
                      <Text className="text-white font-black text-lg shadow-sm shadow-black">{category.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          /* Search Results */
          <View className="mt-6 px-5 pb-24">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-xl font-black text-woohl-dark">AI Curated Results</Text>
              <TouchableOpacity onPress={() => setShowResults(false)}>
                <Text className="text-woohl-orange font-bold text-sm">Clear</Text>
              </TouchableOpacity>
            </View>
            
            {/* Filter Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-5 px-5">
              {['Price: Low to High', 'Made in India', 'Women-led brands', 'Category: Fashion'].map((filter, idx) => (
                <TouchableOpacity key={idx} className="bg-white border border-zinc-200 px-4 py-2 rounded-full mr-3 shadow-sm shadow-zinc-100">
                  <Text className="text-woohl-dark font-bold text-xs">{filter}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View className="flex-row flex-wrap justify-between">
              {[1, 2, 3, 4].map((item) => (
                <TouchableOpacity 
                  key={item} 
                  className="w-[48%] mb-6 bg-white rounded-3xl shadow-xl shadow-zinc-200/50 overflow-hidden"
                  onPress={() => router.push('/product/p1')}
                >
                  <View className="w-full aspect-[4/5] bg-zinc-100 relative border-b border-zinc-100">
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=300' }} className="w-full h-full" resizeMode="cover" />
                    <View className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md">
                      <Text className="text-xs font-black text-woohl-dark">₹1,299</Text>
                    </View>
                    <View className="absolute bottom-2 left-2 bg-woohl-dark/80 backdrop-blur-md px-2 py-1 rounded-md flex-row items-center">
                      <SearchIcon color="#10B981" size={10} className="mr-1" />
                      <Text className="text-white text-[10px] font-bold">98% Match</Text>
                    </View>
                  </View>
                  <View className="p-3">
                    <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Urban Earth</Text>
                    <Text className="text-woohl-dark font-bold text-sm mb-2" numberOfLines={1}>Classy White Linen</Text>
                    <TouchableOpacity 
                      className="bg-woohl-orange/10 py-2 rounded-xl items-center border border-woohl-orange/20"
                      onPress={() => router.push('/(tabs)/discover')}
                    >
                      <Text className="text-woohl-orange font-black text-[10px] uppercase tracking-widest">See Reel</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* AI Voice Assistant FAB */}
      {!isListening && (
        <TouchableOpacity 
          onPress={() => setIsListening(true)}
          className="absolute bottom-6 right-6 w-16 h-16 bg-woohl-dark rounded-full items-center justify-center shadow-2xl shadow-woohl-dark/40 border-[3px] border-white"
        >
          <Mic color="white" size={24} />
        </TouchableOpacity>
      )}

      {/* AI Listening Overlay */}
      {isListening && (
        <View className="absolute inset-0 bg-black/80 backdrop-blur-xl z-50 items-center justify-center p-6">
          <TouchableOpacity 
            onPress={() => setIsListening(false)}
            className="absolute top-12 right-6 w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <X color="white" size={24} />
          </TouchableOpacity>
          
          <View className="w-40 h-40 bg-[#1D4ED8]/20 rounded-full items-center justify-center mb-8 relative border border-[#1D4ED8]/30">
            <View className="absolute inset-0 bg-woohl-orange/30 rounded-full animate-ping" />
            <Mic color="#1D4ED8" size={64} />
          </View>
          
          <Text className="text-white text-3xl font-black text-center tracking-tight leading-tight mb-2">
            {aiText || "Listening..."}
          </Text>
          <Text className="text-white/50 font-bold text-sm uppercase tracking-widest mt-4">Powered by Woohl AI</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
