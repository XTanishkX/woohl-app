import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Package, MapPin, Wallet, Heart, Bookmark, Users, Coins, HelpCircle, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { totalCo2Saved, referralCredits, woohlCoins, user } = useAppStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-4 border-b border-zinc-100 z-10 flex-row justify-between items-center bg-white/90 backdrop-blur-md">
        <Text className="text-2xl font-black text-woohl-dark tracking-tight">Profile</Text>
        <TouchableOpacity onPress={() => router.push('/settings')} className="w-10 h-10 bg-zinc-50 rounded-full items-center justify-center border border-zinc-200">
          <Settings color="#111827" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        className="bg-zinc-50"
      >
        {/* Profile Header */}
        <View className="px-6 py-8 items-center bg-white border-b border-zinc-100 mb-6">
          <View className="w-24 h-24 bg-woohl-orange/10 rounded-full mb-4 border-4 border-white shadow-xl shadow-zinc-200/50 overflow-hidden">
            <Image 
              source={{ uri: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' }} 
              className="w-full h-full" 
            />
          </View>
          <Text className="text-2xl font-black text-woohl-dark mb-1">{user?.name || 'Aditi Sharma'}</Text>
          <View className="flex-row items-center bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
            <Text className="text-zinc-500 font-bold text-xs">Woohl ID: </Text>
            <Text className="text-woohl-dark font-black text-xs">WHL-9824</Text>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View className="px-5 mb-8">
          <View className="flex-row justify-between gap-4">
            <View className="flex-1 bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm shadow-zinc-200/50 items-center">
              <View className="w-10 h-10 bg-[#F59E0B]/10 rounded-full items-center justify-center mb-2">
                <Coins color="#F59E0B" size={20} />
              </View>
              <Text className="text-xl font-black text-woohl-dark mb-0.5">{woohlCoins}</Text>
              <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Coins</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm shadow-zinc-200/50 items-center">
              <View className="w-10 h-10 bg-[#10B981]/10 rounded-full items-center justify-center mb-2">
                <ShieldCheck color="#10B981" size={20} />
              </View>
              <Text className="text-xl font-black text-woohl-dark mb-0.5">₹{referralCredits}</Text>
              <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Credits</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm shadow-zinc-200/50 items-center">
              <View className="w-10 h-10 bg-[#3B82F6]/10 rounded-full items-center justify-center mb-2">
                <Users color="#3B82F6" size={20} />
              </View>
              <Text className="text-xl font-black text-woohl-dark mb-0.5">14</Text>
              <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Brands</Text>
            </View>
          </View>
        </View>

        {/* Account Settings List */}
        <View className="px-5 mb-6">
          <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3 ml-2">My Account</Text>
          <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm shadow-zinc-200/50 overflow-hidden">
            <ProfileMenuItem icon={<Package size={20} color="#111827" />} title="Orders" subtitle="Track & manage your orders" onPress={() => router.push('/settings/orders')} />
            <ProfileMenuItem icon={<MapPin size={20} color="#111827" />} title="Addresses" subtitle="Manage delivery locations" onPress={() => router.push('/settings/addresses')} />
            <ProfileMenuItem icon={<CreditCard size={20} color="#111827" />} title="Payments" subtitle="Saved cards & UPI" hideBorder onPress={() => router.push('/settings/payments')} />
          </View>
        </View>

        {/* My Activity List */}
        <View className="px-5 mb-6">
          <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3 ml-2">My Activity</Text>
          <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm shadow-zinc-200/50 overflow-hidden">
            <ProfileMenuItem icon={<Heart size={20} color="#FF5A5F" />} title="Wishlist" subtitle="Saved products" onPress={() => router.push('/wishlist')} />
            <ProfileMenuItem icon={<Bookmark size={20} color="#F59E0B" />} title="Saved Reels" subtitle="Videos you loved" onPress={() => router.push('/settings/saved-reels')} />
            <ProfileMenuItem icon={<Users size={20} color="#3B82F6" />} title="Following Brands" subtitle="Startups you support" hideBorder onPress={() => router.push('/settings/following')} />
          </View>
        </View>

        {/* Rewards & Support */}
        <View className="px-5 mb-12">
          <Text className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3 ml-2">Rewards & Support</Text>
          <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm shadow-zinc-200/50 overflow-hidden">
            <ProfileMenuItem icon={<ShieldCheck size={20} color="#10B981" />} title="Referral Program" subtitle="Invite friends, earn credits" value={`₹${referralCredits}`} onPress={() => router.push('/settings/referrals')} />
            <ProfileMenuItem icon={<Coins size={20} color="#F59E0B" />} title="Woohl Coins" subtitle="Earned through purchases" value={woohlCoins.toString()} onPress={() => router.push('/settings/coins')} />
            <ProfileMenuItem icon={<HelpCircle size={20} color="#111827" />} title="Support" subtitle="FAQs & Contact us" hideBorder onPress={() => router.push('/settings/support')} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileMenuItem({ icon, title, subtitle, value, hideBorder, onPress }: { icon: React.ReactNode, title: string, subtitle?: string, value?: string, hideBorder?: boolean, onPress?: () => void }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center justify-between p-5 ${!hideBorder ? 'border-b border-zinc-100' : ''}`}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 rounded-2xl bg-zinc-50 items-center justify-center border border-zinc-100 mr-4">
          {icon}
        </View>
        <View className="flex-1">
          <Text className="text-base font-black text-woohl-dark mb-0.5">{title}</Text>
          {subtitle && <Text className="text-xs font-medium text-zinc-500">{subtitle}</Text>}
        </View>
      </View>
      <View className="flex-row items-center">
        {value && <Text className="text-sm font-black text-woohl-orange mr-3">{value}</Text>}
        <ChevronRight color="#9CA3AF" size={20} />
      </View>
    </TouchableOpacity>
  );
}
