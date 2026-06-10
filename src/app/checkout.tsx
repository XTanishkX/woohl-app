import React, { useState, useRef, useMemo, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import { ArrowLeft, MapPin, CreditCard, Landmark, Truck, ShieldCheck, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/useAppStore';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolation, withTiming } from 'react-native-reanimated';

export default function CheckoutScreen() {
  const router = useRouter();
  const { addresses, getCartTotal, clearCart } = useAppStore();
  const [activeStep, setActiveStep] = useState(1);
  const [deliverySpeed, setDeliverySpeed] = useState('Standard');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id);

  const addressSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
  const itemTotal = getCartTotal() || 3498;
  const deliveryFee = deliverySpeed === 'Hyperlocal' ? 99 : 0;
  const cartTotal = itemTotal + deliveryFee;

  const cardRotation = useSharedValue(0);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      router.push('/order-success');
    }, 2000);
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(cardRotation.value, [0, 180], [0, 180], Extrapolation.CLAMP);
    return { transform: [{ rotateY: `${rotateY}deg` }], backfaceVisibility: 'hidden' as const };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(cardRotation.value, [0, 180], [180, 360], Extrapolation.CLAMP);
    return { transform: [{ rotateY: `${rotateY}deg` }], position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, backfaceVisibility: 'hidden' as const };
  });

  const AccordionHeader = ({ step, title, isCompleted }: any) => (
    <View className="flex-row justify-between items-center py-4">
      <View className="flex-row items-center">
        <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${activeStep === step ? 'bg-woohl-orange' : isCompleted ? 'bg-woohl-green' : 'bg-zinc-200'}`}>
          {isCompleted ? <CheckCircle color="white" size={16} /> : <Text className={`font-black text-sm ${activeStep === step ? 'text-white' : 'text-zinc-500'}`}>{step}</Text>}
        </View>
        <Text className={`font-black text-lg ${activeStep === step ? 'text-woohl-dark' : 'text-zinc-500'}`}>{title}</Text>
      </View>
      {isCompleted && activeStep !== step && (
        <TouchableOpacity onPress={() => setActiveStep(step)}>
          <Text className="text-woohl-orange font-bold text-sm">Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 relative">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center z-10 shadow-sm shadow-zinc-100 pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Checkout</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-center bg-woohl-green/10 p-3 rounded-2xl border border-woohl-green/20 mb-6">
          <ShieldCheck color="#10B981" size={16} className="mr-2" />
          <Text className="text-woohl-green font-bold text-xs uppercase tracking-widest">100% Secure Transaction</Text>
        </View>

        {/* Step 1: Address */}
        <View className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 mb-4 border border-zinc-100 px-5">
          <AccordionHeader step={1} title="Shipping Address" isCompleted={activeStep > 1} />
          {activeStep === 1 && (
            <View className="pb-5">
              {selectedAddress ? (
                <View className="mb-4">
                  <View className="flex-row items-start mb-4">
                    <View className="mt-1 mr-3 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center border border-zinc-200">
                      <MapPin color="#111827" size={18} />
                    </View>
                    <View className="flex-1">
                      <Text className="font-black text-woohl-dark text-base mb-1">Current User <Text className="font-bold text-zinc-400 text-xs">({selectedAddress.type})</Text></Text>
                      <Text className="text-zinc-500 font-medium text-xs leading-relaxed mb-2">{selectedAddress.fullAddress}</Text>
                    </View>
                  </View>
                  <View className="w-full h-32 bg-zinc-200 rounded-2xl overflow-hidden mb-4 relative">
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800' }} className="w-full h-full opacity-60" />
                    <View className="absolute inset-0 items-center justify-center">
                      <View className="w-10 h-10 bg-woohl-orange/20 rounded-full items-center justify-center animate-pulse">
                        <MapPin color="#FF6A00" size={24} />
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <Text className="text-zinc-500 text-sm mb-4">No address found. Please add one.</Text>
              )}
              <View className="flex-row justify-between">
                <TouchableOpacity onPress={() => addressSheetRef.current?.expand()} className="bg-zinc-100 py-3 px-6 rounded-xl">
                  <Text className="text-woohl-dark font-bold text-sm">Change</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveStep(2)} className="bg-woohl-dark py-3 px-8 rounded-xl">
                  <Text className="text-white font-bold text-sm">Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Step 2: Delivery Speed */}
        <View className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 mb-4 border border-zinc-100 px-5">
          <AccordionHeader step={2} title="Delivery Speed" isCompleted={activeStep > 2} />
          {activeStep === 2 && (
            <View className="pb-5">
              <TouchableOpacity onPress={() => setDeliverySpeed('Standard')} className={`flex-row items-center border-2 p-4 rounded-2xl mb-3 ${deliverySpeed === 'Standard' ? 'border-woohl-dark bg-zinc-50' : 'border-zinc-100'}`}>
                <View className="flex-1">
                  <Text className={`font-black text-sm mb-1 ${deliverySpeed === 'Standard' ? 'text-woohl-dark' : 'text-zinc-600'}`}>Standard Delivery</Text>
                  <Text className="text-zinc-500 font-medium text-xs">Arrives in 3-5 days • <Text className="text-woohl-green font-bold">FREE</Text></Text>
                </View>
                {deliverySpeed === 'Standard' && <CheckCircle color="#111827" size={20} />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDeliverySpeed('Hyperlocal')} className={`flex-row items-center border-2 p-4 rounded-2xl mb-4 ${deliverySpeed === 'Hyperlocal' ? 'border-woohl-orange bg-woohl-orange/5' : 'border-zinc-100'}`}>
                <View className="flex-1">
                  <Text className={`font-black text-sm mb-1 ${deliverySpeed === 'Hyperlocal' ? 'text-woohl-orange' : 'text-zinc-600'}`}>Hyperlocal Express</Text>
                  <Text className="text-zinc-500 font-medium text-xs">Arrives in 45 minutes • <Text className="text-woohl-orange font-bold">+₹99</Text></Text>
                </View>
                {deliverySpeed === 'Hyperlocal' && <CheckCircle color="#FF6A00" size={20} />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveStep(3)} className="bg-woohl-dark py-3 rounded-xl items-center w-full">
                <Text className="text-white font-bold text-sm">Continue to Payment</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Step 3: Payment */}
        <View className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 mb-4 border border-zinc-100 px-5">
          <AccordionHeader step={3} title="Payment Method" isCompleted={false} />
          {activeStep === 3 && (
            <View className="pb-5">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-5 px-5">
                {['UPI', 'Card', 'COD'].map(method => (
                  <TouchableOpacity 
                    key={method}
                    onPress={() => setPaymentMethod(method)}
                    className={`px-5 py-3 rounded-xl border-2 mr-3 ${paymentMethod === method ? 'border-woohl-orange bg-woohl-orange/5' : 'border-zinc-100 bg-white'}`}
                  >
                    <Text className={`font-bold text-sm ${paymentMethod === method ? 'text-woohl-orange' : 'text-zinc-500'}`}>{method === 'Card' ? 'Credit Card' : method}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {paymentMethod === 'Card' && (
                <View className="mb-4 perspective-[1000px]">
                  <View className="relative w-full h-48 mb-6">
                    {/* Front of Card */}
                    <Animated.View style={[frontStyle]} className="absolute inset-0 bg-[#0A1628] rounded-2xl p-5 justify-between shadow-2xl shadow-black/40">
                      <View className="flex-row justify-between items-center">
                        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' }} className="w-12 h-8" resizeMode="contain" />
                        <CreditCard color="white" size={24} opacity={0.5} />
                      </View>
                      <View>
                        <Text className="text-white/80 font-mono text-xl tracking-widest mb-2">**** **** **** 4281</Text>
                        <View className="flex-row justify-between">
                          <Text className="text-white font-bold uppercase tracking-widest">Cardholder Name</Text>
                          <Text className="text-white font-bold">12/28</Text>
                        </View>
                      </View>
                    </Animated.View>
                    {/* Back of Card */}
                    <Animated.View style={[backStyle]} className="absolute inset-0 bg-[#0A1628] rounded-2xl shadow-2xl shadow-black/40">
                      <View className="w-full h-10 bg-black mt-6" />
                      <View className="px-5 mt-4">
                        <View className="w-full h-8 bg-white flex-row justify-end items-center px-3">
                          <Text className="font-mono text-black font-bold">***</Text>
                        </View>
                      </View>
                    </Animated.View>
                  </View>
                  
                  <View className="flex-row gap-3">
                    <TextInput 
                      placeholder="Card Number" 
                      className="flex-1 bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl"
                      onFocus={() => cardRotation.value = withSpring(0)}
                    />
                    <TextInput 
                      placeholder="CVV" 
                      secureTextEntry
                      maxLength={3}
                      className="w-24 bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl"
                      onFocus={() => cardRotation.value = withSpring(180)}
                      onBlur={() => cardRotation.value = withSpring(0)}
                    />
                  </View>
                </View>
              )}

              {paymentMethod === 'UPI' && (
                <View className="mb-4 items-center">
                  <View className="w-48 h-48 bg-zinc-50 border-2 border-zinc-200 rounded-2xl items-center justify-center relative overflow-hidden mb-4">
                     <View className="absolute inset-0 bg-woohl-orange/10 animate-pulse" />
                     <Landmark color="#111827" size={48} opacity={0.2} />
                     <View className="absolute bg-white p-2 rounded shadow">
                       <Text className="font-black text-xs">QR MOCK</Text>
                     </View>
                  </View>
                  <Text className="text-zinc-500 font-medium text-sm text-center">Scan with any UPI app to pay</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Floating Summary Card inside scroll */}
        <View className="bg-woohl-dark p-6 rounded-3xl mt-4 shadow-xl shadow-black/30">
          <Text className="font-black text-lg text-white mb-4">Order Summary</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-white/60 font-bold text-sm">Item Total</Text>
            <Text className="text-white font-black text-sm">₹{itemTotal}</Text>
          </View>
          <View className="flex-row justify-between mb-4">
            <Text className="text-white/60 font-bold text-sm">Delivery Fee</Text>
            <Text className="text-white font-black text-sm">₹{deliveryFee}</Text>
          </View>
          <View className="h-[1px] bg-white/10 w-full mb-4" />
          <View className="flex-row justify-between items-center">
            <Text className="font-black text-white text-lg uppercase tracking-widest">Grand Total</Text>
            <Text className="font-black text-woohl-orange text-2xl">₹{cartTotal}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <TouchableOpacity 
          className="w-full h-14 bg-woohl-orange rounded-2xl items-center justify-center shadow-lg shadow-woohl-orange/40"
          onPress={handlePlaceOrder}
          disabled={isLoading || activeStep !== 3}
          style={{ opacity: activeStep === 3 ? 1 : 0.5 }}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-black text-sm uppercase tracking-widest">Pay & Place Order • ₹{cartTotal}</Text>
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
                  <MapPin color={selectedAddressId === address.id ? "#FF6A00" : "#111827"} size={16} className="mr-2" />
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
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
