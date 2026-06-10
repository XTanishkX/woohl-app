import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ShoppingBag, Heart, Eye } from 'lucide-react-native';

const MOCK_MESSAGES = [
  { text: "Priyanshu just bought a Graphic Tee in Delhi", icon: 'buy' },
  { text: "Karan liked a Reel from @UrbanStyle", icon: 'like' },
  { text: "5 people are looking at this jacket right now", icon: 'view' },
  { text: "Ananya shared a new product review", icon: 'view' },
  { text: "Limited Edition Sneakers just sold out!", icon: 'buy' },
];

export function LiveActivityTicker() {
  const [activeMessage, setActiveMessage] = useState(MOCK_MESSAGES[0]);
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const showToast = () => {
      const randomMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
      setActiveMessage(randomMsg);
      
      // Animate In
      translateY.value = withSpring(0, { damping: 14, stiffness: 90 });
      opacity.value = withTiming(1, { duration: 300 });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Animate Out after 4 seconds
      setTimeout(() => {
        translateY.value = withTiming(100, { duration: 500 });
        opacity.value = withTiming(0, { duration: 500 });
      }, 4000);
    };

    const scheduleNext = () => {
      // Trigger every 15-35 seconds
      const randomInterval = Math.floor(Math.random() * (35000 - 15000 + 1)) + 15000;
      timeoutId = setTimeout(() => {
        showToast();
        scheduleNext();
      }, randomInterval);
    };

    // Initial show after 5 seconds
    timeoutId = setTimeout(() => {
      showToast();
      scheduleNext();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      style={[animatedStyle, { position: 'absolute', bottom: 100, alignSelf: 'center', zIndex: 9999 }]}
      pointerEvents="none"
    >
      <View className="bg-[#18181B]/95 px-4 py-3 rounded-full flex-row items-center shadow-xl shadow-black/40 border border-white/10">
        {activeMessage.icon === 'buy' && <ShoppingBag color="#FF6A00" size={14} className="mr-2" />}
        {activeMessage.icon === 'like' && <Heart color="#FF6A00" size={14} className="mr-2" />}
        {activeMessage.icon === 'view' && <Eye color="#FF6A00" size={14} className="mr-2" />}
        <Text className="text-white font-semibold text-xs">{activeMessage.text}</Text>
      </View>
    </Animated.View>
  );
}
