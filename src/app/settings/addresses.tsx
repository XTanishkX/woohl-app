import React, { useRef, useMemo, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft, MapPin, MoreVertical, Plus, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

export default function AddressesScreen() {
  const router = useRouter();
  const { addresses, addAddress, removeAddress } = useAppStore();
  
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%'], []);
  
  const [form, setForm] = useState({
    type: 'Home',
    name: '',
    phone: '',
    pincode: '',
    street: '',
    city: ''
  });

  const handleSaveAddress = () => {
    if (!form.street || !form.city) {
      alert('Please fill the required fields');
      return;
    }
    addAddress({
      id: `a_${Date.now()}`,
      type: form.type as 'Home' | 'Work',
      fullAddress: `${form.name ? form.name + ', ' : ''}${form.street}, ${form.city} - ${form.pincode}`,
      isDefault: addresses.length === 0
    });
    setForm({ type: 'Home', name: '', phone: '', pincode: '', street: '', city: '' });
    bottomSheetRef.current?.close();
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 relative">
      <View className="px-5 py-4 bg-white border-b border-zinc-100 flex-row items-center pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 w-10 h-10 bg-zinc-50 rounded-full items-center justify-center">
          <ArrowLeft color="#111827" size={20} />
        </TouchableOpacity>
        <Text className="text-xl font-black text-woohl-dark tracking-tight">Saved Addresses</Text>
      </View>

      <ScrollView className="flex-1 p-5">
        {addresses.map(address => (
          <View key={address.id} className="bg-white p-5 rounded-3xl shadow-sm shadow-zinc-200 mb-4 border border-zinc-100 relative">
            <View className="absolute top-4 right-4">
              <TouchableOpacity onPress={() => removeAddress(address.id)}>
                <Text className="text-woohl-red font-bold text-xs uppercase">Remove</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center mb-3">
              <MapPin color="#111827" size={18} className="mr-2" />
              <Text className="font-black text-woohl-dark text-base">{address.type}</Text>
              {address.isDefault && (
                <View className="ml-3 bg-woohl-green/10 px-2 py-0.5 rounded">
                  <Text className="text-woohl-green font-bold text-[10px] uppercase tracking-widest">Default</Text>
                </View>
              )}
            </View>
            <Text className="text-zinc-600 text-sm leading-relaxed mb-4 w-5/6">{address.fullAddress}</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 border border-zinc-200 rounded-xl py-2 items-center justify-center">
                <Text className="text-woohl-dark font-bold text-xs">Edit</Text>
              </TouchableOpacity>
              {!address.isDefault && (
                <TouchableOpacity className="flex-1 border border-woohl-dark bg-woohl-dark rounded-xl py-2 items-center justify-center">
                  <Text className="text-white font-bold text-xs">Set Default</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        onPress={() => bottomSheetRef.current?.expand()}
        className="absolute bottom-10 right-5 w-16 h-16 bg-woohl-orange rounded-full items-center justify-center shadow-lg shadow-woohl-orange/50 z-10"
      >
        <Plus color="white" size={32} />
      </TouchableOpacity>

      {/* Add Address Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#fff', borderRadius: 24 }}
        handleIndicatorStyle={{ backgroundColor: '#ccc' }}
      >
        <View className="flex-1 bg-white">
          <View className="px-5 py-4 border-b border-zinc-100 flex-row items-center justify-between">
            <Text className="text-lg font-black text-woohl-dark tracking-tight">Add New Address</Text>
            <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
              <Text className="text-zinc-400 font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
          <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
            <View className="flex-row mb-6">
              <TouchableOpacity 
                onPress={() => setForm({ ...form, type: 'Home' })}
                className={`flex-1 flex-row items-center justify-center py-3 rounded-l-xl border-2 border-r-0 ${form.type === 'Home' ? 'bg-woohl-dark border-woohl-dark' : 'bg-white border-zinc-200'}`}
              >
                {form.type === 'Home' && <Check color="white" size={16} className="mr-2" />}
                <Text className={`font-bold ${form.type === 'Home' ? 'text-white' : 'text-zinc-600'}`}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setForm({ ...form, type: 'Work' })}
                className={`flex-1 flex-row items-center justify-center py-3 rounded-r-xl border-2 ${form.type === 'Work' ? 'bg-woohl-dark border-woohl-dark' : 'bg-white border-zinc-200'}`}
              >
                {form.type === 'Work' && <Check color="white" size={16} className="mr-2" />}
                <Text className={`font-bold ${form.type === 'Work' ? 'text-white' : 'text-zinc-600'}`}>Work</Text>
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Name</Text>
              <BottomSheetTextInput 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-woohl-dark"
                placeholder="Full Name"
                value={form.name}
                onChangeText={t => setForm({...form, name: t})}
              />
            </View>
            <View className="flex-row gap-4 mb-4">
              <View className="flex-1">
                <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Phone</Text>
                <BottomSheetTextInput 
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-woohl-dark"
                  placeholder="10-digit number"
                  keyboardType="numeric"
                  value={form.phone}
                  onChangeText={t => setForm({...form, phone: t})}
                />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Pincode</Text>
                <BottomSheetTextInput 
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-woohl-dark"
                  placeholder="6 digits"
                  keyboardType="numeric"
                  value={form.pincode}
                  onChangeText={t => setForm({...form, pincode: t})}
                />
              </View>
            </View>
            <View className="mb-4">
              <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Street Address</Text>
              <BottomSheetTextInput 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-woohl-dark h-20"
                placeholder="House no, Building, Street..."
                multiline
                textAlignVertical="top"
                value={form.street}
                onChangeText={t => setForm({...form, street: t})}
              />
            </View>
            <View className="mb-8">
              <Text className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">City</Text>
              <BottomSheetTextInput 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-woohl-dark"
                placeholder="City/District"
                value={form.city}
                onChangeText={t => setForm({...form, city: t})}
              />
            </View>

            <TouchableOpacity 
              onPress={handleSaveAddress}
              className="w-full bg-woohl-orange rounded-xl py-4 items-center mb-10 shadow-lg shadow-woohl-orange/40"
            >
              <Text className="text-white font-black uppercase tracking-widest text-sm">Save Address</Text>
            </TouchableOpacity>
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
