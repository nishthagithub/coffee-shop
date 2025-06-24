import Card from '@/components/card/card';
import { CupSize } from '@/components/card/card.types';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getCurrentUser } from '../../auth/supabaseAuth';
import { supabase } from '../../lib/supabase';
import { styles } from './homeScreen.styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserData } from '../../redux/userSlice';

type products={
  id: string;
  title: string;
  imageUrl: any;
  hasSugar: boolean;
  defaultSize: CupSize;
  cupSizes: Record<CupSize, number>;
  category_id:string
}


const HomeScreen = () => {
  const [coffeeData,setCoffeeData]=useState<products[]>([])
  const [loading,setLoading]=useState(true)
  const dispatch = useDispatch<AppDispatch>();
 
  const username = useSelector((state: RootState) => state.user.username);
  // console.log("user",username)
  

  const fetchData=async()=>{
    const {data,error}=await supabase.from("coffee_products").select("*")
    if(error){
      console.log("error",error.message)
  }
  else{
    setCoffeeData(data || [])
  }
  setLoading(false)
  }
  useEffect(()=>{
    fetchData();
    dispatch(fetchUserData());
  },[])

  return (
    <>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <View>
            <View style={styles.headers}>
              <Image source={require("../../../../assets/images/profile.png")} style={styles.profile} />
              <View style={styles.location}>
                <Ionicons name="location-outline" size={24} />
                <Text>Jakarta,Indonesia</Text>
              </View>
              <Ionicons name="notifications-outline" size={24} />
            </View>
            <View>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 8 }}>
                <View style={styles.pageContent} >
                  <Text style={styles.text}> {loading ? 'Loading...' : `Welcome, ${username}`}</Text>
                  <Text style={styles.subHeading}>Categories</Text>
                  <FlatList
                    horizontal
                    data={coffeeData}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8, paddingHorizontal: 5 }}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => router.push(`/src/screens/CoffeeInfo/${item.id}`)}
                      >
                        <Card
                          id={item.id}
                          title={item.title}
                          imageUrl={item.imageUrl}
                          hasSugar={item.hasSugar}
                          defaultSize={item.defaultSize}
                          cupSizes={item.cupSizes}
                        />
                      </TouchableOpacity>
                    )}
                  />
                  <View>
                    <Text style={styles.subHeading}>Special Offers</Text>
                    <View style={styles.specialOffers}>
                      <FlatList
                        scrollEnabled={false}
                        data={coffeeData}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ gap: 8, paddingHorizontal: 5, paddingBottom: 25 }}
                        columnWrapperStyle={{
                          justifyContent: 'space-between',
                          marginBottom: 8,
                        }}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => router.push(`/src/screens/CoffeeInfo/${item.id}`)}
                          >
                            <Card
                              {...item}
                              showHeartIcon={true}
                            />
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

