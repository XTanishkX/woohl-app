import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, Flame, Mic, X } from 'lucide-react-native';
import { Input } from '../../components/ui/Input';
import { mockProducts } from '../../lib/mock-db/data';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiText, setAiText] = useState('');
  const [showResults, setShowResults] = useState(false);

  const trendingTags = ['Summer Fits', 'Sustainable', 'Tech Accessories', 'Minimalist', 'Home Decor'];

  // Simulate AI Voice Search
  useEffect(() => {
    if (isListening) {
      setAiText('');
      const textToType = "Find me a classy white shirt under ₹1,500...";
      let i = 0;
      
      const typingInterval = setInterval(() => {
        setAiText(prev => prev + textToType.charAt(i));
        i++;
        if (i >= textToType.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsListening(false);
            setShowResults(true);
            setSearchQuery("Classy white shirt under ₹1,500");
          }, 1000);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [isListening]);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="px-5 py-4 border-b border-zinc-100 z-10">
        <Text className="text-2xl font-bold text-woohl-dark mb-4 tracking-tight">Explore</Text>
        <Input 
          placeholder="Search products, brands, creators..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search color="#9CA3AF" size={20} />}
        />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {!showResults ? (
          <>
            <View className="mt-6 px-5">
              <View className="flex-row items-center gap-2 mb-4">
                <Flame color="#F34F17" size={24} />
                <Text className="text-2xl font-black text-woohl-dark tracking-tight">Trending Now</Text>
              </View>
              <View className="flex-row flex-wrap gap-3">
                {trendingTags.map((tag, index) => (
                  <TouchableOpacity key={index} className="bg-white px-5 py-3 rounded-2xl shadow-lg shadow-zinc-200/50 border border-zinc-100">
                    <Text className="text-woohl-dark font-black text-xs uppercase tracking-widest">{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="mt-10 px-5 pb-24">
              <Text className="text-xl font-bold text-woohl-dark mb-5">Recommended For You</Text>
              <View className="flex-row flex-wrap justify-between">
                {mockProducts.map((product) => (
                  <TouchableOpacity key={product.id} className="w-[48%] mb-6">
                    <View className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 mb-3 border border-zinc-200 relative">
                      <Image source={{ uri: product.images[0] }} className="w-full h-full" resizeMode="cover" />
                      <View className="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-md">
                        <Text className="text-xs font-bold text-woohl-dark">₹{product.price}</Text>
                      </View>
                    </View>
                    <Text className="text-zinc-500 text-xs font-medium mb-1">{product.brandName}</Text>
                    <Text className="text-woohl-dark font-semibold text-sm" numberOfLines={1}>{product.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View className="mt-6 px-5 pb-24">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-xl font-bold text-woohl-dark">AI Curated Results</Text>
              <TouchableOpacity onPress={() => setShowResults(false)}>
                <Text className="text-woohl-orange font-bold text-sm">Clear</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap justify-between">
              {[1, 2, 3, 4].map((item) => (
                <TouchableOpacity key={item} className="w-[48%] mb-6">
                  <View className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 mb-3 border border-woohl-orange/20 relative shadow-sm shadow-woohl-orange/10">
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=300' }} className="w-full h-full" resizeMode="cover" />
                    <View className="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-md">
                      <Text className="text-xs font-bold text-woohl-dark">₹1,299</Text>
                    </View>
                    <View className="absolute bottom-2 left-2 bg-woohl-dark/60 backdrop-blur-md px-2 py-1 rounded-md flex-row items-center">
                      <Search color="#10B981" size={10} className="mr-1" />
                      <Text className="text-white text-[10px] font-bold">98% Match</Text>
                    </View>
                  </View>
                  <Text className="text-zinc-500 text-xs font-medium mb-1">Urban Earth</Text>
                  <Text className="text-woohl-dark font-semibold text-sm" numberOfLines={1}>Classy White Linen</Text>
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
          className="absolute bottom-6 right-6 w-14 h-14 bg-woohl-dark rounded-full items-center justify-center shadow-lg shadow-woohl-dark/40 border-2 border-white"
        >
          <Mic color="white" size={24} />
          <View className="absolute -top-1 -right-1 w-4 h-4 bg-woohl-orange rounded-full border-2 border-white" />
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
          
          <View className="w-32 h-32 bg-woohl-blue/20 rounded-full items-center justify-center mb-8 relative border border-woohl-blue/30">
            <View className="absolute inset-0 bg-woohl-orange/20 rounded-full animate-ping" />
            <Mic color="#1D4ED8" size={48} />
          </View>
          
          <Text className="text-white text-2xl font-bold text-center leading-tight mb-2">
            {aiText || "Listening..."}
          </Text>
          <Text className="text-white/50 text-sm">Powered by Woohl AI</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
