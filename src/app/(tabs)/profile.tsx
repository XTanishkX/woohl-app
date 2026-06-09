import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Heart, Package, CreditCard, ChevronRight, LogOut, MapPin, Store } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-woohl-offwhite">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-white px-6 py-10 items-center border-b border-zinc-100 rounded-b-[3rem] shadow-sm shadow-zinc-200">
          <View className="w-28 h-28 bg-woohl-orange/10 rounded-full mb-5 border-4 border-white shadow-md shadow-woohl-orange/20 overflow-hidden">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' }} 
              className="w-full h-full" 
            />
          </View>
          <Text className="text-3xl font-bold text-woohl-dark tracking-tight">Priya Singh</Text>
          <Text className="text-zinc-500 mt-1 font-medium text-base">priya.s@example.com</Text>

          {/* Stats Bar */}
          <View className="flex-row items-center gap-8 mt-8 border border-zinc-100 rounded-2xl py-4 px-8 bg-zinc-50">
            <View className="items-center">
              <Text className="text-2xl font-bold text-woohl-dark">12</Text>
              <Text className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-1">Orders</Text>
            </View>
            <View className="w-[1px] h-10 bg-zinc-200" />
            <View className="items-center">
              <Text className="text-2xl font-bold text-woohl-dark">4</Text>
              <Text className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-1">Following</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-8 px-6 mb-12">
          <Text className="text-lg font-bold text-woohl-dark mb-4 px-2">Account</Text>
          <View className="bg-white rounded-[2rem] border border-zinc-100 p-2 shadow-sm shadow-zinc-200">
            <ProfileMenuItem icon={<Package size={22} color={Colors.primary} />} title="My Orders" />
            <ProfileMenuItem icon={<Heart size={22} color={Colors.primary} />} title="Wishlist" />
            <ProfileMenuItem icon={<MapPin size={22} color={Colors.primary} />} title="Saved Addresses" />
            <ProfileMenuItem icon={<CreditCard size={22} color={Colors.primary} />} title="Payment Methods" hideBorder />
          </View>

          <Text className="text-lg font-bold text-woohl-dark mb-4 px-2 mt-8">Creator & Brand</Text>
          <View className="bg-white rounded-[2rem] border border-zinc-100 p-2 shadow-sm shadow-zinc-200">
            <ProfileMenuItem 
              icon={<Store size={22} color={Colors.purple[600]} />} 
              title="View Creator Store" 
              onPress={() => router.push('/creator/priya')}
            />
            <ProfileMenuItem icon={<Settings size={22} color={Colors.zinc[500]} />} title="Settings" hideBorder />
          </View>

          <TouchableOpacity className="mt-8 mx-2 flex-row items-center gap-2 justify-center p-4 bg-red-50 rounded-2xl border border-red-100">
            <LogOut size={20} color="#ef4444" />
            <Text className="text-red-500 font-bold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileMenuItem({ icon, title, hideBorder, onPress }: { icon: React.ReactNode, title: string, hideBorder?: boolean, onPress?: () => void }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center justify-between p-4 mx-2 ${!hideBorder ? 'border-b border-zinc-100' : ''}`}
    >
      <View className="flex-row items-center gap-4">
        <View className="w-10 h-10 rounded-full bg-zinc-50 items-center justify-center border border-zinc-100">
          {icon}
        </View>
        <Text className="text-base font-semibold text-woohl-dark">{title}</Text>
      </View>
      <ChevronRight size={20} color={Colors.zinc[400]} />
    </TouchableOpacity>
  );
}
