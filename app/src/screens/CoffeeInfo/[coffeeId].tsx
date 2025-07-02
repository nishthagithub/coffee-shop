import { CupSize } from '@/components/card/card.types';
import CustomButton from '@/components/customButton/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Star from "../../../../assets/icons/start.svg";
import { supabase } from '../../lib/supabase';
import { addToCart, decrement, increment } from '../../redux/cartSlice';
import { RootState } from '../../redux/store';
import { insertIntoCart } from './coffee.function';
import { styles } from "./Coffee.styles";

type products = {
  id: string;
  title: string;
  imageUrl: any;
  hasSugar: boolean;
  defaultSize: CupSize;
  cupSizes: Record<CupSize, number>;
  category_id: string;
}

const CoffeeInfo = () => {
  const { coffeeId } = useLocalSearchParams();
  const [coffee, setCoffee] = useState<products | null>(null);
  const {items} = useSelector((state: RootState) => state.cart);
  const [selectedSize, setSelectedSize] = useState<CupSize>('small');
  const [selectedSugar, setSelectedSugar] = useState('No Sugar');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('coffee_products')
        .select(`
          *,
          favourites (
            id,
            user_id,
            product_id
          )
        `)
        .eq('id', coffeeId)
        .single();
      if (error) {
        setError(error.message);
        setCoffee(null);
      } else {
        setCoffee(data);
        setSelectedSize(data?.defaultSize || 'small');
        setSelectedSugar(data?.hasSugar ? 'Medium' : 'No Sugar');
        setIsFavourite(data?.favourites?.some((f: any) => f.user_id === id) ?? false);  
      }
      setLoading(false);
    };
 
    if (coffeeId) fetchData();
  }, [coffeeId]);
  const handleToggleFavourite = async () => {
    if (!coffee || !id) return;
  
    if (isFavourite) {
      const { error } = await supabase
        .from('favourites')
        .delete()
        .match({ user_id: id, product_id: coffee.id });
  
      if (!error) {
        setIsFavourite(false);
      }
    } else {
      const { error } = await supabase
        .from('favourites')
        .insert([{ user_id: id, product_id: coffee.id }]);
  
      if (!error) {
        setIsFavourite(true);
      }
    }
  };
  
  

  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user);

  const selectedPrice = coffee?.cupSizes?.[selectedSize] ?? 0;
  const cartItem = useMemo(()=> items.find(
    item => item.id === coffeeId &&
      item.selectedSize === selectedSize
  ),[items,coffeeId,selectedSize]);
  // console.log('cartItem',JSON.stringify(cartItem,null,2))
 
  const handleDecrement = async () => {
    if (!cartItem || !coffee) return;

    try {
      if (cartItem.quantity > 1) {
        // Update quantity in database
        const { error } = await supabase
          .from('cart')
          .update({ quantity: cartItem.quantity - 1 })
          .match({
            user_id: id,
            product_id: coffee.id,
            defaultSize: selectedSize,
            selectedSugar: selectedSugar,
          });

        if (error) {
          alert('Failed to update cart quantity.');
          return;
        }

        // Update Redux state
        dispatch(decrement({
          id: coffee.id,
          selectedSize,
          selectedSugar
        }));
      } else {
        // Remove item from database
        const { error } = await supabase
          .from('cart')
          .delete()
          .match({
            user_id: id,
            product_id: coffee.id,
            defaultSize: selectedSize,
            selectedSugar: selectedSugar,
          });

        if (error) {
          alert('Failed to remove item from cart.');
          return;
        }

        // Update Redux state
        dispatch(decrement({
          id: coffee.id,
          selectedSize,
          selectedSugar
        }));
      }
    } catch (error) {
      console.error('Error in handleDecrement:', error);
      alert('An error occurred while updating the cart.');
    }
  };

  const handleIncrement = async () => {
    if (!cartItem || !coffee) return;

    try {
      // Update quantity in database
      const { error } = await supabase
        .from('cart')
        .update({ quantity: cartItem.quantity + 1 })
        .match({
          user_id: id,
          product_id: coffee.id,
          defaultSize: selectedSize,
          selectedSugar: selectedSugar,
        });

      if (error) {
        console.log(error);
        alert('Failed to update cart quantity.');
        return;
      }

      // Update Redux state
      dispatch(increment({
        id: coffee.id,
        selectedSize,
        selectedSugar
      }));
    } catch (error) {
      console.error('Error in handleIncrement:', error);
      alert('An error occurred while updating the cart.');
    }
  };

  const handleAddToCart = async () => {
    if (!coffee) return;

    try {
      // Check if item already exists in cart
      const { data: existingItem, error: checkError } = await supabase
        .from('cart')
        .select('*')
        .match({
          user_id: id,
          product_id: coffee.id,
          defaultSize: selectedSize,
          selectedSugar: selectedSugar,
        })
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking cart:', checkError);
        alert('Error checking cart.');
        return;
      }

      if (existingItem) {
        // Update existing item quantity
        const { error: updateError } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .match({
            user_id: id,
            product_id: coffee.id,
            defaultSize: selectedSize,
            selectedSugar: selectedSugar,
          });

        if (updateError) {
          alert('Failed to update cart quantity.');
          return;
        }

        // Update Redux state
        dispatch(addToCart({
          ...coffee,
          imageUrl: typeof coffee.imageUrl === 'string' ? coffee.imageUrl : coffee.imageUrl?.uri,
          selectedSize,
          selectedSugar,
          price: selectedPrice,
          quantity: 1, 
        }));
      } else {
        // Insert new item
        const response = await insertIntoCart({
          data: {
            user_id: id,
            product_id: coffee.id,
            defaultSize: selectedSize,
            selectedSugar: selectedSugar,
            category_id: coffee.category_id,
            quantity: 1,
            price: selectedPrice,
          },
          id
        });

        if (response.error) {
          alert('Failed to add to cart.');
          console.error(response.error);
          return;
        }

        // Add to Redux state
        dispatch(addToCart({
          ...coffee,
          imageUrl: typeof coffee.imageUrl === 'string' ? coffee.imageUrl : coffee.imageUrl?.uri,
          selectedSize,
          selectedSugar,
          price: selectedPrice,
          quantity: 1,
        }));
      }
    } catch (error) {
      console.error('Error in handleAddToCart:', error);
      alert('An error occurred while adding to cart.');
    }
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
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
              <TouchableOpacity style={styles.icon} onPress={() => router.back()} >
                <Ionicons name='chevron-back' size={30} color="#00582F" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => handleToggleFavourite()
                  
              }
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
          <Text style={styles.heading}>Cup Sizes</Text>
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
          <Text style={styles.heading}>Level Sugar</Text>
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
          <Text style={styles.heading}>About</Text>
          <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum iusto, ipsa ipsam animi illo dolor expedita modi repudiandae nemo, corrupti praesentium quo. Possimus at non enim asperiores quis inventore sequi!...<Text style={styles.subText2}>Read More</Text></Text>
        </View>

        {cartItem ? (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10
          }}>
            {/* Decrease Quantity or Delete */}
            <TouchableOpacity
              onPress={handleDecrement}
              style={{ backgroundColor: '#eee', padding: 10, borderRadius: 8 }}
            >
              <Ionicons name="remove-outline" size={18} />
            </TouchableOpacity>

            <Text style={{ fontSize: 18, marginHorizontal: 20 }}>
              {cartItem.quantity}
            </Text>

            {/* Increase Quantity */}
            <TouchableOpacity
              onPress={handleIncrement}
              style={{ backgroundColor: '#eee', padding: 10, borderRadius: 8 }}
            >
              <Ionicons name='add-outline' size={18} />
            </TouchableOpacity>
          </View>
        ) : (
          <CustomButton
            title='Add to Cart |'
            price={selectedPrice}
            onPress={handleAddToCart}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default CoffeeInfo;