import { CupSize } from '@/components/card/card.types';
import CustomButton from '@/components/customButton/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Star from "../../../../assets/icons/start.svg";
import { supabase } from '../../lib/supabase';
import { addToCart, decrement, increment } from '../../redux/cartSlice';
import { toggleFavourite } from '../../redux/favouriteSlice';
import { RootState } from '../../redux/store';
import { styles } from "./Coffee.styles";


const CoffeeInfo = () => {
  const { coffeeId } = useLocalSearchParams();
  const [coffee, setCoffee] = useState<products | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [selectedSize, setSelectedSize] = useState<CupSize>('small');
  const [selectedSugar, setSelectedSugar] = useState('No Sugar');
  type products={
    id: string;
    title: string;
    imageUrl: any;
    hasSugar: boolean;
    defaultSize: CupSize;
    cupSizes: Record<CupSize, number>;
    category_id:string
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('coffee_products')
        .select('*')
        .eq('id', coffeeId)
        .single();
      if (error) {
        setError(error.message);
        setCoffee(null);
      } else {
        setCoffee(data);
        setSelectedSize(data?.defaultSize || 'small');
        setSelectedSugar(data?.hasSugar ? 'Medium' : 'No Sugar');
      }
      setLoading(false);
    };
    if (coffeeId) fetchData();
  }, [coffeeId]);

  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const isFavourite = coffee ? favourites.some(item => item.id === coffee.id) : false;
  const selectedPrice = coffee?.cupSizes?.[selectedSize] ?? 0;

  const cartItem = cartItems.find(
    item => item.id === coffeeId &&
      item.selectedSize === selectedSize &&
      item.selectedSugar === selectedSugar
  );

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text>Loading...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  if (error || !coffee) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text>Not found or error: {error || 'No coffee found.'}</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Image source={typeof coffee.imageUrl === 'string' ? { uri: coffee.imageUrl } : coffee.imageUrl} style={styles.image} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity style={styles.icon} onPress={() => router.push("/(tabs)/home")} >
                <Ionicons name='chevron-back' size={30} color="#00582F" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  dispatch(toggleFavourite(coffee));
                }}
              >
                <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={25} color="#FF4848" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.text}>{coffee.title}</Text>
              <Text style={styles.subText}>
                {coffee.hasSugar ? 'Has Sugar' : 'No Sugar'}
              </Text>
            </View>
            <View style={styles.iconConatiner}>
              <Star color="#fff" />
              <Text style={{ color: "#fff" }}>4.8</Text>
            </View>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.heading} >Cup Sizes</Text>
          <View style={styles.cupSizesContainer}>
            {coffee.cupSizes && Object.entries(coffee.cupSizes).map(([size, price]) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size as CupSize)}
                style={[
                  styles.cupSizeBox,
                  selectedSize === size && styles.cupSizeBoxActive
                ]}
              >
                <Text
                  style={[
                    styles.cupSizeText,
                    selectedSize === size && styles.cupSizeTextActive
                  ]}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.heading} >Level Sugar</Text>
          {!coffee.hasSugar ? (
            <View style={styles.cupSizesContainer}>
              <View style={[styles.cupSizeBox, styles.cupSizeBoxActive]}>
                <Text style={[styles.cupSizeText, styles.cupSizeTextActive]}>No Sugar</Text>
              </View>
            </View>
          ) : (
            <View style={styles.cupSizesContainer}>
              {['Low', 'Medium', 'High'].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.cupSizeBox,
                    selectedSugar === level && styles.cupSizeBoxActive,
                  ]}
                  onPress={() => setSelectedSugar(level)}
                >
                  <Text
                    style={[
                      styles.cupSizeText,
                      selectedSugar === level && styles.cupSizeTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.heading} >About</Text>
          <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum iusto, ipsa ipsam animi illo dolor expedita modi repudiandae nemo, corrupti praesentium quo. Possimus at non enim asperiores quis inventore sequi!...<Text style={styles.subText2}>Read More</Text></Text>
        </View>
        {cartItem ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => dispatch(decrement({
                id: coffee.id,
                selectedSize,
                selectedSugar
              }))}
              style={{ backgroundColor: '#eee', padding: 10, borderRadius: 8 }}
            >
              <Ionicons name="remove-outline" size={18} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, marginHorizontal: 20 }}>
              {cartItem.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(increment({
                id: coffee.id,
                selectedSize,
                selectedSugar
              }))}
              style={{ backgroundColor: '#eee', padding: 10, borderRadius: 8 }}
            >
              <Ionicons name='add-outline' size={18} />
            </TouchableOpacity>
          </View>
        ) : (
          <CustomButton
            title='Add to Cart |'
            price={selectedPrice}
            onPress={() => dispatch(addToCart({
              ...coffee,
              selectedSize,
              selectedSugar,
              price: selectedPrice,
              quantity: 1,
            }))}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default CoffeeInfo

