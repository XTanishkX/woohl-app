import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft, MessageCircle, FileText, PhoneCall, HelpCircle, Send } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center z-10 shadow-sm shadow-zinc-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Support</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        {/* Contact Options */}
        <View className="flex-row justify-between gap-3 mb-8">
          <TouchableOpacity className="flex-1 bg-white p-4 rounded-3xl items-center border border-zinc-100 shadow-sm shadow-zinc-200/50">
            <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-2">
              <MessageCircle color="#3B82F6" size={20} />
            </View>
            <Text className="text-woohl-dark font-black text-sm">Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white p-4 rounded-3xl items-center border border-zinc-100 shadow-sm shadow-zinc-200/50">
            <View className="w-12 h-12 bg-green-50 rounded-full items-center justify-center mb-2">
              <PhoneCall color="#10B981" size={20} />
            </View>
            <Text className="text-woohl-dark font-black text-sm">Call</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white p-4 rounded-3xl items-center border border-zinc-100 shadow-sm shadow-zinc-200/50">
            <View className="w-12 h-12 bg-orange-50 rounded-full items-center justify-center mb-2">
              <FileText color="#F97316" size={20} />
            </View>
            <Text className="text-woohl-dark font-black text-sm">Tickets</Text>
          </TouchableOpacity>
        </View>

        {/* AI Chatbot Mock */}
        <View className="bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/50 mb-8 overflow-hidden">
          <View className="bg-zinc-900 p-4 flex-row items-center">
            <View className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            <Text className="text-white font-black text-sm uppercase tracking-widest">Woohl AI Assistant</Text>
          </View>
          <View className="p-5 h-48 bg-zinc-50">
            <View className="bg-white self-start px-4 py-3 rounded-2xl rounded-tl-sm border border-zinc-200 mb-3 max-w-[80%] shadow-sm">
              <Text className="text-woohl-dark font-medium text-sm">Hi Aditi! 👋 I see your order for "Urban Earth Linen" is arriving today. Do you need help with that?</Text>
            </View>
            <View className="bg-woohl-dark self-end px-4 py-3 rounded-2xl rounded-tr-sm mb-3 max-w-[80%] shadow-sm">
              <Text className="text-white font-medium text-sm">Yes, can I change the delivery time?</Text>
            </View>
          </View>
          <View className="p-3 bg-white border-t border-zinc-100 flex-row items-center gap-3">
            <View className="flex-1 bg-zinc-50 border border-zinc-200 rounded-full px-4 h-10 justify-center">
              <Text className="text-zinc-400 font-medium text-sm">Type a message...</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-woohl-orange rounded-full items-center justify-center">
              <Send color="white" size={16} className="ml-1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQs */}
        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Frequently Asked</Text>
        {['Where is my order?', 'How do I return an item?', 'What are Woohl Coins?', 'Is my payment secure?'].map((faq, idx) => (
          <TouchableOpacity key={idx} className="flex-row items-center justify-between bg-white p-5 rounded-2xl mb-3 border border-zinc-100 shadow-sm shadow-zinc-100">
            <View className="flex-row items-center">
              <HelpCircle color="#9CA3AF" size={18} className="mr-3" />
              <Text className="text-woohl-dark font-bold text-sm">{faq}</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
