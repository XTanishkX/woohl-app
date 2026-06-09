import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { HeartPulse, CheckCircle2, ArrowRight } from 'lucide-react-native';

interface MoodCheckDialogProps {
  isVisible: boolean;
  onMindfulPicks: () => void;
  onProceedAnyway: () => void;
}

export const MoodCheckDialog = ({ isVisible, onMindfulPicks, onProceedAnyway }: MoodCheckDialogProps) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 backdrop-blur-md justify-center items-center px-6">
        <View className="bg-white rounded-3xl p-6 w-full items-center shadow-2xl shadow-woohl-red/20">
          <View className="w-16 h-16 bg-woohl-red/10 rounded-full items-center justify-center mb-4">
            <HeartPulse color="#EF4444" size={32} />
          </View>
          
          <Text className="text-2xl font-black text-woohl-dark mb-2 text-center">Take a breath...</Text>
          <Text className="text-zinc-500 text-center mb-8 px-4 leading-relaxed">
            Looks like you're in an impulse zone. Want to slow down a bit?
          </Text>
          
          <View className="w-full gap-3">
            <TouchableOpacity 
              onPress={onMindfulPicks}
              className="bg-woohl-green py-4 rounded-xl flex-row items-center justify-center border border-woohl-green shadow-sm shadow-woohl-green/20"
            >
              <CheckCircle2 color="white" size={18} className="mr-2" />
              <Text className="text-white font-bold text-base">Show me mindful picks</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={onProceedAnyway}
              className="py-4 rounded-xl flex-row items-center justify-center border border-zinc-200 bg-zinc-50"
            >
              <Text className="text-zinc-500 font-bold text-base mr-2">Proceed anyway</Text>
              <ArrowRight color="#71717A" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
