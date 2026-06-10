import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { ArrowLeft, Shield, Globe, Bell, UserX, ChevronRight, Moon } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center z-10 shadow-sm shadow-zinc-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Settings</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        
        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">App Preferences</Text>
        <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm shadow-zinc-200/50 mb-8 overflow-hidden">
          <View className="flex-row items-center justify-between p-5 border-b border-zinc-100">
            <View className="flex-row items-center">
              <Globe color="#111827" size={20} className="mr-3" />
              <Text className="text-woohl-dark font-bold text-sm">Language</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-woohl-orange font-black text-sm mr-2">English</Text>
              <ChevronRight color="#9CA3AF" size={16} />
            </View>
          </View>
          <View className="flex-row items-center justify-between p-5 border-b border-zinc-100">
            <View className="flex-row items-center">
              <Moon color="#111827" size={20} className="mr-3" />
              <Text className="text-woohl-dark font-bold text-sm">Dark Mode</Text>
            </View>
            <Switch value={false} trackColor={{ false: '#f4f4f5', true: '#FF5A5F' }} />
          </View>
          <View className="flex-row items-center justify-between p-5">
            <View className="flex-row items-center">
              <Bell color="#111827" size={20} className="mr-3" />
              <View>
                <Text className="text-woohl-dark font-bold text-sm">Notifications</Text>
                <Text className="text-zinc-500 text-[10px] uppercase tracking-widest">Offers, Order Updates</Text>
              </View>
            </View>
            <Switch value={true} trackColor={{ false: '#f4f4f5', true: '#FF5A5F' }} />
          </View>
        </View>

        <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4 ml-2">Privacy & Security</Text>
        <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm shadow-zinc-200/50 mb-8 overflow-hidden">
          <TouchableOpacity className="flex-row items-center justify-between p-5 border-b border-zinc-100">
            <View className="flex-row items-center">
              <Shield color="#111827" size={20} className="mr-3" />
              <Text className="text-woohl-dark font-bold text-sm">Privacy Policy</Text>
            </View>
            <ChevronRight color="#9CA3AF" size={16} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between p-5">
            <View className="flex-row items-center">
              <UserX color="#EF4444" size={20} className="mr-3" />
              <Text className="text-red-500 font-bold text-sm">Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="w-full bg-zinc-200 py-4 rounded-2xl items-center shadow-sm">
          <Text className="text-woohl-dark font-black text-sm uppercase tracking-widest">Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
