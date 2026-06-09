import React, { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withSequence,
  interpolateColor
} from 'react-native-reanimated';

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
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [animation]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animation.value,
      [0, 1],
      ['#e4e4e7', '#f4f4f5'] // zinc-200 to zinc-100
    );

    return { backgroundColor };
  });

  const getVariantStyles = () => {
    if (variant === 'circular') return 'rounded-full';
    return 'rounded-xl';
  };

  return (
    <Animated.View
      style={[
        { width: width as any, height: height as any },
        animatedStyle,
        style
      ]}
      className={`${getVariantStyles()} overflow-hidden ${className}`}
      {...props}
    />
  );
}
