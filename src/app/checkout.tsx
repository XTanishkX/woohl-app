import React, { useState, useRef, useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { ArrowLeft, MapPin, CreditCard, Wallet, Landmark, Truck, CheckCircle, FileText, ShieldCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/useAppStore';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

export default function CheckoutScreen() {
  const router = useRouter();
  const { addresses, getCartTotal } = useAppStore();
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id);

  const addressSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
  const cartTotal = getCartTotal() || 3498; // Fallback if cart empty

  const handlePlaceOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/order-success');
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 relative">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center z-10 shadow-sm shadow-zinc-100 pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Checkout</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Trust Banner */}
        <View className="flex-row items-center justify-center bg-woohl-green/10 p-3 rounded-2xl border border-woohl-green/20 mb-6">
          <ShieldCheck color="#10B981" size={16} className="mr-2" />
          <Text className="text-woohl-green font-bold text-xs uppercase tracking-widest">100% Secure Transaction</Text>
        </View>

        {/* Address */}
        <View className="bg-white p-5 rounded-3xl shadow-xl shadow-zinc-200/50 mb-6 border border-zinc-100">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-black text-woohl-dark uppercase tracking-widest">Shipping Address</Text>
            <TouchableOpacity onPress={() => addressSheetRef.current?.expand()}>
              <Text className="text-woohl-orange font-bold text-xs uppercase tracking-widest">Change</Text>
            </TouchableOpacity>
          </View>
          {selectedAddress ? (
            <View className="flex-row items-start">
              <View className="mt-1 mr-3 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center border border-zinc-200">
                <MapPin color="#111827" size={18} />
              </View>
              <View className="flex-1">
                <Text className="font-black text-woohl-dark text-base mb-1">Current User <Text className="font-bold text-zinc-400 text-xs">({selectedAddress.type})</Text></Text>
                <Text className="text-zinc-500 font-medium text-xs leading-relaxed mb-2">{selectedAddress.fullAddress}</Text>
              </View>
            </View>
          ) : (
            <Text className="text-zinc-500 text-sm">No address found. Please add one.</Text>
          )}
        </View>

        {/* Delivery Options */}
        <View className="bg-white p-5 rounded-3xl shadow-xl shadow-zinc-200/50 mb-6 border border-zinc-100">
          <Text className="text-sm font-black text-woohl-dark uppercase tracking-widest mb-4">Delivery Speed</Text>
          <TouchableOpacity className="flex-row items-center border-2 border-woohl-orange bg-woohl-orange/5 p-4 rounded-2xl mb-3">
            <View className="w-10 h-10 bg-woohl-orange/10 rounded-full items-center justify-center mr-3">
              <Truck color="#FF5A5F" size={20} />
            </View>
            <View className="flex-1">
              <Text className="font-black text-woohl-orange text-sm mb-1">Hyperlocal Express</Text>
              <Text className="text-zinc-500 font-medium text-xs">Arrives in 45 minutes</Text>
            </View>
            <View className="w-5 h-5 rounded-full border-2 border-woohl-orange items-center justify-center">
              <View className="w-2.5 h-2.5 bg-woohl-orange rounded-full" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Payment Options */}
        <View className="bg-white p-5 rounded-3xl shadow-xl shadow-zinc-200/50 mb-6 border border-zinc-100">
          <Text className="text-sm font-black text-woohl-dark uppercase tracking-widest mb-4">Payment Method</Text>
          
          {[
            { id: 'UPI', title: 'UPI Apps', desc: 'Google Pay, PhonePe, Paytm', icon: <Landmark color="#111827" size={20} /> },
            { id: 'Card', title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: <CreditCard color="#111827" size={20} /> },
            { id: 'COD', title: 'Cash on Delivery', desc: 'Pay ₹20 extra', icon: <Truck color="#111827" size={20} /> },
          ].map(method => (
            <TouchableOpacity 
              key={method.id}
              onPress={() => setPaymentMethod(method.id)}
              className={`flex-row items-center p-4 rounded-2xl mb-3 border-2 ${paymentMethod === method.id ? 'border-woohl-dark bg-zinc-50' : 'border-transparent bg-white'}`}
            >
              <View className="w-10 h-10 bg-zinc-100 rounded-full items-center justify-center mr-3">
                {method.icon}
              </View>
              <View className="flex-1">
                <Text className={`font-black text-sm mb-0.5 ${paymentMethod === method.id ? 'text-woohl-dark' : 'text-zinc-600'}`}>{method.title}</Text>
                <Text className="text-zinc-500 font-medium text-[10px]">{method.desc}</Text>
              </View>
              <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${paymentMethod === method.id ? 'border-woohl-dark' : 'border-zinc-300'}`}>
                {paymentMethod === method.id && <View className="w-2.5 h-2.5 bg-woohl-dark rounded-full" />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Summary */}
        <View className="bg-white border border-zinc-100 p-6 rounded-3xl mb-8 shadow-xl shadow-zinc-200/50">
          <Text className="font-black text-lg text-woohl-dark mb-5 tracking-tight">Order Summary</Text>
          <View className="flex-row justify-between mb-3">
            <Text className="text-zinc-500 font-bold text-sm">Item Total</Text>
            <Text className="text-woohl-dark font-black text-sm">₹{cartTotal}</Text>
          </View>
          <View className="flex-row justify-between mb-5">
            <Text className="text-zinc-500 font-bold text-sm">Delivery charge</Text>
            <Text className="text-woohl-green font-black text-sm">FREE</Text>
          </View>
          <View className="h-[1px] bg-zinc-100 w-full mb-5" />
          <View className="flex-row justify-between items-center mb-2 bg-zinc-50 p-4 rounded-xl">
            <Text className="font-black text-woohl-dark text-lg uppercase tracking-widest">Grand Total</Text>
            <Text className="font-black text-woohl-dark text-2xl">₹{cartTotal}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <TouchableOpacity 
          className="w-full h-14 bg-woohl-orange rounded-2xl items-center justify-center shadow-lg shadow-woohl-orange/40"
          onPress={handlePlaceOrder}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-black text-sm uppercase tracking-widest">Place Order • ₹{cartTotal}</Text>
          )}
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={addressSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#fff', borderRadius: 24 }}
        handleIndicatorStyle={{ backgroundColor: '#ccc' }}
      >
        <View className="flex-1 bg-white p-5">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-lg font-black text-woohl-dark">Select Address</Text>
            <TouchableOpacity onPress={() => addressSheetRef.current?.close()}>
              <Text className="text-zinc-400 font-bold">Close</Text>
            </TouchableOpacity>
          </View>
          <BottomSheetScrollView>
            {addresses.map(address => (
              <TouchableOpacity 
                key={address.id}
                onPress={() => {
                  setSelectedAddressId(address.id);
                  addressSheetRef.current?.close();
                }}
                className={`p-4 rounded-2xl border-2 mb-3 ${selectedAddressId === address.id ? 'border-woohl-orange bg-woohl-orange/5' : 'border-zinc-200 bg-white'}`}
              >
                <View className="flex-row items-center mb-2">
                  <MapPin color={selectedAddressId === address.id ? "#FF5A5F" : "#111827"} size={16} className="mr-2" />
                  <Text className="font-bold text-woohl-dark">{address.type}</Text>
                  {address.isDefault && (
                    <View className="ml-2 bg-zinc-100 px-2 py-0.5 rounded">
                      <Text className="text-[10px] font-bold text-zinc-500 uppercase">Default</Text>
                    </View>
                  )}
                </View>
                <Text className="text-zinc-600 text-sm">{address.fullAddress}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              onPress={() => {
                addressSheetRef.current?.close();
                router.push('/settings/addresses');
              }}
              className="mt-4 border border-zinc-200 rounded-xl p-4 items-center"
            >
              <Text className="text-woohl-dark font-bold text-sm">Manage Addresses</Text>
            </TouchableOpacity>
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
