import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, Share, FlatList, ViewToken } from 'react-native';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Star, ChevronRight, ShoppingCart } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withDelay, withTiming } from 'react-native-reanimated';
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { mockVideoFeed, mockProducts } from '../../lib/mock-db/data';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

const { height, width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; // Approximate tab bar height
const REEL_HEIGHT = height - TAB_BAR_HEIGHT;

const ReelItem = ({ item, isActive, isAnySheetOpen, onCommentPress, onBuyPress }: any) => {
  const router = useRouter();
  const { toggleSavedReel, savedReels, addToCart } = useAppStore();
  const [isLiked, setIsLiked] = useState(false);
  const isSaved = savedReels.includes(item.id);
  
  const likeScale = useSharedValue(1);
  const player = useVideoPlayer(item.videoUrl, player => {
    player.loop = true;
    player.muted = true; // Auto-play policies
    if (isActive) {
      player.play();
    }
  });

  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player]);

  useEffect(() => {
    if (player) {
      player.volume = isAnySheetOpen ? 0.5 : 1.0;
    }
  }, [isAnySheetOpen, player]);

  const handleLike = () => {
    setIsLiked(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    likeScale.value = withSequence(
      withSpring(1.4),
      withSpring(1)
    );
  };

  const bigHeartScale = useSharedValue(0);
  const bigHeartOpacity = useSharedValue(0);

  const onDoubleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleLike();
      
      bigHeartOpacity.value = 1;
      bigHeartScale.value = 0;
      bigHeartScale.value = withSequence(
        withSpring(1.2, { damping: 10, stiffness: 100 }),
        withDelay(200, withTiming(1.5, { duration: 300 }))
      );
      bigHeartOpacity.value = withDelay(
        200, 
        withTiming(0, { duration: 300 }, () => {
          bigHeartScale.value = 0;
        })
      );
    }
  };

  const bigHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bigHeartScale.value }],
    opacity: bigHeartOpacity.value,
  }));

  const handleSave = () => {
    toggleSavedReel(item.id);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this reel by @${item.creator.handle} on Woohl: ${item.product.name} for ₹${item.product.price}!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    addToCart(item.product);
    // Real app would show a toast here
    alert("Added to Cart!");
  };

  const likeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: likeScale.value }]
    };
  });

  return (
    <View style={{ height: REEL_HEIGHT, width }} className="relative bg-black">
      <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
        <Animated.View style={{ flex: 1 }}>
          <VideoView
            style={{ width: '100%', height: '100%' }}
            player={player}
            contentFit="cover"
            nativeControls={false}
          />
          <View className="absolute inset-0 bg-black/20" />
        </Animated.View>
      </TapGestureHandler>

      <Animated.View style={[bigHeartStyle, { position: 'absolute', top: '40%', alignSelf: 'center', zIndex: 50 }]} pointerEvents="none">
         <Heart color="#FF6A00" size={100} fill="#FF6A00" />
      </Animated.View>

      {/* Right Side Actions */}
      <View className="absolute right-4 bottom-32 items-center gap-6 z-10">
        <Animated.View style={likeAnimatedStyle}>
          <TouchableOpacity onPress={handleLike} className="items-center">
            <Heart color={isLiked ? "#FF5A5F" : "white"} size={32} fill={isLiked ? "#FF5A5F" : "transparent"} />
            <Text className="text-white text-xs font-bold mt-1 shadow-sm shadow-black">{item.likes}</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity onPress={() => onCommentPress(item)} className="items-center">
          <MessageCircle color="white" size={30} />
          <Text className="text-white text-xs font-bold mt-1 shadow-sm shadow-black">{item.comments?.length || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} className="items-center">
          <Bookmark color={isSaved ? "#F59E0B" : "white"} size={30} fill={isSaved ? "#F59E0B" : "transparent"} />
          <Text className="text-white text-xs font-bold mt-1 shadow-sm shadow-black">Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} className="items-center">
          <Share2 color="white" size={30} />
          <Text className="text-white text-xs font-bold mt-1 shadow-sm shadow-black">Share</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <MoreVertical color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Bottom Area Content */}
      <View className="absolute bottom-0 w-full px-5 pb-6 pt-20 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-box-none">
        <View className="flex-row items-center mb-3">
          <View className="w-8 h-8 rounded-full border border-white/40 overflow-hidden mr-2">
            <Image source={{ uri: item.creator.avatarUrl }} className="w-full h-full" />
          </View>
          <Text className="text-white font-black text-base shadow-sm shadow-black mr-2">@{item.creator.handle}</Text>
          <TouchableOpacity className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
            <Text className="text-white text-[10px] font-black uppercase tracking-widest">Follow</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-white/90 text-sm font-medium mb-5 shadow-sm shadow-black w-4/5 leading-relaxed">
          {item.product.description}
        </Text>

        {/* Quick Product Overlay CTA */}
        <TouchableOpacity 
          onPress={() => onBuyPress(item.product, item)}
          className="w-full bg-white/10 backdrop-blur-xl rounded-2xl p-3 flex-row items-center border border-white/20 shadow-lg shadow-black/50"
        >
          <View className="w-12 h-12 rounded-xl overflow-hidden mr-3 border border-white/20">
            <Image source={{ uri: item.product.images[0] }} className="w-full h-full" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-sm" numberOfLines={1}>{item.product.name}</Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-white font-black text-sm mr-2">₹{item.product.price}</Text>
              <View className="flex-row items-center bg-black/40 px-1.5 py-0.5 rounded">
                <Star color="#F59E0B" size={10} fill="#F59E0B" />
                <Text className="text-white text-[10px] font-bold ml-1">4.8</Text>
              </View>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={handleAddToCart} className="bg-white/20 px-3 py-2 rounded-xl border border-white/30">
              <ShoppingCart color="white" size={16} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              router.push('/checkout');
            }} className="bg-woohl-orange px-4 py-2 rounded-xl">
              <Text className="text-white font-black text-[10px] uppercase tracking-widest">Buy</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function DiscoverScreen() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [activeCommentReel, setActiveCommentReel] = useState<any>(null);
  const [activeProductReel, setActiveProductReel] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const bottomSheetRef = useRef<BottomSheet>(null);
  const productBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveReelIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const handleCommentPress = useCallback((reel: any) => {
    setActiveCommentReel(reel);
    setIsSheetOpen(true);
    bottomSheetRef.current?.expand();
  }, []);

  const handleBuyPress = useCallback((product: any, reel: any) => {
    setActiveProductReel(reel);
    setIsSheetOpen(true);
    productBottomSheetRef.current?.expand();
  }, []);

  return (
    <View className="flex-1 bg-black relative">
      {/* Top Header */}
      <SafeAreaView className="absolute top-0 w-full px-5 py-4 flex-row justify-between items-center z-10 pointer-events-none">
        <Text className="text-white font-black text-xl tracking-tight">Reels</Text>
        <View className="flex-row items-center bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          <View className="w-2 h-2 bg-woohl-red rounded-full mr-2 animate-pulse" />
          <Text className="text-white text-xs font-black tracking-widest">LIVE</Text>
        </View>
      </SafeAreaView>

      <FlatList
        data={mockVideoFeed}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ReelItem 
            item={item} 
            isActive={index === activeReelIndex} 
            isAnySheetOpen={isSheetOpen}
            onCommentPress={handleCommentPress}
            onBuyPress={handleBuyPress}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews={true}
        windowSize={3}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={() => setIsSheetOpen(false)}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.3} />}
        backgroundStyle={{ backgroundColor: '#fff', borderRadius: 24 }}
        handleIndicatorStyle={{ backgroundColor: '#ccc' }}
      >
        <View className="flex-1 bg-white">
          <Text className="text-center font-black text-lg py-3 border-b border-zinc-100">
            Comments
          </Text>
          <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
            {activeCommentReel?.comments?.map((comment: any) => (
              <View key={comment.id} className="mb-5">
                <View className="flex-row mb-2">
                  <Image source={{ uri: comment.avatar }} className="w-10 h-10 rounded-full mr-3 bg-zinc-200" />
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className="font-bold text-woohl-dark text-sm mr-2">{comment.username}</Text>
                      <Text className="text-zinc-400 text-xs">{comment.timestamp}</Text>
                    </View>
                    <Text className="text-zinc-700 text-sm leading-relaxed">{comment.text}</Text>
                    <TouchableOpacity className="mt-2">
                      <Text className="text-zinc-500 text-xs font-bold">Reply</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity className="items-center justify-start ml-2">
                    <Heart size={16} color="#9CA3AF" />
                    <Text className="text-zinc-400 text-[10px] mt-1">{comment.likes}</Text>
                  </TouchableOpacity>
                </View>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <View className="pl-12 mt-2">
                    {comment.replies.map((reply: any) => (
                      <View key={reply.id} className="flex-row mb-3">
                        <Image source={{ uri: reply.avatar }} className="w-8 h-8 rounded-full mr-3 bg-zinc-200" />
                        <View className="flex-1">
                          <View className="flex-row items-center mb-1">
                            <Text className="font-bold text-woohl-dark text-sm mr-2">{reply.username}</Text>
                            <Text className="text-zinc-400 text-xs">{reply.timestamp}</Text>
                          </View>
                          <Text className="text-zinc-700 text-sm leading-relaxed">{reply.text}</Text>
                        </View>
                        <TouchableOpacity className="items-center justify-start ml-2">
                          <Heart size={14} color="#9CA3AF" />
                          <Text className="text-zinc-400 text-[10px] mt-1">{reply.likes}</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
            {(!activeCommentReel?.comments || activeCommentReel?.comments.length === 0) && (
              <Text className="text-center text-zinc-500 py-10">No comments yet. Be the first!</Text>
            )}
          </BottomSheetScrollView>
          <View className="p-4 border-t border-zinc-100 flex-row items-center bg-white">
            <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' }} className="w-8 h-8 rounded-full mr-3" />
            <BottomSheetTextInput 
              placeholder="Add a comment..."
              className="flex-1 bg-zinc-100 px-4 py-2.5 rounded-full text-sm text-woohl-dark"
            />
            <TouchableOpacity className="ml-3">
              <Text className="text-woohl-orange font-bold text-sm">Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      <BottomSheet
        ref={productBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={() => setIsSheetOpen(false)}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.3} />}
        backgroundStyle={{ backgroundColor: '#fff', borderRadius: 24 }}
        handleIndicatorStyle={{ backgroundColor: '#ccc' }}
      >
        <View className="flex-1 bg-white">
          <Text className="text-center font-black text-lg py-3 border-b border-zinc-100">
            Featured Products
          </Text>
          <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
            {activeProductReel?.product && (
              <View className="flex-row bg-zinc-50 rounded-2xl p-3 border border-zinc-100 items-center shadow-sm shadow-zinc-200">
                <Image source={{ uri: activeProductReel.product.images[0] }} className="w-20 h-20 rounded-xl bg-zinc-200" />
                <View className="flex-1 ml-4 justify-center">
                  <Text className="font-bold text-woohl-dark text-base" numberOfLines={2}>{activeProductReel.product.name}</Text>
                  <Text className="text-woohl-orange font-black text-lg mt-1">₹{activeProductReel.product.price}</Text>
                  <TouchableOpacity className="mt-2 bg-woohl-orange rounded-lg py-1.5 px-4 items-center self-start shadow-md shadow-woohl-orange/30">
                     <Text className="text-white font-bold text-xs">View Product</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </View>
  );
}
