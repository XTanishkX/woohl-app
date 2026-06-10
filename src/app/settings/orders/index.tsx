import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Package, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../../store/useAppStore';

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useAppStore();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">My Orders</Text>
      </View>
      <ScrollView className="flex-1 p-5">
        {orders.map(order => (
          <TouchableOpacity 
            key={order.id} 
            onPress={() => router.push(`/settings/orders/${order.id}`)}
            className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100 mb-4"
          >
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-zinc-100">
              <View>
                <Text className="text-zinc-500 font-bold text-xs mb-1">Order {order.id}</Text>
                <Text className="text-woohl-dark font-black">{order.date}</Text>
              </View>
              <View className="bg-zinc-100 px-3 py-1.5 rounded-full">
                <Text className="text-woohl-dark font-bold text-[10px] uppercase tracking-widest">{order.status}</Text>
              </View>
            </View>
            {order.items.map(item => (
              <View key={item.id} className="flex-row items-center mb-4">
                <Image source={{ uri: item.product.images[0] }} className="w-16 h-16 rounded-xl bg-zinc-100 mr-4" />
                <View className="flex-1">
                  <Text className="text-woohl-dark font-bold text-sm mb-1">{item.product.name}</Text>
                  <Text className="text-zinc-500 text-xs">Qty: {item.quantity}</Text>
                </View>
              </View>
            ))}
            <View className="flex-row items-center justify-between pt-2">
              <Text className="text-zinc-500 font-bold">Total</Text>
              <View className="flex-row items-center">
                <Text className="text-woohl-dark font-black text-lg mr-2">₹{order.totalAmount}</Text>
                <ChevronRight color="#9CA3AF" size={20} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {orders.length === 0 && (
          <View className="items-center justify-center mt-20">
            <Package color="#9CA3AF" size={48} className="mb-4" />
            <Text className="text-zinc-500 font-bold">No orders yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
