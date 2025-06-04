import Card from '@/components/card/card';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import coffeeProducts from '../../data/dummyData';
import { styles } from './homeScreen.styles';

const HomeScreen = () => {
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
   <View style={styles.pageContent} >
     <Text style={styles.text}>Good Morning, User</Text>
     <Text>BestSellers</Text>
     
     <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:12}} >
     {coffeeProducts.map((item, index) => (
       <Card
         key={index}
         title={item.title}
         price={item.price}
         imageUrl={item.imageUrl}
         hasSugar={item.hasSugar}
       />
     ))}
     </ScrollView>
  </View>
   </SafeAreaView>
</>
  );
};

export default HomeScreen;

