import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Card1 from "../../../../assets/icons/visa.svg"
import { styles } from "./Cart.styles"
import CustomButton from '@/components/customButton/CustomButton'

const Cart = () => {
  return (
   <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
         <Text style={styles.font}>Cart</Text>
         <View style={styles.card}>
         <View style={styles.cardTop}>
            <Image source={require("../../../../assets/images/coffee.png")} style={styles.image}/>
            <View>
                <Text style={styles.title}>Coffee</Text>
                <Text style={styles.subtitle}>Without Sugar</Text>
                <Text style={styles.price}>Rs. 150</Text>
              </View>
         </View>
         <View style={styles.tagsContainer}> 
                <Text style={styles.tagText}>Cup Size: Small</Text>
              </View>
                <Text style={styles.tagText}>Level Sugar: No Sugar</Text>
              
           
         </View>
         <View style={styles.card}>
         <View style={styles.cardTop}>
            <Image source={require("../../../../assets/images/coffee.png")} style={styles.image}/>
            <View>
                <Text style={styles.title}>Coffee</Text>
                <Text style={styles.subtitle}>Without Sugar</Text>
                <Text style={styles.price}>Rs. 150</Text>
              </View>
         </View>
         <View style={styles.tagsContainer}> 
                <Text style={styles.tagText}>Cup Size: Small</Text>
              </View>
                <Text style={styles.tagText}>Level Sugar: No Sugar</Text>
              
           
         </View>
         <View style={styles.total}>
            <Text>SubTotal</Text>
            <Text>Rs.500</Text>
         </View>
         <View style={styles.total}>
            <Text>Discount</Text>
            <Text>- Rs.200</Text>
         </View>
         <View style={styles.amount}>
         <Text>Total</Text>
         <Text>Rs.300</Text>
         </View>
         <View>
            <Text>Payment</Text>
            <Text>
            {/* <Card1 width={10} height={10}/> */}
            </Text>
           
         </View>
        
        </View>
        <CustomButton title='Buy Now'/>
    </SafeAreaView>
   </SafeAreaProvider>
  )
}

export default Cart

