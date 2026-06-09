import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react-native';
import { ProductTag } from './ProductTag';
import { useVideoFeedStore } from '../../store/useVideoFeedStore';

const { height, width } = Dimensions.get('window');
// Calculate approximate tab bar height to subtract
const TAB_BAR_HEIGHT = 85; 
const REEL_HEIGHT = height - TAB_BAR_HEIGHT;

export interface ReelData {
  id: string;
  videoUrl: string;
  creatorName: string;
  description: string;
  likes: number;
  comments: number;
  product?: {
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    brand: string;
  };
}

interface ReelProps {
  data: ReelData;
  index: number;
}

export function Reel({ data, index }: ReelProps) {
  const { activeVideoIndex, isMuted, toggleMute } = useVideoFeedStore();
  const isActive = activeVideoIndex === index;

  const player = useVideoPlayer(data.videoUrl, player => {
    player.loop = true;
    player.muted = isMuted;
  });

  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player]);

  useEffect(() => {
    player.muted = isMuted;
  }, [isMuted, player]);

  return (
    <View style={{ height: REEL_HEIGHT, width }} className="bg-black relative">
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        nativeControls={false}
      />
      
      {/* Overlay UI */}
      <View className="absolute inset-0 justify-between py-6 px-4">
        {/* Top Header Placeholder if needed */}
        <View className="items-end mt-12">
          <TouchableOpacity onPress={toggleMute} className="bg-black/40 p-2 rounded-full backdrop-blur-md">
            <Text className="text-white text-xs font-bold">{isMuted ? 'Unmute' : 'Mute'}</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Section */}
        <View className="flex-row justify-between items-end mb-6">
          {/* Left: Info & Product */}
          <View className="flex-1 mr-4">
            <Text className="text-white font-bold text-lg mb-1 drop-shadow-md">@{data.creatorName}</Text>
            <Text className="text-white text-sm mb-4 drop-shadow-md" numberOfLines={2}>{data.description}</Text>
            
            {data.product && (
              <ProductTag 
                id={data.product.id}
                title={data.product.title}
                price={data.product.price}
                imageUrl={data.product.imageUrl}
                brand={data.product.brand}
              />
            )}
          </View>

          {/* Right: Actions */}
          <View className="items-center gap-6">
            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-black/40 rounded-full items-center justify-center backdrop-blur-md mb-1 border border-white/20">
                <Heart color="white" size={24} />
              </View>
              <Text className="text-white text-xs font-bold">{data.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-black/40 rounded-full items-center justify-center backdrop-blur-md mb-1 border border-white/20">
                <MessageCircle color="white" size={24} />
              </View>
              <Text className="text-white text-xs font-bold">{data.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-black/40 rounded-full items-center justify-center backdrop-blur-md mb-1 border border-white/20">
                <Share2 color="white" size={24} />
              </View>
              <Text className="text-white text-xs font-bold">Share</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <MoreVertical color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
