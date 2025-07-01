import CustomButton from '@/components/customButton/CustomButton'
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { useStripe } from '@stripe/stripe-react-native'
import axios from "axios"
import { router } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import Card2 from "../../../../assets/icons/card2.svg"
import Card3 from "../../../../assets/icons/card3.svg"
import Card1 from "../../../../assets/icons/visa.svg"
import { supabase } from '../../lib/supabase'
import { CartItemRedux, clearCart, decrement, increment, setCart } from '../../redux/cartSlice'
import { RootState } from '../../redux/store'
import { CartItem, getCartItems } from '../CoffeeInfo/coffee.function'
import { styles } from "./Cart.styles"


const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  // console.log(userId)
  const cartItem = useSelector((state: RootState) => state.cart.items);
  console.log("redux item",cartItem)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const focused=useIsFocused()

  useEffect(() => {
    console.log('calling')
    const fetchCart = async () => {
      const { data, error } = await getCartItems(userId);
   if (data) {
    console.log('data',JSON.stringify(data,null,2))
     const mappedCartItems = data.map(item => ({
       id: item.coffee_products.id,
       imageUrl: item.coffee_products.imageUrl ?? '',
       title: item.coffee_products.title,
       price: item.price,
       selectedSize: item.defaultSize,
       selectedSugar: item.selectedSugar,
       quantity: item.quantity,
       hasSugar: item.coffee_products.hasSugar,
     }));
     console.log("cartdatraaa",JSON.stringify( data,null,2))
     dispatch(setCart(mappedCartItems));
   } else { 
        console.error(error);
      }
    };
    fetchCart();
  }, [focused]);

  useEffect(()=>{
console.log('cartItem',JSON.stringify(cartItem,null,2))
  },[cartItem])
  
  const handleIncrement = async (cartItem : CartItemRedux) => {
    if (!cartItem ) return;

    try {
      // Update quantity in database
      const { error } = await supabase
        .from('cart')
        .update({ quantity: cartItem.quantity + 1 })
        .match({
          user_id: userId,
          product_id: cartItem.id,
          defaultSize: cartItem.selectedSize,
          selectedSugar: cartItem.selectedSugar,
        });

      if (error) {
        console.log(error);
        alert('Failed to update cart quantity.');
        return;
      }

      // Update Redux state
      dispatch(increment({
        id: cartItem.id,
       selectedSize:cartItem.selectedSize,
        selectedSugar:cartItem.selectedSugar
      }));
    } catch (error) {
      console.error('Error in handleIncrement:', error);
      alert('An error occurred while updating the cart.');
    }
  };

  const handleDecrement=async(cartItem:CartItemRedux)=>{
    if(!cartItem) return;
    try {
      if(cartItem.quantity > 1){
        const { error } = await supabase
        .from('cart')
        .update({ quantity: cartItem.quantity - 1 })
        .match({
          user_id: userId,
          product_id: cartItem.id,
          defaultSize: cartItem.selectedSize,
          selectedSugar: cartItem.selectedSugar,
        });

      if (error) {
        console.log(error);
        alert('Failed to update cart quantity.');
        return;
      }
      dispatch(decrement({
        id: cartItem.id,
        selectedSize: cartItem.selectedSize,
        selectedSugar: cartItem.selectedSugar
      }));
      }
      else{
        const { error } = await supabase
        .from('cart')
        .delete()
        .match({
          user_id: userId,
          product_id: cartItem.id,
          defaultSize: cartItem.selectedSize,
          selectedSugar: cartItem.selectedSugar,
        });

      if (error) {
        console.log(error);
        alert('Failed to remove item from cart.');
        return;
      }

      // Remove item from Redux
      dispatch(decrement({
        id: cartItem.id,
        selectedSize: cartItem.selectedSize,
        selectedSugar: cartItem.selectedSugar,
        
      }));
      }
    } catch (error) {
      console.error('Error in handleDecrement:', error);
      alert('An error occurred while updating the cart.');
    }

  }
  


  // console.log(cartItems)
  const subtotal = useMemo(() => {
    return cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItem]);
  const discount = 50
  const total = useMemo(() => {
    return subtotal - discount;
  }, [subtotal]);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const payment = async(onSuccess: () => void)=>{

    try {
      const response = await axios.post("http://192.168.29.239:3000/create-paymnet",{
        amount:Math.round(total * 100)
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
      // console.log('res',JSON.stringify(response,null,2))
      const { clientSecret } = response.data;
      const initResult = await initPaymentSheet({
        merchantDisplayName: 'My Coffee Shop',
        paymentIntentClientSecret: clientSecret,
      });
      
      if (initResult.error) {
        alert(`Init error: ${initResult.error.message}`);
        return;
      }
      const presentResult = await presentPaymentSheet();
      if (presentResult.error) {
        alert(`Payment failed: ${presentResult.error.message}`);
        return;
      } 
      else{
        alert('Payment complete!');  
        setTimeout(()=>{
          onSuccess();
        },1000)
      }
  
    } catch (error) {
      alert(error)
      console.error('Payment error:', error);
    }
  }

  const renderItem = ({ item }: { item: CartItemRedux }) => {
    const isFavourite = favourites.some(fav => fav.id === item.id);
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          
          <Image
            source={
              typeof item.imageUrl === 'string'
                ? { uri: item.imageUrl }
                : item.imageUrl
            }
            style={styles.image}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.hasSugar?"With Sugar":"Without Sugar"}</Text>
            <Text style={styles.price}>Rs. {item.price}</Text>
          </View>
          <View style={{ justifyContent: 'flex-start' }}>
            <Ionicons 
              name={isFavourite ? 'heart' : 'heart-outline'} 
              size={17} 
              color="#FF4848" 
              style={{marginTop:8}} 
            />
          </View>
        </View>
        <View style={styles.tagsContainer}>
          <View>
          <Text style={styles.tagText}>Cup Size: {item.selectedSize}</Text>
          <Text style={styles.tagText}>Level Sugar: {item.selectedSugar}</Text>
          </View>
          <View style={styles.tags}>
          <Ionicons 
            name="remove-circle" 
            onPress={()=>handleDecrement(item)} 
            size={30.25} 
            color="#00512C" 
          />
          <Text style={styles.tagfont}>{item.quantity}</Text>
          <Ionicons 
            name="add-circle" 
            onPress={()=>handleIncrement(item)}
          
           
            size={30.25} 
            color="#00512C" 
          />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{marginLeft:15}}>
        <FlatList
          data={cartItem}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ListHeaderComponent={
            <View>
              <Text style={styles.font}>Cart</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
              <Ionicons name="cart-outline" size={50} color="#00512C" />
              <Text style={{ fontSize: 18, marginTop: 10, color: '#666' }}>No items in cart</Text>
            </View>
          }
          ListFooterComponent={
            cartItem.length > 0 ? (
              <View style={{marginRight:12}}>
                <View style={styles.total}>
                  <Text>SubTotal</Text>
                  <Text>Rs.{subtotal}</Text>
                </View>
                <View style={styles.total}>
                  <Text>Discount</Text>
                  <Text>- Rs.50</Text>
                </View>
                <View style={styles.amount}>
                  <Text>Total</Text>
                  <Text>Rs.{total}</Text>
                </View>
                <View style={{marginTop:25}}>
                  <Text>Payment</Text>
                  <View style={styles.cards}>
                  <Card1 width={35} height={35}/>
                  <Card2 width={35} height={35}/>
                  <Card3 width={35} height={35}/>
                  </View>
                </View>
                <View style={{marginTop:10}}>
                <CustomButton 
  title="Buy Now" 
  onPress={() => payment(() => {
    dispatch(clearCart());
    router.replace("/(tabs)/home");
  })}
/>

                </View>
              </View>
            ) : null
          }
        />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Cart;
