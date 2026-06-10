import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, MessageCircle, Mail, PhoneCall, ChevronRight, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Help & Support</Text>
      </View>

      <ScrollView className="flex-1 p-5">
        <View className="mb-8 items-center mt-4">
          <View className="w-20 h-20 bg-woohl-orange/10 rounded-full items-center justify-center mb-4 border border-woohl-orange/20">
            <MessageCircle color="#FF5A5F" size={32} />
          </View>
          <Text className="text-woohl-dark font-black text-2xl mb-2 text-center">How can we help you?</Text>
          <Text className="text-zinc-500 text-center w-4/5">We're here to help with any questions or issues you might have.</Text>
        </View>

        <Text className="text-woohl-dark font-black text-sm uppercase tracking-widest mb-4 ml-2">Contact Us</Text>
        <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm mb-8 overflow-hidden">
          <TouchableOpacity className="flex-row items-center justify-between p-5 border-b border-zinc-100">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-zinc-50 rounded-xl items-center justify-center mr-4">
                <MessageCircle color="#111827" size={20} />
              </View>
              <View>
                <Text className="font-bold text-woohl-dark text-base mb-1">Live Chat</Text>
                <Text className="text-zinc-500 text-xs">Typical reply in 5 mins</Text>
              </View>
            </View>
            <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center justify-between p-5 border-b border-zinc-100">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-zinc-50 rounded-xl items-center justify-center mr-4">
                <Mail color="#111827" size={20} />
              </View>
              <View>
                <Text className="font-bold text-woohl-dark text-base mb-1">Email Us</Text>
                <Text className="text-zinc-500 text-xs">support@woohl.com</Text>
              </View>
            </View>
            <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-5">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-zinc-50 rounded-xl items-center justify-center mr-4">
                <PhoneCall color="#111827" size={20} />
              </View>
              <View>
                <Text className="font-bold text-woohl-dark text-base mb-1">Call Us</Text>
                <Text className="text-zinc-500 text-xs">+91 1800 123 4567</Text>
              </View>
            </View>
            <ChevronRight color="#9CA3AF" size={20} />
          </TouchableOpacity>
        </View>

        <Text className="text-woohl-dark font-black text-sm uppercase tracking-widest mb-4 ml-2">Self Help</Text>
        <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm mb-10 overflow-hidden">
          {['Track Order', 'Returns & Refunds', 'Payment Issues', 'Account Settings'].map((item, idx) => (
            <TouchableOpacity key={idx} className={`flex-row items-center justify-between p-5 ${idx !== 3 ? 'border-b border-zinc-100' : ''}`}>
              <View className="flex-row items-center">
                <FileText color="#111827" size={18} className="mr-4" />
                <Text className="font-bold text-woohl-dark text-sm">{item}</Text>
              </View>
              <ChevronRight color="#9CA3AF" size={20} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
