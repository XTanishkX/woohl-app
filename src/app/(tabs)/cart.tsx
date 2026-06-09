import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus, ShieldCheck } from 'lucide-react-native';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../../components/ui/Button';

export default function CartScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();

  const total = getCartTotal();
  const handlingCharge = items.length > 0 ? 27 : 0;
  const deliveryCharge = items.length > 0 ? 40 : 0;
  const grandTotal = total + handlingCharge + deliveryCharge;
  const saving = 200; // Mock saving

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-3 flex-row items-center border-b border-zinc-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="#18181b" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-woohl-dark tracking-tight">Your Cart</Text>
      </View>
      
      {items.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-24 h-24 bg-woohl-orange/10 rounded-full items-center justify-center mb-6">
            <Text className="text-4xl">🛒</Text>
          </View>
          <Text className="text-woohl-dark font-bold text-xl mb-2">Your cart is empty</Text>
          <Text className="text-zinc-500 text-center mb-8">Looks like you haven't added anything to your cart yet.</Text>
          <Button 
            label="Start Shopping" 
            onPress={() => router.push('/(tabs)/explore')}
            className="w-full max-w-[200px]"
            variant="primary"
          />
        </View>
      ) : (
        <>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="px-5 pt-6 pb-20">
              {/* Cart Items */}
              {items.map((item) => (
                <View key={item.id} className="flex-row bg-white border border-zinc-200 rounded-xl p-3 mb-4 shadow-sm shadow-zinc-100">
                  <View className="w-20 h-24 bg-zinc-100 rounded-lg overflow-hidden mr-3">
                    <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <View className="flex-1 justify-between">
                    <View>
                      <Text className="text-woohl-dark font-semibold text-sm leading-tight mb-1" numberOfLines={2}>{item.title}</Text>
                      <Text className="text-woohl-dark font-bold text-base mb-1">₹{item.price}</Text>
                      {/* Color dots (mock) */}
                      <View className="flex-row gap-1 mb-2">
                        <View className="w-3 h-3 rounded-full bg-zinc-400 border border-zinc-200" />
                        <Text className="text-xs text-zinc-400">Color</Text>
                      </View>
                    </View>
                    
                    {/* Quantity Selector */}
                    <View className="flex-row">
                      <View className="flex-row items-center border border-zinc-200 rounded-full bg-zinc-50">
                        <TouchableOpacity 
                          onPress={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                          className="px-3 py-1 items-center justify-center"
                        >
                          <Minus color="#52525b" size={14} />
                        </TouchableOpacity>
                        <Text className="text-woohl-dark font-semibold w-4 text-center text-sm">{item.quantity}</Text>
                        <TouchableOpacity 
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 items-center justify-center"
                        >
                          <Plus color="#52525b" size={14} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}

              {/* Delivery Partner Safety Banner */}
              <View className="flex-row items-center bg-zinc-50 border border-zinc-200 rounded-xl p-3 mb-6">
                <ShieldCheck color="#22c55e" size={20} className="mr-3" />
                <View>
                  <Text className="text-woohl-dark font-semibold text-xs">Delivery partner safety</Text>
                  <Text className="text-zinc-500 text-[10px]">Learn how we ensure their safety</Text>
                </View>
              </View>
              
              {/* Bill Details */}
              <View className="bg-woohl-orange/5 p-4 rounded-2xl mb-4">
                <Text className="font-bold text-sm text-woohl-dark mb-4">Bill summary</Text>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-zinc-500 text-xs font-medium">Item Total & GST</Text>
                  <Text className="text-woohl-dark text-xs font-medium">₹{total}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-zinc-500 text-xs font-medium">Handling charge</Text>
                  <Text className="text-woohl-dark text-xs font-medium">₹{handlingCharge}</Text>
                </View>
                <View className="flex-row justify-between mb-3">
                  <Text className="text-zinc-500 text-xs font-medium">Delivery charge</Text>
                  <Text className="text-woohl-dark text-xs font-medium">₹{deliveryCharge}</Text>
                </View>
                <View className="h-[1px] bg-zinc-200 w-full mb-3" />
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-bold text-woohl-dark text-sm">To pay</Text>
                  <Text className="font-bold text-woohl-dark text-sm">₹{grandTotal}</Text>
                </View>
                <View className="flex-row justify-end">
                  <View className="bg-green-100 px-2 py-0.5 rounded">
                    <Text className="text-green-600 text-[10px] font-bold">Saving ₹{saving}</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Sticky Bottom Bar */}
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-5 py-4 pb-8 flex-row justify-between items-center">
            <View>
              <Text className="text-xs font-medium text-zinc-500 mb-1">To pay</Text>
              <Text className="text-xl font-bold text-woohl-dark">₹{grandTotal}</Text>
            </View>
            <Button 
              variant="primary" 
              label="Pay online" 
              className="w-48 bg-woohl-orange/10 border border-transparent shadow-none"
              onPress={() => router.push('/checkout')}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
