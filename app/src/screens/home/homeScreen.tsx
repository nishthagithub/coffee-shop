import Card from '@/components/card/card';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import coffeeProducts from '../../data/dummyData';
import { styles } from './homeScreen.styles';
import { router } from 'expo-router';

const HomeScreen = () => {
  // const handlePress=()=>{
  //   router.push("/src/screens/CoffeeInfo/[coffeeId]")
  // }
  return (
    <>
    
   <SafeAreaView style={styles.container}>
   <View style={styles.headers}>
    <Image source={require("../../../../assets/images/profile.png")} style={styles.profile}/>
     <View style={styles.location}>
    <Ionicons name="location-outline" size={24}  />
     <Text>Jakarta,Indonesia</Text>
    </View>
     <Ionicons name="notifications-outline" size={24}  />
   </View>
   <ScrollView>
   <View style={styles.pageContent} >
     <Text style={styles.text}>Good Morning, User</Text>
     <Text style={styles.subHeading}>Categories</Text>
     
     <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:12}} >
     {coffeeProducts.map((item, index) => (
      <TouchableOpacity
      //  onPress={handlePress}
       >
       <Card
         key={index}
         title={item.title}
         
         imageUrl={item.imageUrl}
         hasSugar={item.hasSugar}
         defaultSize={item.defaultSize}
         cupSizes={item.cupSizes}
       />
        </TouchableOpacity>
     ))}
    
     </ScrollView>
     <View>
     <Text style={styles.subHeading}>Special Offers</Text>
     <View style={styles.specialOffers}>
     {coffeeProducts.map((item, index) => (
      <View key={index} style={{ width: '48%', marginBottom: 12 }}>
        <Card
        key={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          hasSugar={item.hasSugar}
          defaultSize={item.defaultSize}
          cupSizes={item.cupSizes}
        />
      </View>
    ))}

     </View>

  </View>
  </View>
  <View style={styles.footer}>
    <Text style={styles.footertext}>
      Coffee-Shop 2025 | All Rights Reserved
    </Text>
    <Text style={styles.footertext}>
      Address . Contact . Social Media
    </Text>
  </View>
  </ScrollView>
  
  
   </SafeAreaView>
</>
  );
};

export default HomeScreen;

