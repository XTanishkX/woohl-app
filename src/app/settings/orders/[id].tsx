import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Package, MapPin, CreditCard, Download } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppStore } from '../../../store/useAppStore';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { orders } = useAppStore();
  
  const order = orders.find(o => o.id === id) || orders[0];

  if (!order) return null;

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center justify-between pt-12">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
            <ArrowLeft color="#111827" size={20} />
          </TouchableOpacity>
          <Text className="text-xl font-black text-woohl-dark tracking-tight">Order Details</Text>
        </View>
        <TouchableOpacity>
          <Download color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-5">
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100 mb-6">
          <Text className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">Order ID</Text>
          <Text className="text-woohl-dark font-black text-lg mb-4">{order.id}</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-zinc-500 text-sm">Placed on</Text>
            <Text className="text-woohl-dark font-bold text-sm">{order.date}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-500 text-sm">Status</Text>
            <Text className="text-woohl-green font-black text-sm uppercase">{order.status}</Text>
          </View>
        </View>

        <Text className="text-woohl-dark font-black text-lg mb-4 ml-2">Items</Text>
        <View className="bg-white rounded-3xl shadow-sm border border-zinc-100 mb-6 p-5">
          {order.items.map(item => (
            <View key={item.id} className="flex-row mb-4 pb-4 border-b border-zinc-100 last:border-b-0 last:pb-0 last:mb-0">
              <Image source={{ uri: item.product.images[0] }} className="w-20 h-24 rounded-xl bg-zinc-100 mr-4" />
              <View className="flex-1 justify-center">
                <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.product.brandName}</Text>
                <Text className="text-woohl-dark font-bold text-sm mb-2">{item.product.name}</Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-zinc-500 text-xs font-bold">Qty: {item.quantity}</Text>
                  <Text className="text-woohl-dark font-black">₹{item.product.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100 mb-10">
          <View className="flex-row items-center mb-4">
            <MapPin color="#111827" size={20} className="mr-3" />
            <Text className="text-woohl-dark font-black text-base">Delivery Address</Text>
          </View>
          <Text className="text-zinc-600 text-sm leading-relaxed mb-6">{order.shippingAddress.fullAddress}</Text>

          <View className="flex-row items-center mb-4 border-t border-zinc-100 pt-6">
            <CreditCard color="#111827" size={20} className="mr-3" />
            <Text className="text-woohl-dark font-black text-base">Payment Details</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-zinc-500 text-sm">Method</Text>
            <Text className="text-woohl-dark font-bold text-sm">{order.paymentMethod}</Text>
          </View>
          <View className="flex-row justify-between mb-4">
            <Text className="text-zinc-500 text-sm">Total Amount</Text>
            <Text className="text-woohl-dark font-black text-sm">₹{order.totalAmount}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
