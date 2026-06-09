import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Package, MapPin, Wallet, Leaf, TrendingUp, BarChart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { totalCo2Saved, referralBalance } = useAppStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 border-b border-zinc-100 z-10 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-woohl-dark tracking-tight">Profile</Text>
        <TouchableOpacity>
          <Settings color="#0A1628" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Profile Header */}
        <View className="px-6 py-8 items-center border-b border-zinc-100">
          <View className="w-24 h-24 bg-woohl-orange/10 rounded-full mb-4 border-2 border-woohl-orange/20 overflow-hidden">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' }} 
              className="w-full h-full" 
            />
          </View>
          <Text className="text-2xl font-bold text-woohl-dark">Aditi Sharma</Text>
          <Text className="text-zinc-500 font-medium">Gen-Z Shopper ✨</Text>
        </View>

        {/* Eco Impact Tracker */}
        <View className="px-5 mt-8">
          <View className="flex-row items-center mb-4">
            <Leaf color="#10B981" size={20} className="mr-2" />
            <Text className="text-lg font-bold text-woohl-dark">Eco Impact</Text>
          </View>
          <View className="bg-green-50 border border-green-100 rounded-3xl p-6 items-center shadow-sm shadow-green-100/50">
            {/* CSS-based Fake Progress Ring */}
            <View className="w-32 h-32 rounded-full border-[12px] border-green-200 justify-center items-center relative mb-4">
              {/* Highlight part of ring */}
              <View className="absolute inset-[-12px] border-[12px] border-woohl-green border-t-transparent border-l-transparent rounded-full" style={{ transform: [{ rotate: '45deg' }] }} />
              <Text className="text-2xl font-black text-woohl-green">{totalCo2Saved.toFixed(1)}</Text>
              <Text className="text-[10px] font-bold text-green-700 uppercase tracking-widest mt-0.5">KG CO2</Text>
            </View>
            <Text className="text-woohl-dark font-bold text-base mb-1">Equivalent to 1 tree planted! 🌳</Text>
            <Text className="text-green-700/80 text-xs text-center">Your mindful purchases are saving the planet.</Text>
          </View>
        </View>

        {/* Spending Analytics */}
        <View className="px-5 mt-8">
          <View className="flex-row items-center mb-4">
            <BarChart color="#1D4ED8" size={20} className="mr-2" />
            <Text className="text-lg font-bold text-woohl-dark">My Spending</Text>
          </View>
          <View className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm shadow-zinc-200/50">
            <Text className="text-zinc-500 font-bold text-xs uppercase tracking-wider mb-4">Impulse vs Essentials</Text>
            
            {/* CSS Bar Chart */}
            <View className="flex-row items-end h-32 gap-3 mb-3 border-b border-zinc-100 pb-2">
              <View className="flex-1 items-center">
                <View className="w-full bg-woohl-red/20 rounded-t-md relative flex-1 justify-end">
                  <View className="w-full bg-woohl-red rounded-t-md" style={{ height: '70%' }} />
                </View>
                <Text className="text-[10px] text-zinc-500 font-bold mt-2">Week 1</Text>
              </View>
              <View className="flex-1 items-center">
                <View className="w-full bg-woohl-green/20 rounded-t-md relative flex-1 justify-end">
                  <View className="w-full bg-woohl-green rounded-t-md" style={{ height: '40%' }} />
                </View>
                <Text className="text-[10px] text-zinc-500 font-bold mt-2">Week 2</Text>
              </View>
              <View className="flex-1 items-center">
                <View className="w-full bg-woohl-green/20 rounded-t-md relative flex-1 justify-end">
                  <View className="w-full bg-woohl-green rounded-t-md" style={{ height: '80%' }} />
                </View>
                <Text className="text-[10px] text-zinc-500 font-bold mt-2">Week 3</Text>
              </View>
              <View className="flex-1 items-center">
                <View className="w-full bg-woohl-red/20 rounded-t-md relative flex-1 justify-end">
                  <View className="w-full bg-woohl-red rounded-t-md" style={{ height: '20%' }} />
                </View>
                <Text className="text-[10px] text-zinc-500 font-bold mt-2">Week 4</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-center gap-4 mt-2">
              <View className="flex-row items-center"><View className="w-3 h-3 rounded-full bg-woohl-red mr-1" /><Text className="text-xs text-zinc-600">Impulse</Text></View>
              <View className="flex-row items-center"><View className="w-3 h-3 rounded-full bg-woohl-green mr-1" /><Text className="text-xs text-zinc-600">Mindful</Text></View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-8 px-5 mb-12">
          <Text className="text-lg font-bold text-woohl-dark mb-4 px-2">Account</Text>
          <View className="bg-white rounded-2xl border border-zinc-200 p-2 shadow-sm">
            <ProfileMenuItem icon={<Wallet size={20} color="#F34F17" />} title="Referral Wallet" value={`₹${referralBalance}`} onPress={() => router.push('/wallet')} />
            <ProfileMenuItem icon={<Package size={20} color="#0A1628" />} title="My Orders" />
            <ProfileMenuItem icon={<TrendingUp size={20} color="#0A1628" />} title="Smart Savings AI" value="₹4,500 Saved" hideBorder />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileMenuItem({ icon, title, value, hideBorder, onPress }: { icon: React.ReactNode, title: string, value?: string, hideBorder?: boolean, onPress?: () => void }) {
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
      {value && <Text className="text-sm font-bold text-woohl-orange">{value}</Text>}
    </TouchableOpacity>
  );
}
