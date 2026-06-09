import React, { useEffect } from 'react';
import { View, Modal, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  runOnJS
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heightRatio?: number; // 0 to 1, default 0.8 (80% of screen)
}

export const BottomSheet = ({ isVisible, onClose, children, heightRatio = 0.85 }: BottomSheetProps) => {
  const translateY = useSharedValue(height);
  const sheetHeight = height * heightRatio;

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
    } else {
      translateY.value = withTiming(height, { duration: 300 });
    }
  }, [isVisible]);

  const handleClose = () => {
    translateY.value = withTiming(height, { duration: 300 }, (isFinished) => {
      if (isFinished) {
        runOnJS(onClose)();
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    };
  });

  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={handleClose}>
      <View className="flex-1 bg-black/40 justify-end">
        <TouchableWithoutFeedback onPress={handleClose}>
          <View className="absolute inset-0" />
        </TouchableWithoutFeedback>
        
        <Animated.View 
          style={[animatedStyle, { height: sheetHeight }]} 
          className="bg-white rounded-t-3xl shadow-xl shadow-black overflow-hidden"
        >
          {/* Drag Handle */}
          <View className="w-full items-center py-3 border-b border-zinc-100">
            <View className="w-12 h-1.5 bg-zinc-300 rounded-full" />
          </View>
          
          <View className="flex-1">
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
