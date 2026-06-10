import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft, CreditCard, Landmark, Plus, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';

export default function PaymentsScreen() {
  const router = useRouter();
  const { paymentMethods, addPaymentMethod } = useAppStore();
  const [isAddingCard, setIsAddingCard] = useState(false);
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Reanimated Flip
  const flipValue = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 1], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  const flipToBack = () => { flipValue.value = withTiming(1, { duration: 500 }); };
  const flipToFront = () => { flipValue.value = withTiming(0, { duration: 500 }); };

  const handleSaveCard = () => {
    if (!cardNumber || !cardName) return;
    addPaymentMethod({
      id: `pm_${Date.now()}`,
      type: 'Card',
      details: `**** **** **** ${cardNumber.slice(-4) || '1234'}`,
      isDefault: false
    });
    setIsAddingCard(false);
    setCardNumber('');
    setCardName('');
    setExpiry('');
    setCvv('');
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 relative">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Payment Methods</Text>
      </View>

      <ScrollView className="flex-1 p-5">
        {!isAddingCard ? (
          <>
            <Text className="text-woohl-dark font-black text-lg mb-4">Saved Cards & UPI</Text>
            {paymentMethods.map(method => (
              <View key={method.id} className="bg-white p-5 rounded-3xl shadow-sm shadow-zinc-200 mb-4 border border-zinc-100 flex-row items-center">
                <View className="w-12 h-12 bg-zinc-50 rounded-full items-center justify-center mr-4 border border-zinc-200">
                  {method.type === 'Card' ? <CreditCard color="#111827" size={20} /> : <Landmark color="#111827" size={20} />}
                </View>
                <View className="flex-1">
                  <Text className="font-black text-woohl-dark text-base mb-1">{method.type === 'UPI' ? 'UPI ID' : 'Credit / Debit Card'}</Text>
                  <Text className="text-zinc-500 font-medium text-sm">{method.details}</Text>
                </View>
                {method.isDefault && (
                  <View className="bg-woohl-green/10 px-3 py-1 rounded-full">
                    <Text className="text-woohl-green font-bold text-[10px] uppercase tracking-widest">Default</Text>
                  </View>
                )}
              </View>
            ))}

            <TouchableOpacity 
              onPress={() => setIsAddingCard(true)}
              className="mt-4 border-2 border-dashed border-zinc-300 rounded-3xl p-6 items-center flex-row justify-center bg-zinc-50"
            >
              <Plus color="#9CA3AF" size={20} className="mr-2" />
              <Text className="text-zinc-500 font-bold">Add New Card</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-woohl-dark font-black text-lg">Add New Card</Text>
              <TouchableOpacity onPress={() => setIsAddingCard(false)}>
                <Text className="text-zinc-500 font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>

            {/* Interactive 3D Card */}
            <View className="w-full h-56 mb-8 relative">
              {/* Front of Card */}
              <Animated.View style={frontAnimatedStyle} className="w-full h-full bg-woohl-dark rounded-3xl p-6 shadow-2xl shadow-woohl-dark/40 justify-between">
                <View className="flex-row justify-between items-center">
                  <CreditCard color="white" size={28} opacity={0.8} />
                  <Text className="text-white font-black italic text-lg opacity-80">VISA</Text>
                </View>
                <View>
                  <Text className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Card Number</Text>
                  <Text className="text-white font-black text-2xl tracking-widest">
                    {cardNumber || '**** **** **** ****'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Card Holder</Text>
                    <Text className="text-white font-bold text-sm">{cardName || 'YOUR NAME'}</Text>
                  </View>
                  <View>
                    <Text className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Expires</Text>
                    <Text className="text-white font-bold text-sm">{expiry || 'MM/YY'}</Text>
                  </View>
                </View>
              </Animated.View>

              {/* Back of Card */}
              <Animated.View style={backAnimatedStyle} className="w-full h-full bg-zinc-800 rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">
                <View className="w-full h-10 bg-black mt-6" />
                <View className="px-6 mt-4">
                  <View className="bg-white/90 h-10 w-full flex-row items-center justify-end px-4 rounded">
                    <Text className="text-black font-black text-lg italic">{cvv || '***'}</Text>
                  </View>
                  <Text className="text-white/40 text-[10px] text-right mt-1">CVV</Text>
                </View>
                <View className="px-6 mt-4 flex-row justify-end">
                  <Text className="text-white/20 font-black italic text-lg">VISA</Text>
                </View>
              </Animated.View>
            </View>

            {/* Input Form */}
            <View className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
              <View className="mb-4">
                <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Card Number</Text>
                <TextInput 
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-woohl-dark"
                  placeholder="0000 0000 0000 0000"
                  keyboardType="numeric"
                  maxLength={19}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  onFocus={flipToFront}
                />
              </View>
              <View className="mb-4">
                <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Card Holder Name</Text>
                <TextInput 
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-woohl-dark"
                  placeholder="John Doe"
                  value={cardName}
                  onChangeText={setCardName}
                  onFocus={flipToFront}
                />
              </View>
              <View className="flex-row gap-4 mb-6">
                <View className="flex-1">
                  <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Expiry Date</Text>
                  <TextInput 
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-woohl-dark"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiry}
                    onChangeText={setExpiry}
                    onFocus={flipToFront}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">CVV</Text>
                  <TextInput 
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-woohl-dark"
                    placeholder="123"
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={3}
                    value={cvv}
                    onChangeText={setCvv}
                    onFocus={flipToBack}
                    onBlur={flipToFront}
                  />
                </View>
              </View>

              <TouchableOpacity 
                onPress={handleSaveCard}
                className="w-full bg-woohl-dark rounded-xl py-4 items-center shadow-lg shadow-black/20"
              >
                <Text className="text-white font-black uppercase tracking-widest text-sm">Save Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
