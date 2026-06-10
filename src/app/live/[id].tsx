import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { X, Eye, Heart, Share2, ShoppingBag, Send } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');

export default function LiveCommerceScreen() {
  const router = useRouter();
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Priya M.', text: 'Love the color!' },
    { id: 2, user: 'Rahul K.', text: 'Is this available in size M?' },
    { id: 3, user: 'Neha S.', text: 'Just bought 2 of these 😍' },
  ]);

  const handleSend = () => {
    if (chat.trim()) {
      setMessages([...messages, { id: Date.now(), user: 'You', text: chat }]);
      setChat('');
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Background Video Mock */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1515347619152-475a898b92b6?w=800' }} 
        className="absolute inset-0 w-full h-full opacity-80" 
        resizeMode="cover" 
      />
      
      {/* Header Overlay */}
      <SafeAreaView className="absolute top-0 w-full z-10 px-5 py-4 flex-row justify-between items-start">
        <View className="flex-row items-center gap-3">
          <View className="bg-woohl-red px-3 py-1.5 rounded-md flex-row items-center">
            <View className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
            <Text className="text-white font-black text-xs tracking-widest uppercase">LIVE</Text>
          </View>
          <View className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md flex-row items-center">
            <Eye color="white" size={14} className="mr-2" />
            <Text className="text-white font-bold text-xs">4.2K</Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full items-center justify-center border border-white/20">
          <X color="white" size={20} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Startup Profile Banner */}
      <View className="absolute top-24 left-5 bg-black/40 backdrop-blur-md p-2 pr-4 rounded-full flex-row items-center border border-white/20">
        <View className="w-10 h-10 bg-white rounded-full mr-3 overflow-hidden">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=100' }} className="w-full h-full" />
        </View>
        <View>
          <Text className="text-white font-black text-sm">Urban Earth</Text>
          <Text className="text-white/80 font-medium text-[10px] uppercase tracking-widest">Founder AMA</Text>
        </View>
        <TouchableOpacity className="ml-4 bg-white px-4 py-1.5 rounded-full">
          <Text className="text-woohl-dark font-black text-xs uppercase tracking-widest">Follow</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1 justify-end"
      >
        <View className="px-5 pb-5 w-full flex-row justify-between items-end">
          
          {/* Chat & Pinned Product Area */}
          <View className="flex-1 mr-4">
            {/* Pinned Product */}
            <View className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 mb-4 shadow-2xl flex-row items-center border border-white/50">
              <View className="w-14 h-16 bg-zinc-200 rounded-xl mr-3 overflow-hidden">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=200' }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="flex-1">
                <Text className="text-woohl-red text-[10px] font-black uppercase tracking-widest mb-0.5">Live Drop ⚡️</Text>
                <Text className="text-woohl-dark font-bold text-sm mb-1" numberOfLines={1}>Classy White Linen</Text>
                <Text className="text-woohl-dark font-black text-base mb-1">₹1,299</Text>
              </View>
              <TouchableOpacity className="bg-woohl-dark w-10 h-10 rounded-full items-center justify-center">
                <ShoppingBag color="white" size={16} />
              </TouchableOpacity>
            </View>

            {/* Chat Messages */}
            <View className="h-48 justify-end mb-4 overflow-hidden">
              {messages.map((msg) => (
                <View key={msg.id} className="mb-2 flex-row flex-wrap">
                  <View className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex-row">
                    <Text className="text-white/70 font-bold text-sm mr-2">{msg.user}</Text>
                    <Text className="text-white font-medium text-sm">{msg.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Right Side Actions */}
          <View className="items-center gap-6 pb-20">
            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full items-center justify-center border border-white/20 mb-1">
                <Heart color="white" size={24} fill="white" />
              </View>
              <Text className="text-white font-bold text-xs">12.4K</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <View className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full items-center justify-center border border-white/20 mb-1">
                <Share2 color="white" size={24} />
              </View>
              <Text className="text-white font-bold text-xs">Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Bar */}
        <View className="px-5 pb-8 pt-2 flex-row items-center gap-3">
          <View className="flex-1 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full flex-row items-center px-4 h-12">
            <TextInput 
              className="flex-1 text-white font-medium text-sm h-full"
              placeholder="Say something..."
              placeholderTextColor="#9ca3af"
              value={chat}
              onChangeText={setChat}
              onSubmitEditing={handleSend}
            />
          </View>
          <TouchableOpacity 
            onPress={handleSend}
            className="w-12 h-12 bg-woohl-orange rounded-full items-center justify-center"
          >
            <Send color="white" size={18} className="ml-1" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
