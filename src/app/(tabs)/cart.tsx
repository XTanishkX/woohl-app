import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus, ShieldCheck, MapPin, CreditCard, CheckCircle2, ChevronRight, Check } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { BottomSheet } from '../../components/ui/BottomSheet';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, getCartTotal, referralBalance, referralThreshold, useWalletBalance } = useAppStore();

  const [isCheckoutSheetVisible, setCheckoutSheetVisible] = useState(false);
  const [isPaymentGatewayVisible, setPaymentGatewayVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [selectedPayment, setSelectedPayment] = useState<'UPI' | 'Card' | 'COD'>('UPI');

  const total = getCartTotal();
  const groupBuyDiscount = cart.length > 0 ? 300 : 0; // Mock group buy total discount
  const isWalletUnlocked = referralBalance >= referralThreshold;
  const walletApplied = isWalletUnlocked ? Math.min(referralBalance, 200) : 0; // Use up to 200 from wallet
  const handlingCharge = cart.length > 0 ? 27 : 0;
  const deliveryCharge = cart.length > 0 ? 0 : 0; // Free delivery
  
  const grandTotal = total - groupBuyDiscount - walletApplied + handlingCharge + deliveryCharge;

  // Fake Payment Processing
  useEffect(() => {
    if (isPaymentGatewayVisible && paymentStatus === 'processing') {
      setTimeout(() => {
        setPaymentStatus('success');
        if (isWalletUnlocked) useWalletBalance(walletApplied);
        // Confetti effect is triggered on success
        setTimeout(() => {
          setPaymentGatewayVisible(false);
          setCheckoutSheetVisible(false);
          // Assuming we clear cart and navigate or show big success screen
        }, 2000);
      }, 3000);
    }
  }, [paymentStatus, isPaymentGatewayVisible]);

  const handlePayClick = () => {
    setPaymentGatewayVisible(true);
    setPaymentStatus('processing');
  };

  const scaleAnim = useSharedValue(0.5);
  useEffect(() => {
    if (paymentStatus === 'success') {
      scaleAnim.value = withSpring(1, { damping: 10, stiffness: 100 });
    }
  }, [paymentStatus]);
  const successIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }]
  }));

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center border-b border-zinc-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="#18181b" size={24} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-woohl-dark tracking-tight">Your Cart</Text>
      </View>
      
      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6 pb-20">
          <View className="w-24 h-24 bg-woohl-orange/10 rounded-full items-center justify-center mb-6 border-2 border-woohl-orange/20">
            <Text className="text-4xl">🛒</Text>
          </View>
          <Text className="text-woohl-dark font-bold text-xl mb-2">Your cart is empty</Text>
          <Text className="text-zinc-500 text-center mb-8">Looks like you haven't added anything to your cart yet.</Text>
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/explore')}
            className="bg-woohl-orange py-4 px-8 rounded-full shadow-lg shadow-woohl-orange/30"
          >
            <Text className="text-white font-bold">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
          >
            <View className="px-5 pt-6">
              {/* Cart Items */}
              {cart.map((item) => (
                <View key={item.id} className="flex-row bg-white border border-zinc-200 rounded-2xl p-3 mb-4 shadow-sm shadow-zinc-100">
                  <View className="w-24 h-28 bg-zinc-100 rounded-xl overflow-hidden mr-4">
                    <Image source={{ uri: item.images[0] }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <View className="flex-1 justify-between py-1">
                    <View>
                      <Text className="text-woohl-dark font-semibold text-sm leading-tight mb-1" numberOfLines={2}>{item.name}</Text>
                      <Text className="text-woohl-orange font-bold text-lg mb-1">₹{item.price}</Text>
                    </View>
                    
                    {/* Quantity Selector */}
                    <View className="flex-row items-center">
                      <View className="flex-row items-center border border-zinc-200 rounded-full bg-zinc-50">
                        <TouchableOpacity 
                          onPress={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                          className="px-3 py-1.5 items-center justify-center"
                        >
                          <Minus color="#52525b" size={14} />
                        </TouchableOpacity>
                        <Text className="text-woohl-dark font-bold w-6 text-center text-sm">{item.quantity}</Text>
                        <TouchableOpacity 
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 items-center justify-center"
                        >
                          <Plus color="#52525b" size={14} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}

              {/* Delivery Partner Safety Banner */}
              <View className="flex-row items-center bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                <ShieldCheck color="#10B981" size={24} className="mr-3" />
                <View>
                  <Text className="text-green-800 font-bold text-sm">Delivery partner safety</Text>
                  <Text className="text-green-700/80 text-xs">Learn how we ensure their safety</Text>
                </View>
              </View>
              
              {/* Trust & Bill Summary */}
              <View className="bg-zinc-50 border border-zinc-100 p-5 rounded-3xl mb-4 shadow-sm shadow-zinc-200">
                <Text className="font-bold text-lg text-woohl-dark mb-4 tracking-tight">Bill Summary</Text>
                
                <View className="flex-row justify-between mb-3">
                  <Text className="text-zinc-500 font-medium text-sm">Item Total & GST</Text>
                  <Text className="text-woohl-dark font-medium text-sm">₹{total}</Text>
                </View>
                
                {groupBuyDiscount > 0 && (
                  <View className="flex-row justify-between mb-3 bg-woohl-orange/10 p-2 rounded-lg -mx-2">
                    <Text className="text-woohl-orange font-bold text-sm">Group Buy Discount applied</Text>
                    <Text className="text-woohl-orange font-bold text-sm">-₹{groupBuyDiscount}</Text>
                  </View>
                )}

                {walletApplied > 0 && (
                  <View className="flex-row justify-between mb-3">
                    <Text className="text-woohl-green font-bold text-sm">Wallet Credits used</Text>
                    <Text className="text-woohl-green font-bold text-sm">-₹{walletApplied}</Text>
                  </View>
                )}

                <View className="flex-row justify-between mb-3">
                  <Text className="text-zinc-500 font-medium text-sm">Handling charge</Text>
                  <Text className="text-woohl-dark font-medium text-sm">₹{handlingCharge}</Text>
                </View>
                
                <View className="flex-row justify-between mb-4">
                  <Text className="text-zinc-500 font-medium text-sm">Delivery charge</Text>
                  <Text className="text-woohl-green font-bold text-sm">FREE</Text>
                </View>
                
                <View className="h-[1px] bg-zinc-200 w-full mb-4" />
                
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-black text-woohl-dark text-lg">Grand Total</Text>
                  <Text className="font-black text-woohl-dark text-xl">₹{grandTotal}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Sticky Checkout Bar */}
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-4 pb-8 flex-row justify-between items-center z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
            <View>
              <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">To Pay</Text>
              <Text className="text-2xl font-black text-woohl-dark">₹{grandTotal}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => setCheckoutSheetVisible(true)}
              className="bg-woohl-orange w-48 py-4 rounded-xl items-center shadow-lg shadow-woohl-orange/40"
            >
              <Text className="text-white font-bold text-lg">Proceed to Pay</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* 1-Click Checkout Review Order Drawer */}
      <BottomSheet isVisible={isCheckoutSheetVisible} onClose={() => setCheckoutSheetVisible(false)} heightRatio={0.75}>
        <View className="flex-1 px-6 pt-2">
          <Text className="text-2xl font-bold text-woohl-dark tracking-tight mb-6">Review Order</Text>
          
          {/* Default Address */}
          <Text className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Deliver To</Text>
          <View className="flex-row items-center justify-between border border-zinc-200 bg-zinc-50 p-4 rounded-2xl mb-8">
            <View className="flex-row items-center flex-1">
              <View className="bg-white w-10 h-10 rounded-full items-center justify-center border border-zinc-200 mr-3">
                <MapPin color="#0A1628" size={18} />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-woohl-dark text-base mb-0.5">Aditi Sharma</Text>
                <Text className="text-zinc-500 text-xs">A-201, Maple Heights, HSR Layout, BLR</Text>
              </View>
            </View>
            <Text className="text-woohl-orange font-bold text-sm ml-2">Change</Text>
          </View>

          {/* Payment Options */}
          <Text className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Pay Via</Text>
          <View className="gap-3">
            {[
              { id: 'UPI', title: 'UPI (Recommended)', desc: 'Pay via GPay, PhonePe, Paytm' },
              { id: 'Card', title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
              { id: 'COD', title: 'Cash on Delivery', desc: 'Pay ₹20 extra handling fee' }
            ].map(method => (
              <TouchableOpacity 
                key={method.id}
                onPress={() => setSelectedPayment(method.id as any)}
                className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${
                  selectedPayment === method.id ? 'border-woohl-orange bg-woohl-orange/5' : 'border-zinc-200 bg-white'
                }`}
              >
                <View>
                  <Text className={`font-bold text-base mb-0.5 ${selectedPayment === method.id ? 'text-woohl-orange' : 'text-woohl-dark'}`}>
                    {method.title}
                  </Text>
                  <Text className="text-zinc-500 text-xs">{method.desc}</Text>
                </View>
                <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  selectedPayment === method.id ? 'border-woohl-orange' : 'border-zinc-300'
                }`}>
                  {selectedPayment === method.id && <View className="w-3 h-3 bg-woohl-orange rounded-full" />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Final Pay Button inside Drawer */}
          <TouchableOpacity 
            onPress={handlePayClick}
            className="bg-woohl-dark py-5 rounded-2xl items-center mt-auto mb-8 flex-row justify-center shadow-lg shadow-black/20"
          >
            <Text className="text-white font-bold text-lg mr-2">Pay ₹{grandTotal}</Text>
            <ChevronRight color="white" size={20} />
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Fake Payment Gateway Overlay (PhonePe / Razorpay style) */}
      <Modal visible={isPaymentGatewayVisible} transparent animationType="slide">
        <View className="flex-1 bg-white">
          <View className="h-20 bg-[#6739B7] justify-center px-6">
             <Text className="text-white font-bold text-xl">PhonePe / Razorpay Simulator</Text>
          </View>
          
          <View className="flex-1 items-center justify-center px-8">
            {paymentStatus === 'processing' ? (
              <>
                <View className="w-16 h-16 border-4 border-zinc-200 border-t-[#6739B7] rounded-full animate-spin mb-6" />
                <Text className="text-2xl font-bold text-[#6739B7] mb-2 text-center">Processing Payment</Text>
                <Text className="text-zinc-500 text-center text-lg">Please do not press back or close the app.</Text>
              </>
            ) : (
              <Animated.View style={[successIconStyle]} className="items-center">
                <View className="w-32 h-32 bg-green-100 rounded-full items-center justify-center mb-6 border-8 border-green-50">
                  <Check color="#10B981" size={64} strokeWidth={3} />
                </View>
                <Text className="text-3xl font-black text-woohl-dark mb-2 text-center">Order Confirmed!</Text>
                <Text className="text-zinc-500 text-center text-lg">₹{grandTotal} paid successfully via {selectedPayment}.</Text>
              </Animated.View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
