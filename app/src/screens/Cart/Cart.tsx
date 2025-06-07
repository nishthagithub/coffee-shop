import CustomButton from '@/components/customButton/CustomButton'
import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { styles } from "./Cart.styles"

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 100
  const total = subtotal - discount;

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Image source={item.imageUrl} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.selectedSugar}</Text>
          <Text style={styles.price}>Rs. {item.price}</Text>
        </View>
      </View>
      <View style={styles.tagsContainer}>
        <Text style={styles.tagText}>Cup Size: {item.selectedSize}</Text>
        <Text style={styles.tagText}>Level Sugar: {item.selectedSugar}</Text>
        <Text style={styles.tagText}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{marginLeft:20}}>
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
          ListFooterComponent={
            <View style={{}}>
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
              <View>
                <Text>Payment</Text>
              </View>
              <CustomButton title="Buy Now" />
            </View>
          }
        />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Cart;
