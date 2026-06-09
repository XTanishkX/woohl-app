import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, Wallet, CheckCircle2 } from 'lucide-react-native';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function CheckoutScreen() {
  const router = useRouter();
  const { getCartTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);

  const total = getCartTotal();

  const handlePay = () => {
    // Mock payment process
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-woohl-offwhite justify-center items-center px-6">
        <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-6">
          <CheckCircle2 color="#22c55e" size={48} />
        </View>
        <Text className="text-3xl font-bold text-woohl-dark mb-2 text-center">Order Confirmed!</Text>
        <Text className="text-zinc-500 text-center mb-8">
          Thank you for shopping on Woohl. Your order is being processed and you will receive a tracking link shortly.
        </Text>
        <Button 
          label="Back to Home" 
          onPress={() => {
            setIsSuccess(false);
            router.replace('/(tabs)');
          }}
          className="w-full"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-woohl-offwhite">
      <View className="px-4 py-3 flex-row items-center border-b border-zinc-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <ArrowLeft color="#18181b" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-woohl-dark">Checkout</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-bold text-woohl-dark mb-4">Shipping Address</Text>
        <View className="bg-white p-5 rounded-2xl border border-zinc-100 mb-6 shadow-sm shadow-zinc-200">
          <Text className="font-bold text-zinc-900 mb-1">Rohan Sharma</Text>
          <Text className="text-zinc-500 mb-2">123 Tech Park, Block C, HSR Layout{'\n'}Bangalore, Karnataka 560102</Text>
          <TouchableOpacity>
            <Text className="text-woohl-orange font-semibold text-sm">Change Address</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold text-woohl-dark mb-4">Payment Method</Text>
        
        <TouchableOpacity 
          onPress={() => setPaymentMethod('card')}
          className={`flex-row items-center p-4 rounded-2xl mb-3 border ${paymentMethod === 'card' ? 'border-woohl-orange bg-woohl-orange/5' : 'border-zinc-200 bg-white'}`}
        >
          <CreditCard color={paymentMethod === 'card' ? '#FF6A00' : '#52525b'} size={24} className="mr-3" />
          <View className="flex-1">
            <Text className={`font-semibold ${paymentMethod === 'card' ? 'text-woohl-orange' : 'text-zinc-900'}`}>Credit / Debit Card</Text>
          </View>
          <View className={`w-5 h-5 rounded-full border items-center justify-center ${paymentMethod === 'card' ? 'border-woohl-orange' : 'border-zinc-300'}`}>
            {paymentMethod === 'card' && <View className="w-3 h-3 rounded-full bg-woohl-orange" />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setPaymentMethod('upi')}
          className={`flex-row items-center p-4 rounded-2xl mb-6 border ${paymentMethod === 'upi' ? 'border-woohl-orange bg-woohl-orange/5' : 'border-zinc-200 bg-white'}`}
        >
          <Wallet color={paymentMethod === 'upi' ? '#FF6A00' : '#52525b'} size={24} className="mr-3" />
          <View className="flex-1">
            <Text className={`font-semibold ${paymentMethod === 'upi' ? 'text-woohl-orange' : 'text-zinc-900'}`}>UPI</Text>
            <Text className="text-zinc-500 text-xs mt-0.5">Google Pay, PhonePe, Paytm</Text>
          </View>
          <View className={`w-5 h-5 rounded-full border items-center justify-center ${paymentMethod === 'upi' ? 'border-woohl-orange' : 'border-zinc-300'}`}>
            {paymentMethod === 'upi' && <View className="w-3 h-3 rounded-full bg-woohl-orange" />}
          </View>
        </TouchableOpacity>

        <View className="bg-white p-5 rounded-2xl border border-zinc-100 mb-8 shadow-sm shadow-zinc-200">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-zinc-500 font-medium">Total Amount</Text>
            <Text className="font-bold text-woohl-dark text-xl">₹{total}</Text>
          </View>
        </View>

      </ScrollView>

      <View className="p-6 bg-white border-t border-zinc-100 pb-8">
        <Button 
          label={`Pay ₹${total}`} 
          onPress={handlePay}
          className="w-full"
        />
      </View>
    </SafeAreaView>
  );
}
