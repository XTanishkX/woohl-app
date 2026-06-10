import React, { useEffect } from 'react';
import { View, ViewProps, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  Easing
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface SkeletonProps extends ViewProps {
  className?: string;
  variant?: 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height, 
  style, 
  ...props 
}: SkeletonProps) {
  const translateX = useSharedValue(-SCREEN_WIDTH);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(SCREEN_WIDTH, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  const getVariantStyles = () => {
    if (variant === 'circular') return 'rounded-full';
    return 'rounded-xl';
  };

  return (
    <View
      style={[{ width: width as any, height: height as any, overflow: 'hidden', backgroundColor: '#E4E4E7' }, style]}
      className={`${getVariantStyles()} ${className}`}
      {...props}
    >
      <Animated.View 
        style={[animatedStyle, { width: '100%', height: '100%', backgroundColor: '#F4F4F5', opacity: 0.6 }]} 
      />
    </View>
  );
}

export function ProductCardSkeleton() {
  return (
    <View className="w-40 mr-4">
      <Skeleton className="h-48 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-1" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-8 w-full rounded-lg" />
    </View>
  );
}

export function ReelSkeleton() {
  return (
    <View style={{ height: Dimensions.get('window').height - 80, width: Dimensions.get('window').width }} className="bg-black">
      <Skeleton className="w-full h-full rounded-none opacity-20" />
      <View className="absolute bottom-6 left-4 right-4">
        <Skeleton className="h-6 w-1/3 mb-2 rounded-lg" />
        <Skeleton className="h-4 w-2/3 mb-4 rounded-lg" />
        <Skeleton className="h-16 w-full rounded-2xl" />
      </View>
    </View>
  );
}

export function ProfileSkeleton() {
  return (
    <View className="flex-1 bg-white">
      <Skeleton className="h-40 w-full rounded-none" />
      <View className="items-center -mt-10 mb-4">
        <Skeleton variant="circular" className="h-20 w-20 border-4 border-white" />
      </View>
      <View className="items-center gap-2 mb-6">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </View>
      <View className="flex-row justify-around px-4">
        <Skeleton className="h-24 w-[30%] rounded-xl" />
        <Skeleton className="h-24 w-[30%] rounded-xl" />
        <Skeleton className="h-24 w-[30%] rounded-xl" />
      </View>
    </View>
  );
}
