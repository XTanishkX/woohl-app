import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus, ShieldCheck, MapPin, CheckCircle2, ChevronRight, Check, Ticket, Coins, Truck, Clock } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { BottomSheet } from '../../components/ui/BottomSheet';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, getCartTotal, woohlCoins, referralCredits, useCoins, useReferralCredits } = useAppStore();

  const [isCheckoutSheetVisible, setCheckoutSheetVisible] = useState(false);
  const [isPaymentGatewayVisible, setPaymentGatewayVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [selectedPayment, setSelectedPayment] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [applyCoins, setApplyCoins] = useState(false);
  const [applyReferral, setApplyReferral] = useState(false);

  const total = getCartTotal();
  const coinsApplied = applyCoins ? Math.min(woohlCoins, 100) : 0; // Max 100 coins per order
  const referralApplied = applyReferral ? Math.min(referralCredits, 200) : 0; // Max 200 credits
  const handlingCharge = cart.length > 0 ? 27 : 0;
  const deliveryCharge = cart.length > 0 ? 0 : 0; // Free delivery
  
  const grandTotal = total - coinsApplied - referralApplied + handlingCharge + deliveryCharge;

  // Fake Payment Processing
  useEffect(() => {
    if (isPaymentGatewayVisible && paymentStatus === 'processing') {
      setTimeout(() => {
        setPaymentStatus('success');
        if (applyCoins) useCoins(coinsApplied);
        if (applyReferral) useReferralCredits(referralApplied);
        
        setTimeout(() => {
          setPaymentGatewayVisible(false);
          setCheckoutSheetVisible(false);
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
      <View className="px-5 py-4 flex-row items-center border-b border-zinc-100 bg-white z-10">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text className="text-2xl font-black text-woohl-dark tracking-tight">Your Cart</Text>
      </View>
      
      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6 pb-20 bg-zinc-50">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6 shadow-xl shadow-zinc-200/50">
            <Text className="text-4xl">🛒</Text>
          </View>
          <Text className="text-woohl-dark font-black text-xl mb-2">Your cart is empty</Text>
          <Text className="text-zinc-500 font-medium text-center mb-8">Discover emerging startups and unique finds.</Text>
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/explore')}
            className="bg-woohl-dark py-4 px-8 rounded-2xl shadow-lg shadow-black/20"
          >
            <Text className="text-white font-black uppercase tracking-widest text-xs">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
            className="bg-zinc-50"
          >
            <View className="px-5 pt-6">
              {/* Cart Items */}
              {cart.map((item) => (
                <View key={item.id} className="flex-row bg-white rounded-3xl p-4 mb-4 shadow-xl shadow-zinc-200/50">
                  <View className="w-24 h-28 bg-zinc-100 rounded-2xl overflow-hidden mr-4">
                    <Image source={{ uri: item.images[0] }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <View className="flex-1 justify-between py-1">
                    <View>
                      <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.brandName}</Text>
                      <Text className="text-woohl-dark font-bold text-sm leading-tight mb-2" numberOfLines={2}>{item.name}</Text>
                      <Text className="text-woohl-dark font-black text-lg mb-1">₹{item.price}</Text>
                    </View>
                    
                    <View className="flex-row items-center justify-between">
                      {/* Quantity Selector */}
                      <View className="flex-row items-center border border-zinc-200 rounded-xl bg-zinc-50">
                        <TouchableOpacity 
                          onPress={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                          className="w-8 h-8 items-center justify-center"
                        >
                          <Minus color="#111827" size={14} />
                        </TouchableOpacity>
                        <Text className="text-woohl-dark font-black w-6 text-center text-sm">{item.quantity}</Text>
                        <TouchableOpacity 
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 items-center justify-center"
                        >
                          <Plus color="#111827" size={14} />
                        </TouchableOpacity>
                      </View>
                      
                      <TouchableOpacity>
                        <Text className="text-zinc-400 font-bold text-xs underline">Save for later</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}

              {/* Delivery Estimator */}
              <View className="flex-row items-center bg-white rounded-2xl p-4 mb-6 shadow-sm shadow-zinc-200/50 border border-zinc-100">
                <Clock color="#10B981" size={24} className="mr-3" />
                <View>
                  <Text className="text-woohl-dark font-black text-sm">Delivery Estimator</Text>
                  <Text className="text-zinc-500 text-xs font-medium">Arriving by <Text className="font-bold text-woohl-dark">Tomorrow, 9 PM</Text> via Dunzo</Text>
                </View>
              </View>

              {/* Coupon Area */}
              <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-2xl p-4 mb-4 shadow-sm shadow-zinc-200/50 border border-zinc-100">
                <View className="flex-row items-center">
                  <Ticket color="#FF5A5F" size={24} className="mr-3" />
                  <Text className="text-woohl-dark font-black text-sm">Apply Coupon Code</Text>
                </View>
                <ChevronRight color="#9CA3AF" size={20} />
              </TouchableOpacity>

              {/* Woohl Coins & Referral */}
              <View className="bg-white rounded-3xl p-5 mb-6 shadow-xl shadow-zinc-200/50 border border-zinc-100">
                <Text className="font-black text-lg text-woohl-dark mb-4 tracking-tight">Rewards & Credits</Text>
                
                <TouchableOpacity 
                  onPress={() => setApplyCoins(!applyCoins)}
                  className={`flex-row items-center justify-between p-4 rounded-2xl mb-3 border-2 ${applyCoins ? 'border-[#F59E0B] bg-[#F59E0B]/5' : 'border-zinc-100'}`}
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-[#F59E0B]/10 rounded-full items-center justify-center mr-3">
                      <Coins color="#F59E0B" size={20} />
                    </View>
                    <View>
                      <Text className="font-bold text-woohl-dark">Woohl Coins</Text>
                      <Text className="text-zinc-500 text-xs font-medium">Balance: {woohlCoins} (Use up to 100)</Text>
                    </View>
                  </View>
                  <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${applyCoins ? 'border-[#F59E0B]' : 'border-zinc-300'}`}>
                    {applyCoins && <View className="w-3 h-3 bg-[#F59E0B] rounded-full" />}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => setApplyReferral(!applyReferral)}
                  className={`flex-row items-center justify-between p-4 rounded-2xl border-2 ${applyReferral ? 'border-[#10B981] bg-[#10B981]/5' : 'border-zinc-100'}`}
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-[#10B981]/10 rounded-full items-center justify-center mr-3">
                      <ShieldCheck color="#10B981" size={20} />
                    </View>
                    <View>
                      <Text className="font-bold text-woohl-dark">Referral Credits</Text>
                      <Text className="text-zinc-500 text-xs font-medium">Balance: ₹{referralCredits} (Use up to ₹200)</Text>
                    </View>
                  </View>
                  <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${applyReferral ? 'border-[#10B981]' : 'border-zinc-300'}`}>
                    {applyReferral && <View className="w-3 h-3 bg-[#10B981] rounded-full" />}
                  </View>
                </TouchableOpacity>
              </View>
              
              {/* Trust & Bill Summary */}
              <View className="bg-white border border-zinc-100 p-6 rounded-3xl mb-4 shadow-xl shadow-zinc-200/50">
                <Text className="font-black text-lg text-woohl-dark mb-5 tracking-tight">Order Summary</Text>
                
                <View className="flex-row justify-between mb-3">
                  <Text className="text-zinc-500 font-bold text-sm">Item Total & GST</Text>
                  <Text className="text-woohl-dark font-black text-sm">₹{total}</Text>
                </View>

                {coinsApplied > 0 && (
                  <View className="flex-row justify-between mb-3">
                    <Text className="text-[#F59E0B] font-bold text-sm">Woohl Coins applied</Text>
                    <Text className="text-[#F59E0B] font-black text-sm">-₹{coinsApplied}</Text>
                  </View>
                )}

                {referralApplied > 0 && (
                  <View className="flex-row justify-between mb-3">
                    <Text className="text-woohl-green font-bold text-sm">Referral Credits used</Text>
                    <Text className="text-woohl-green font-black text-sm">-₹{referralApplied}</Text>
                  </View>
                )}

                <View className="flex-row justify-between mb-3">
                  <Text className="text-zinc-500 font-bold text-sm">Handling charge</Text>
                  <Text className="text-woohl-dark font-black text-sm">₹{handlingCharge}</Text>
                </View>
                
                <View className="flex-row justify-between mb-5">
                  <Text className="text-zinc-500 font-bold text-sm">Delivery charge</Text>
                  <Text className="text-woohl-green font-black text-sm">FREE</Text>
                </View>
                
                <View className="h-[1px] bg-zinc-100 w-full mb-5" />
                
                <View className="flex-row justify-between items-center mb-2 bg-zinc-50 p-4 rounded-xl">
                  <Text className="font-black text-woohl-dark text-lg uppercase tracking-widest">Grand Total</Text>
                  <Text className="font-black text-woohl-dark text-2xl">₹{grandTotal}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Sticky Checkout Bar */}
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-4 pb-8 flex-row justify-between items-center z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <View>
              <Text className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total to pay</Text>
              <Text className="text-3xl font-black text-woohl-dark">₹{grandTotal}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => setCheckoutSheetVisible(true)}
              className="bg-woohl-dark w-48 py-4 rounded-2xl items-center shadow-xl shadow-black/20"
            >
              <Text className="text-white font-black text-xs uppercase tracking-widest">Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* 1-Click Checkout Review Order Drawer */}
      <BottomSheet isVisible={isCheckoutSheetVisible} onClose={() => setCheckoutSheetVisible(false)} heightRatio={0.75}>
        <View className="flex-1 px-6 pt-2">
          <Text className="text-2xl font-black text-woohl-dark tracking-tight mb-6">Review Order</Text>
          
          {/* Default Address */}
          <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-3">Deliver To</Text>
          <View className="flex-row items-center justify-between border border-zinc-200 bg-white p-5 rounded-3xl mb-8 shadow-xl shadow-zinc-200/50">
            <View className="flex-row items-center flex-1">
              <View className="bg-zinc-50 w-12 h-12 rounded-full items-center justify-center border border-zinc-200 mr-4">
                <MapPin color="#111827" size={20} />
              </View>
              <View className="flex-1">
                <Text className="font-black text-woohl-dark text-base mb-1">Aditi Sharma</Text>
                <Text className="text-zinc-500 font-medium text-xs leading-relaxed">A-201, Maple Heights, HSR Layout, BLR</Text>
              </View>
            </View>
            <Text className="text-woohl-orange font-black text-[10px] uppercase tracking-widest underline ml-4">Change</Text>
          </View>

          {/* Payment Options */}
          <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-3">Pay Via</Text>
          <View className="gap-3">
            {[
              { id: 'UPI', title: 'UPI (Recommended)', desc: 'Pay via GPay, PhonePe, Paytm' },
              { id: 'Card', title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
              { id: 'COD', title: 'Cash on Delivery', desc: 'Pay ₹20 extra handling fee' }
            ].map(method => (
              <TouchableOpacity 
                key={method.id}
                onPress={() => setSelectedPayment(method.id as any)}
                className={`p-5 rounded-3xl border-2 flex-row items-center justify-between ${
                  selectedPayment === method.id ? 'border-woohl-orange bg-woohl-orange/5' : 'border-zinc-100 bg-white shadow-sm shadow-zinc-100'
                }`}
              >
                <View>
                  <Text className={`font-black text-base mb-1 ${selectedPayment === method.id ? 'text-woohl-orange' : 'text-woohl-dark'}`}>
                    {method.title}
                  </Text>
                  <Text className="text-zinc-500 font-medium text-xs">{method.desc}</Text>
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
            className="bg-[#10B981] py-5 rounded-2xl items-center mt-auto mb-8 flex-row justify-center shadow-xl shadow-[#10B981]/40"
          >
            <Text className="text-white font-black text-sm uppercase tracking-widest mr-2">Pay ₹{grandTotal}</Text>
            <ChevronRight color="white" size={20} />
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Fake Payment Gateway Overlay (PhonePe / Razorpay style) */}
      <Modal visible={isPaymentGatewayVisible} transparent animationType="slide">
        <View className="flex-1 bg-white">
          <View className="h-24 bg-[#6739B7] justify-end pb-4 px-6">
             <Text className="text-white font-black text-xl">Secure Checkout</Text>
          </View>
          
          <View className="flex-1 items-center justify-center px-8">
            {paymentStatus === 'processing' ? (
              <>
                <View className="w-20 h-20 border-4 border-zinc-100 border-t-[#6739B7] rounded-full animate-spin mb-8" />
                <Text className="text-2xl font-black text-[#6739B7] mb-3 text-center">Processing Payment</Text>
                <Text className="text-zinc-500 font-medium text-center text-sm">Please do not press back or close the app.</Text>
              </>
            ) : (
              <Animated.View style={[successIconStyle]} className="items-center">
                <View className="w-32 h-32 bg-green-50 rounded-full items-center justify-center mb-8 border-[12px] border-green-100/50">
                  <Check color="#10B981" size={64} strokeWidth={4} />
                </View>
                <Text className="text-4xl font-black text-woohl-dark mb-3 text-center tracking-tight">Success!</Text>
                <Text className="text-zinc-500 font-medium text-center text-base">₹{grandTotal} paid successfully via {selectedPayment}.</Text>
              </Animated.View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
