import Card from '@/components/card/card'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import coffeeProducts from '../../data/dummyData'
import { styles } from "./favorites.styles"

const favorites = () => {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{   paddingHorizontal:25}}>
    <Text style={styles.subHeading}>Favourites</Text>
    <View style={styles.specialOffers}>
    {coffeeProducts.map((item, index) => (
     <TouchableOpacity  key={item.id}
     onPress={() => router.push(`/src/screens/CoffeeInfo/${item.id}`)} style={{ width: '48%', marginBottom: 12 }}>
       <Card
       key={item.id}
         title={item.title}
         imageUrl={item.imageUrl}
         hasSugar={item.hasSugar}
         defaultSize={item.defaultSize}
         cupSizes={item.cupSizes}
         showHeartIcon={true}
       />
     </TouchableOpacity>
   ))}

    </View>

 </ScrollView>
 </SafeAreaView>
 </SafeAreaProvider>
  )
}

export default favorites