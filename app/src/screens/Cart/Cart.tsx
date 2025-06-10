import CustomButton from '@/components/customButton/CustomButton'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import Card2 from "../../../../assets/icons/card2.svg"
import Card3 from "../../../../assets/icons/card3.svg"
import Card1 from "../../../../assets/icons/visa.svg"
import { decrement, increment } from '../../redux/cartSlice'
import { RootState } from '../../redux/store'
import { styles } from "./Cart.styles"

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 100
  const total = subtotal - discount;
  const favourites = useSelector((state: RootState) => state.favourites.items);

  const renderItem = ({ item }: any) => {
    const isFavourite = favourites.some(fav => fav.id === item.id);
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Image source={item.imageUrl} style={styles.image} />
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
            onPress={() => dispatch(decrement({
              id: item.id, 
              selectedSize: item.selectedSize, 
              selectedSugar: item.selectedSugar
            }))} 
            size={30.25} 
            color="#00512C" 
          />
          <Text style={styles.tagfont}>{item.quantity}</Text>
          <Ionicons 
            name="add-circle" 
            onPress={() => dispatch(increment({
              id: item.id, 
              selectedSize: item.selectedSize, 
              selectedSugar: item.selectedSugar
            }))} 
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
          data={cartItems}
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
            cartItems.length > 0 ? (
              <View style={{marginRight:12}}>
                <View style={styles.total}>
                  <Text>SubTotal</Text>
                  <Text>Rs.{subtotal}</Text>
                </View>
                <View style={styles.total}>
                  <Text>Discount</Text>
                  <Text>- Rs.100</Text>
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
                <CustomButton title="Buy Now" />
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
