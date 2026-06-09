import React, { useState } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Search, ShoppingBag, Heart, Share2 } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { useCartStore } from '../../store/useCartStore';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem, items } = useCartStore();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [selectedColor, setSelectedColor] = useState(0);

  // Mock product data
  const product = {
    id: id as string || 'p1',
    title: 'Classic Analog Watch for Men',
    brand: 'emporio',
    price: 399,
    description: 'Elevate your style with this Classic Analog Watch for Men - the perfect blend of sophistication and functionality. Designed to complement any occasion, from professional meetings to casual outings.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600',
    colors: ['#D1D5DB', '#9CA3AF', '#6B7280', '#374151']
  };

  const moreFromSeller = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
    'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=200'
  ];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      brand: product.brand
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 py-3 flex-row justify-between items-center border-b border-zinc-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft color="#18181b" size={24} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-woohl-dark tracking-tighter">woohl</Text>
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Search color="#18181b" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} className="relative">
            <ShoppingBag color="#18181b" size={24} />
            {cartItemCount > 0 && (
              <View className="absolute -top-2 -right-2 bg-woohl-orange w-5 h-5 rounded-full items-center justify-center border-2 border-white">
                <Text className="text-white text-[10px] font-bold">{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Title Area */}
        <View className="px-5 py-4">
          <Text className="text-woohl-dark font-bold text-lg leading-tight mb-1">{product.title}</Text>
          <Text className="text-zinc-500 font-medium text-xs">by {product.brand}</Text>
        </View>

        {/* Product Image */}
        <View className="w-full h-72 bg-zinc-100">
          <Image 
            source={{ uri: product.imageUrl }} 
            className="w-full h-full" 
            resizeMode="cover" 
          />
        </View>
        
        {/* Pagination Dots (Mock) */}
        <View className="flex-row justify-center py-3 gap-1">
          <View className="w-2 h-2 rounded-full bg-woohl-dark" />
          <View className="w-2 h-2 rounded-full bg-zinc-300" />
          <View className="w-2 h-2 rounded-full bg-zinc-300" />
        </View>

        {/* Price & Actions */}
        <View className="px-5 flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-woohl-dark">₹{product.price}</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity>
              <Heart color="#18181b" size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Share2 color="#18181b" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Color Selector */}
        <View className="px-5 mb-4">
          <Text className="text-sm font-bold text-woohl-dark mb-3">Color</Text>
          <View className="flex-row gap-3">
            {product.colors.map((color, idx) => (
              <TouchableOpacity 
                key={idx}
                onPress={() => setSelectedColor(idx)}
                className={`w-10 h-10 rounded-full border-2 items-center justify-center ${selectedColor === idx ? 'border-woohl-dark' : 'border-transparent'}`}
              >
                <View style={{ backgroundColor: color }} className="w-8 h-8 rounded-full border border-zinc-200" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Delivery Info */}
        <View className="px-5 mb-4">
          <Text className="text-xs font-medium text-zinc-500">Delivery by Wednesday, 12 March</Text>
        </View>

        {/* Add to Cart Button */}
        <View className="px-5 mb-6">
          <Button 
            variant="primary" 
            label="Add to cart" 
            className="w-full bg-woohl-orange/10 border border-transparent shadow-none"
            onPress={handleAddToCart}
          />
        </View>

        {/* Description */}
        <View className="px-5 mb-8">
          <Text className="text-sm font-bold text-woohl-dark mb-2">Product description</Text>
          <Text className="text-zinc-600 leading-relaxed text-sm">
            {product.description}
          </Text>
          <TouchableOpacity className="mt-2 items-center">
            <Text className="text-zinc-400">⌄</Text>
          </TouchableOpacity>
        </View>

        {/* More From Seller */}
        <View className="px-5 pb-24">
          <Text className="text-sm font-bold text-woohl-dark mb-4">More From Seller</Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {moreFromSeller.map((img, idx) => (
              <View key={idx} className="w-[48%] aspect-square bg-zinc-100 rounded-xl overflow-hidden relative">
                <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
                <TouchableOpacity className="absolute top-2 right-2 bg-white/50 w-6 h-6 rounded-full items-center justify-center">
                  <Heart color="#18181b" size={14} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-5 py-4 pb-8 flex-row justify-between items-center">
        <View>
          <Text className="text-xs font-medium text-zinc-500 mb-1">To pay</Text>
          <Text className="text-xl font-bold text-woohl-dark">₹{product.price}</Text>
        </View>
        <Button 
          variant="primary" 
          label="Pay online" 
          className="w-48 bg-woohl-orange/10 border border-transparent shadow-none"
          onPress={() => router.push('/checkout')}
        />
      </View>
    </SafeAreaView>
  );
}
