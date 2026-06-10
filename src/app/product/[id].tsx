import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Heart, Share2, Star, ChevronLeft, ShieldCheck, Truck, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { mockProducts, mockBrands } from '../../lib/mock-db/data';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useAppStore();
  
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  const brand = mockBrands.find(b => b.id === product.brandId) || mockBrands[0];
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#000080');
  const isWishlisted = wishlist.includes(product.id);

  const handleScroll = (event: any) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width - 0.5);
    if (slide !== activeImageIndex) {
      setActiveImageIndex(slide);
    }
  };

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['#000080', '#F8F8FF', '#111827'];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="absolute top-0 w-full z-10 flex-row justify-between items-center px-5 py-4 pt-12">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center border border-zinc-200">
          <ChevronLeft color="#111827" size={24} />
        </TouchableOpacity>
        <View className="flex-row gap-3">
          <TouchableOpacity onPress={() => toggleWishlist(product.id)} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center border border-zinc-200">
            <Heart color={isWishlisted ? "#FF5A5F" : "#111827"} size={22} fill={isWishlisted ? "#FF5A5F" : "transparent"} />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center border border-zinc-200">
            <Share2 color="#111827" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Carousel */}
        <View className="relative">
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {product.images.map((img, idx) => (
              <View key={idx} style={{ width, height: width * 1.2 }}>
                <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
              </View>
            ))}
          </ScrollView>
          <View className="absolute bottom-4 w-full flex-row justify-center gap-2">
            {product.images.map((_, idx) => (
              <View key={idx} className={`h-2 rounded-full ${idx === activeImageIndex ? 'w-6 bg-woohl-dark' : 'w-2 bg-white/50'}`} />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View className="p-5">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1">
              <Text className="text-zinc-500 font-black text-xs uppercase tracking-widest mb-1">{product.brandName}</Text>
              <Text className="text-woohl-dark font-black text-2xl leading-tight mb-2">{product.name}</Text>
            </View>
            <View className="bg-woohl-green/10 px-3 py-1.5 rounded-lg border border-woohl-green/20 ml-4 items-center">
              <Text className="text-woohl-green font-black text-xs">{product.sustainabilityScore}</Text>
              <Text className="text-woohl-green font-bold text-[8px] uppercase tracking-widest">Eco Score</Text>
            </View>
          </View>

          <View className="flex-row items-end mb-4">
            <Text className="text-3xl font-black text-woohl-dark mr-3">₹{product.price}</Text>
            <Text className="text-lg font-bold text-zinc-400 line-through mb-1">₹{product.originalPrice}</Text>
            <View className="ml-3 mb-1.5 bg-woohl-red/10 px-2 py-1 rounded">
              <Text className="text-woohl-red font-black text-[10px] uppercase">{(100 - (product.price/product.originalPrice)*100).toFixed(0)}% OFF</Text>
            </View>
          </View>

          <Text className="text-zinc-600 text-sm leading-relaxed mb-6">
            {product.description}
          </Text>

          {/* Variants */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-woohl-dark font-black text-sm uppercase tracking-widest">Select Size</Text>
              <Text className="text-woohl-orange font-bold text-xs">Size Guide</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {sizes.map((size) => (
                <TouchableOpacity 
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  className={`w-14 h-14 items-center justify-center rounded-2xl mr-3 border-2 transition-all duration-200 ${
                    selectedSize === size ? 'border-woohl-dark bg-woohl-dark' : 'border-zinc-200 bg-zinc-50'
                  }`}
                >
                  <Text className={`font-black text-base ${selectedSize === size ? 'text-white' : 'text-woohl-dark'}`}>{size}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="mb-8">
            <Text className="text-woohl-dark font-black text-sm uppercase tracking-widest mb-3">Select Color</Text>
            <View className="flex-row">
              {colors.map((color) => (
                <TouchableOpacity 
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full mr-4 border-4 items-center justify-center ${
                    selectedColor === color ? 'border-woohl-orange' : 'border-transparent'
                  }`}
                >
                  <View style={{ backgroundColor: color }} className="w-10 h-10 rounded-full border border-zinc-200 shadow-sm" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tags */}
          <View className="mb-8">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.features.map((feature, idx) => (
                <View key={idx} className="bg-zinc-100 px-4 py-2 rounded-full mr-2 border border-zinc-200">
                  <Text className="text-zinc-700 font-bold text-xs">{feature}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Trust Badges */}
          <View className="flex-row gap-3 mb-8">
            <View className="flex-1 bg-woohl-green/10 p-3 rounded-xl border border-woohl-green/20 flex-row items-center">
              <ShieldCheck color="#10B981" size={24} />
              <View className="ml-3">
                <Text className="text-woohl-green font-black text-[10px] uppercase tracking-widest">Verified</Text>
                <Text className="text-woohl-dark font-bold text-xs">Quality Checked</Text>
              </View>
            </View>
            <View className="flex-1 bg-zinc-50 p-3 rounded-xl border border-zinc-200 flex-row items-center">
              <Truck color="#111827" size={24} />
              <View className="ml-3">
                <Text className="text-zinc-500 font-black text-[10px] uppercase tracking-widest">Delivery</Text>
                <Text className="text-woohl-dark font-bold text-xs">2-3 Days</Text>
              </View>
            </View>
          </View>

          {/* About the Startup */}
          {brand && (
            <View className="bg-zinc-50 rounded-3xl p-5 mb-8 border border-zinc-200">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-woohl-dark font-black text-lg">About the Maker</Text>
                <TouchableOpacity onPress={() => router.push(`/brand/${brand.id}`)}>
                  <Text className="text-woohl-orange font-bold text-sm">Visit Profile</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row items-center mb-3">
                <Image source={{ uri: brand.logo }} className="w-12 h-12 rounded-full mr-3" />
                <View>
                  <Text className="text-woohl-dark font-black text-base">{brand.name}</Text>
                  <Text className="text-zinc-500 font-medium text-xs">{brand.followersCount} Followers</Text>
                </View>
              </View>
              <Text className="text-zinc-600 text-sm leading-relaxed mb-4">
                {brand.ourStory}
              </Text>
              <TouchableOpacity onPress={() => router.push(`/brand/${brand.id}`)} className="flex-row items-center">
                <Text className="text-woohl-dark font-black text-sm uppercase tracking-widest mr-2">Read Full Story</Text>
                <ArrowRight color="#111827" size={16} />
              </TouchableOpacity>
            </View>
          )}

          {/* Reviews & Comments */}
          <View className="mb-8">
            <Text className="text-woohl-dark font-black text-lg mb-4">Reviews</Text>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map(review => (
                <View key={review.id} className="mb-4 bg-white p-4 rounded-2xl shadow-sm shadow-zinc-200 border border-zinc-100">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      {review.avatarUrl ? (
                        <Image source={{ uri: review.avatarUrl }} className="w-8 h-8 rounded-full mr-2" />
                      ) : (
                        <View className="w-8 h-8 rounded-full bg-zinc-200 mr-2 items-center justify-center">
                          <Text className="font-bold text-zinc-500">{review.userName.charAt(0)}</Text>
                        </View>
                      )}
                      <Text className="text-woohl-dark font-bold text-sm">{review.userName}</Text>
                    </View>
                    <View className="flex-row items-center">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} color="#F59E0B" size={12} fill={i <= review.rating ? "#F59E0B" : "transparent"} />
                      ))}
                    </View>
                  </View>
                  <Text className="text-zinc-600 text-sm">{review.comment}</Text>
                  <Text className="text-zinc-400 text-xs mt-2">{review.date}</Text>
                </View>
              ))
            ) : (
              <Text className="text-zinc-500">No reviews yet.</Text>
            )}
          </View>

          {/* Related / Featured Products */}
          <View className="mb-4">
            <Text className="text-woohl-dark font-black text-lg mb-4">You May Also Like</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible">
              {mockProducts.filter(p => p.id !== product.id).map((relatedProduct) => (
                <TouchableOpacity 
                  key={relatedProduct.id} 
                  className="w-36 mr-4 bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden"
                  onPress={() => router.push(`/product/${relatedProduct.id}`)}
                >
                  <View className="w-full aspect-[4/5] bg-zinc-100">
                    <Image source={{ uri: relatedProduct.images[0] }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <View className="p-3">
                    <Text className="text-zinc-400 text-[8px] font-black uppercase tracking-widest mb-1">{relatedProduct.brandName}</Text>
                    <Text className="text-woohl-dark font-bold text-xs leading-tight mb-1" numberOfLines={1}>{relatedProduct.name}</Text>
                    <Text className="text-woohl-dark font-black text-sm">₹{relatedProduct.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

        </View>
      </ScrollView>

      {/* Sticky Action Bar */}
      <View className="absolute bottom-0 w-full bg-white border-t border-zinc-200 px-5 py-4 flex-row items-center justify-between pb-8">
        <View>
          <Text className="text-zinc-500 font-bold text-xs">Total Price</Text>
          <Text className="text-woohl-dark font-black text-xl">₹{product.price}</Text>
        </View>
        <View className="flex-row gap-3">
          <TouchableOpacity 
            onPress={() => {
              addToCart(product);
              alert("Added to Cart!");
            }} 
            className="px-6 py-3.5 rounded-xl border-2 border-woohl-dark items-center justify-center bg-white"
          >
            <Text className="text-woohl-dark font-black text-xs uppercase tracking-widest">Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => router.push('/checkout')}
            className="px-8 py-3.5 rounded-xl bg-woohl-orange shadow-lg shadow-woohl-orange/40 items-center justify-center"
          >
            <Text className="text-white font-black text-xs uppercase tracking-widest">Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
