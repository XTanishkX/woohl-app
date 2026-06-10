import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Heart, Share2, Star, ChevronLeft, ShieldCheck, Truck, ArrowRight, ShoppingCart } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { mockProducts, mockBrands } from '../../lib/mock-db/data';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolation, withTiming, Easing, withDelay } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Collapsible } from '../../components/ui/collapsible';

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

  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const scrollY = useSharedValue(0);
  const verticalScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const flyX = useSharedValue(0);
  const flyY = useSharedValue(0);
  const flyScale = useSharedValue(0);
  const flyOpacity = useSharedValue(0);

  const handleAddToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addToCart(product);

    // Trigger Fly to Cart
    flyOpacity.value = 1;
    flyScale.value = 1;
    flyX.value = 0;
    flyY.value = 0;

    // Approximate cart icon position
    flyX.value = withTiming(-width/2 + 50, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
    flyY.value = withTiming(80, { duration: 600, easing: Easing.bezier(0.5, 0, 0.75, 0) });
    flyScale.value = withTiming(0, { duration: 600 });
    
    setTimeout(() => {
      flyOpacity.value = 0;
    }, 600);
  };

  const flyStyle = useAnimatedStyle(() => ({
    opacity: flyOpacity.value,
    transform: [
      { translateX: flyX.value },
      { translateY: flyY.value },
      { scale: flyScale.value }
    ]
  }));

  const stickyBarStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, width], [100, 0], Extrapolation.CLAMP);
    return {
      transform: [{ translateY }]
    };
  });

  const handleWishlist = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleWishlist(product.id);
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
          <TouchableOpacity onPress={handleWishlist} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center border border-zinc-200">
            <Heart color={isWishlisted ? "#FF6A00" : "#111827"} size={22} fill={isWishlisted ? "#FF6A00" : "transparent"} />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center border border-zinc-200">
            <Share2 color="#111827" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={verticalScrollHandler}
        scrollEventThrottle={16}
      >
        {/* Image Carousel */}
        <View className="relative">
          <Animated.FlatList
            data={product.images}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View style={{ width, height: width * 1.2 }}>
                <Image source={{ uri: item }} className="w-full h-full" resizeMode="cover" />
              </View>
            )}
          />
          <View className="absolute bottom-4 w-full flex-row justify-center gap-2">
            {product.images.map((_, i) => {
              const dotStyle = useAnimatedStyle(() => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = interpolate(scrollX.value, inputRange, [8, 24, 8], Extrapolation.CLAMP);
                const bgColor = interpolate(scrollX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP);
                return {
                  width: dotWidth,
                  backgroundColor: scrollX.value >= (i * width) - (width/2) && scrollX.value <= (i * width) + (width/2) ? '#FF6A00' : 'rgba(255,255,255,0.5)',
                };
              });
              return <Animated.View key={i} className="h-2 rounded-full" style={dotStyle} />;
            })}
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

          {/* Collapsibles */}
          <View className="mb-6 gap-2">
            <Collapsible title="Product Description">
              <Text className="text-zinc-600 text-sm leading-relaxed">
                {product.description}
              </Text>
            </Collapsible>
            <Collapsible title="Shipping & Returns">
              <Text className="text-zinc-600 text-sm leading-relaxed">
                Free standard shipping on orders over ₹999. Return within 14 days for a full refund.
              </Text>
            </Collapsible>
            <Collapsible title="Materials / Sustainability">
              <Text className="text-zinc-600 text-sm leading-relaxed">
                Made from 100% organic cotton. Certified by Global Organic Textile Standard (GOTS). Eco score: {product.sustainabilityScore}/100.
                {"\n\n"}
                <TouchableOpacity onPress={() => router.push('/sustainability')}>
                  <Text className="text-woohl-orange font-bold text-sm">Learn more about our sustainability efforts.</Text>
                </TouchableOpacity>
              </Text>
            </Collapsible>
          </View>

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

          {/* Frequently Bought Together */}
          <View className="mb-4">
            <Text className="text-woohl-dark font-black text-lg mb-4">Frequently Bought Together</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible -mx-5 px-5 pb-4">
              {mockProducts.filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
                <TouchableOpacity 
                  key={relatedProduct.id} 
                  className="w-40 mr-4 bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden shadow-zinc-200"
                  onPress={() => router.push(`/product/${relatedProduct.id}`)}
                >
                  <View className="w-full aspect-[4/5] bg-zinc-100">
                    <Image source={{ uri: relatedProduct.images[0] }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <View className="p-3">
                    <Text className="text-zinc-400 text-[8px] font-black uppercase tracking-widest mb-1">{relatedProduct.brandName}</Text>
                    <Text className="text-woohl-dark font-bold text-sm leading-tight mb-1" numberOfLines={2}>{relatedProduct.name}</Text>
                    <Text className="text-woohl-orange font-black text-base">₹{relatedProduct.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

        </View>
      </Animated.ScrollView>

      {/* Sticky Action Bar */}
      <Animated.View style={[stickyBarStyle, { position: 'absolute', bottom: 0, width: '100%', zIndex: 100 }]} className="bg-white border-t border-zinc-200 px-5 py-4 flex-row items-center justify-between pb-8 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <View>
          <Text className="text-zinc-500 font-bold text-xs">Total Price</Text>
          <Text className="text-woohl-dark font-black text-xl">₹{product.price}</Text>
        </View>
        <View className="flex-row gap-3 relative">
          <TouchableOpacity 
            onPress={handleAddToCart} 
            className="px-6 py-3.5 rounded-xl border-2 border-woohl-dark items-center justify-center bg-white z-10"
          >
            <Text className="text-woohl-dark font-black text-xs uppercase tracking-widest">Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => router.push('/checkout')}
            className="px-8 py-3.5 rounded-xl bg-woohl-orange shadow-lg shadow-woohl-orange/40 items-center justify-center z-10"
          >
            <Text className="text-white font-black text-xs uppercase tracking-widest">Buy Now</Text>
          </TouchableOpacity>
          
          {/* Fly to Cart Animation Image */}
          <Animated.View style={[flyStyle, { position: 'absolute', left: 20, top: -20, zIndex: 99 }]} pointerEvents="none">
            <View className="w-16 h-16 rounded-xl overflow-hidden border-2 border-woohl-orange shadow-lg shadow-woohl-orange">
              <Image source={{ uri: product.images[0] }} className="w-full h-full" />
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
