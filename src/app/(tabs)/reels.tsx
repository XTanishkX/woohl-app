import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Heart, Share2, MessageCircle, Sparkles, Plus, CheckCircle, AlertTriangle, Users, BarChart3, Shirt } from 'lucide-react-native';
import { mockVideoFeed, mockGroupBuys } from '../../lib/mock-db/data';
import { VideoFeedItem } from '../../lib/mock-db/types';
import { BottomSheet } from '../../components/ui/BottomSheet';
import { MoodCheckDialog } from '../../components/ui/MoodCheckDialog';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';

const { height, width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60;
const ITEM_HEIGHT = height - TAB_BAR_HEIGHT;

const VideoPost = ({ item, isVisible, onOpenSheet }: { item: VideoFeedItem, isVisible: boolean, onOpenSheet: (item: VideoFeedItem, tab: 'product' | 'intel') => void }) => {
  const player = useVideoPlayer(item.videoUrl, player => {
    player.loop = true;
    if (isVisible) player.play();
    else player.pause();
  });

  return (
    <View style={{ height: ITEM_HEIGHT, width }} className="bg-black relative">
      <VideoView 
        player={player} 
        style={StyleSheet.absoluteFillObject} 
        contentFit="cover"
        nativeControls={false}
      />
      <View className="absolute inset-0 bg-black/20" />

      {/* Live Intel AI Badge */}
      <TouchableOpacity 
        onPress={() => onOpenSheet(item, 'intel')}
        className="absolute top-16 left-4 bg-woohl-dark/60 backdrop-blur-md px-3 py-1.5 rounded-full flex-row items-center border border-white/20"
      >
        <Sparkles color="#10B981" size={14} className="mr-1.5" />
        <Text className="text-white text-xs font-bold">Live AI Intel</Text>
      </TouchableOpacity>

      {/* Floating Action Buttons */}
      <View className="absolute right-4 bottom-40 items-center gap-6">
        <View className="items-center">
          <View className="w-12 h-12 rounded-full border-2 border-white mb-2 overflow-hidden relative">
            <Image source={{ uri: item.creator.avatarUrl }} className="w-full h-full" />
            <View className="absolute bottom-0 right-0 bg-woohl-orange rounded-full p-0.5 border border-white">
              <Plus color="white" size={12} />
            </View>
          </View>
        </View>
        <TouchableOpacity className="items-center">
          <Heart color="white" size={32} />
          <Text className="text-white text-xs font-bold mt-1">{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={() => onOpenSheet(item, 'product')}>
          <MessageCircle color="white" size={32} />
          <Text className="text-white text-xs font-bold mt-1">Ask</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Share2 color="white" size={32} />
          <Text className="text-white text-xs font-bold mt-1">Share</Text>
        </TouchableOpacity>
      </View>

      {/* Info Overlay */}
      <View className="absolute left-4 bottom-32 w-3/4">
        <Text className="text-white font-bold text-lg mb-1">@{item.creator.handle}</Text>
        <Text className="text-white text-sm" numberOfLines={2}>{item.product.name} - {item.product.description}</Text>
      </View>

      {/* Shoppable Product Card Overlay */}
      <TouchableOpacity 
        onPress={() => onOpenSheet(item, 'product')}
        className="absolute bottom-6 left-4 right-4 bg-white/20 backdrop-blur-xl rounded-2xl p-3 flex-row items-center border border-white/20"
      >
        <Image source={{ uri: item.product.images[0] }} className="w-16 h-16 rounded-xl mr-3" />
        <View className="flex-1 justify-center">
          <Text className="text-white font-bold text-sm" numberOfLines={1}>{item.product.name}</Text>
          <Text className="text-white/80 text-xs mb-1">₹{item.product.price} • {item.product.sustainabilityScore} Eco Score</Text>
        </View>
        <View className="bg-white px-4 py-2 rounded-full shadow-sm">
          <Text className="text-woohl-dark font-bold text-xs uppercase">Buy Now</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function FeedScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<VideoFeedItem | null>(null);
  const [activeTab, setActiveTab] = useState<'product' | 'intel'>('product');
  
  // Fake Poll State
  const [showPoll, setShowPoll] = useState(false);
  const [pollVotes, setPollVotes] = useState(0);
  
  // Impulse Control State
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  
  // Store actions
  const { addToCart, isHighImpulseZone } = useAppStore();

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const handleOpenSheet = (item: VideoFeedItem, tab: 'product' | 'intel') => {
    setActiveItem(item);
    setActiveTab(tab);
    setSheetVisible(true);
    setShowPoll(false);
  };

  const handleAddToCart = (product: any) => {
    if (isHighImpulseZone()) {
      setSheetVisible(false);
      setTimeout(() => setShowMoodCheck(true), 300); // Wait for sheet to close
    } else {
      addToCart(product);
      setSheetVisible(false);
    }
  };

  // Simulate Poll Votes
  useEffect(() => {
    if (showPoll) {
      setPollVotes(12);
      const interval = setInterval(() => {
        setPollVotes(prev => Math.min(prev + Math.floor(Math.random() * 5), 212));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [showPoll]);

  // Live Intel Simulated State
  const [intelProcessing, setIntelProcessing] = useState(true);
  useEffect(() => {
    if (sheetVisible && activeTab === 'intel') {
      setIntelProcessing(true);
      setTimeout(() => setIntelProcessing(false), 1200);
    }
  }, [sheetVisible, activeTab]);

  return (
    <View className="flex-1 bg-black">
      <MoodCheckDialog 
        isVisible={showMoodCheck}
        onMindfulPicks={() => {
          setShowMoodCheck(false);
          // Navigate to a mindful picks view or show toast
        }}
        onProceedAnyway={() => {
          setShowMoodCheck(false);
          if (activeItem) addToCart(activeItem.product);
        }}
      />
      <FlatList
        data={mockVideoFeed}
        renderItem={({ item, index }) => (
          <VideoPost item={item} isVisible={index === currentIndex} onOpenSheet={handleOpenSheet} />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      {/* Universal Bottom Sheet */}
      <BottomSheet isVisible={sheetVisible} onClose={() => setSheetVisible(false)} heightRatio={0.85}>
        {activeItem && (
          <View className="flex-1">
            {/* Sheet Tabs */}
            <View className="flex-row px-5 pt-2 mb-4 border-b border-zinc-100">
              <TouchableOpacity onPress={() => setActiveTab('product')} className={`pb-3 mr-6 ${activeTab === 'product' ? 'border-b-2 border-woohl-orange' : ''}`}>
                <Text className={`font-bold ${activeTab === 'product' ? 'text-woohl-dark' : 'text-zinc-400'}`}>Product</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('intel')} className={`pb-3 ${activeTab === 'intel' ? 'border-b-2 border-woohl-orange' : ''}`}>
                <Text className={`font-bold flex-row items-center ${activeTab === 'intel' ? 'text-woohl-green' : 'text-zinc-400'}`}>
                  ✨ AI Intel
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
              {activeTab === 'product' ? (
                <>
                  {/* Product Details Header */}
                  <View className="flex-row items-center mb-6">
                    <Image source={{ uri: activeItem.product.images[0] }} className="w-24 h-32 rounded-xl mr-4" />
                    <View className="flex-1">
                      <Text className="text-woohl-orange font-bold text-[10px] uppercase tracking-widest mb-1">{activeItem.product.brandName}</Text>
                      <Text className="text-woohl-dark font-bold text-lg leading-tight mb-2">{activeItem.product.name}</Text>
                      <View className="flex-row items-center gap-2 mb-2">
                        <Text className="text-woohl-dark font-bold text-xl">₹{activeItem.product.price}</Text>
                        <Text className="text-zinc-400 line-through text-sm">₹{activeItem.product.originalPrice}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Ask Friends Poll Simulator */}
                  {!showPoll ? (
                    <TouchableOpacity onPress={() => setShowPoll(true)} className="bg-woohl-blue/10 border border-woohl-blue/20 rounded-xl p-4 flex-row items-center mb-6">
                      <View className="bg-woohl-blue/20 w-10 h-10 rounded-full items-center justify-center mr-3">
                        <BarChart3 color="#1D4ED8" size={20} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-woohl-blue font-bold text-sm">Not sure? Ask Friends!</Text>
                        <Text className="text-woohl-blue/70 text-xs">Create a quick poll on WhatsApp</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View className="bg-woohl-blue border border-woohl-blue rounded-xl p-4 mb-6 shadow-md shadow-woohl-blue/30">
                      <Text className="text-white font-bold mb-3">Live Poll: Should I buy this?</Text>
                      <View className="bg-white/20 h-8 rounded-full overflow-hidden mb-2 relative justify-center px-3">
                        <View className="absolute top-0 bottom-0 left-0 bg-white" style={{ width: '68%' }} />
                        <Text className={`text-xs font-bold relative z-10 ${pollVotes > 0 ? 'text-woohl-blue' : 'text-white'}`}>Yes (68%)</Text>
                      </View>
                      <View className="bg-white/20 h-8 rounded-full overflow-hidden mb-2 relative justify-center px-3">
                        <View className="absolute top-0 bottom-0 left-0 bg-white" style={{ width: '32%' }} />
                        <Text className="text-white text-xs font-bold relative z-10">No (32%)</Text>
                      </View>
                      <Text className="text-white/80 text-[10px] text-right mt-1">{pollVotes} votes • Consensus Reached!</Text>
                    </View>
                  )}

                  {/* Digital Closet Match (Simulated) */}
                  {activeItem.product.category === 'Fashion' && (
                    <View className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-6">
                      <View className="flex-row items-center mb-3">
                        <Shirt color="#0A1628" size={16} className="mr-2" />
                        <Text className="text-woohl-dark font-bold text-sm">AI Closet Match</Text>
                      </View>
                      <View className="flex-row items-center justify-between">
                        <Image source={{ uri: activeItem.product.images[0] }} className="w-16 h-16 rounded-lg border border-zinc-200" />
                        <View className="items-center px-2">
                          <Text className="text-2xl font-black text-woohl-orange">92%</Text>
                          <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Match</Text>
                        </View>
                        <View className="flex-row flex-wrap w-20 gap-1 justify-end">
                          {[1,2].map(i => (
                            <View key={i} className="w-9 h-9 bg-zinc-200 rounded-md overflow-hidden">
                               <Image source={{ uri: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100` }} className="w-full h-full opacity-50" />
                            </View>
                          ))}
                        </View>
                      </View>
                      <Text className="text-zinc-500 text-xs mt-3 leading-tight">
                        Great match! Fits your style, but you already own similar items in your closet. Mindful purchase?
                      </Text>
                    </View>
                  )}

                  {/* Group Buy Engine */}
                  <Text className="font-bold text-woohl-dark mb-3">Collective Commerce</Text>
                  <View className="flex-row gap-3 mb-8">
                    <TouchableOpacity 
                      onPress={() => handleAddToCart(activeItem.product)}
                      className="flex-1 bg-zinc-100 border border-zinc-200 rounded-xl py-3 items-center"
                    >
                      <Text className="text-zinc-500 text-xs font-semibold mb-0.5">Buy Solo</Text>
                      <Text className="text-woohl-dark font-bold text-base">₹{activeItem.product.price}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => handleAddToCart(activeItem.product)}
                      className="flex-1 bg-woohl-orange rounded-xl py-3 items-center shadow-md shadow-woohl-orange/30 border border-woohl-orange"
                    >
                      <View className="flex-row items-center mb-0.5">
                        <Users color="white" size={12} className="mr-1" />
                        <Text className="text-white/90 text-xs font-semibold">Group Buy</Text>
                      </View>
                      <Text className="text-white font-bold text-base">₹899</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="h-10" />
                </>
              ) : (
                <>
                  {/* Live AI Intel Tab */}
                  {intelProcessing ? (
                    <View className="items-center justify-center py-20">
                      <Sparkles color="#10B981" size={48} className="mb-4 animate-pulse" />
                      <Text className="text-woohl-dark font-bold text-lg">Analyzing Video Claims...</Text>
                      <Text className="text-zinc-500 text-sm mt-2">Checking fabric, reviews, and eco-impact</Text>
                    </View>
                  ) : (
                    <View className="py-4">
                      {/* Confidence Score */}
                      <View className="items-center mb-8">
                        <Text className="text-6xl font-black text-woohl-green mb-1">{activeItem.aiLiveIntel.confidenceScore}%</Text>
                        <Text className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Trust Score</Text>
                      </View>

                      {/* Analysis Results */}
                      <View className="gap-4">
                        <View className="flex-row items-start bg-green-50 border border-green-100 p-4 rounded-xl">
                          <CheckCircle color="#10B981" size={20} className="mr-3 mt-0.5" />
                          <View className="flex-1">
                            <Text className="text-green-800 font-bold text-sm mb-1">Review Verified</Text>
                            <Text className="text-green-700/80 text-xs">Product matches {activeItem.aiLiveIntel.verifiedReviews}+ positive reviews across the platform.</Text>
                          </View>
                        </View>
                        
                        {activeItem.aiLiveIntel.missingClaims.map((claim, idx) => (
                          <View key={idx} className="flex-row items-start bg-red-50 border border-red-100 p-4 rounded-xl">
                            <AlertTriangle color="#EF4444" size={20} className="mr-3 mt-0.5" />
                            <View className="flex-1">
                              <Text className="text-red-800 font-bold text-sm mb-1">Missing Claim Detected</Text>
                              <Text className="text-red-700/80 text-xs">{claim}</Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        )}
      </BottomSheet>
    </View>
  );
}
