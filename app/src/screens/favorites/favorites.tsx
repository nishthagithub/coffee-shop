import Card from '@/components/card/card';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { supabase } from '../../lib/supabase';
import { RootState } from '../../redux/store';
import { styles } from './favorites.styles';
import { ActivityIndicator } from 'react-native-paper';

const Favorites = () => {
  // const favourites = useSelector((state: RootState) => state.favourites.items);
  // const favouriteIds = favourites.map(item => item.id);
  const [favouritesList, setFavouritesList] = useState<any[]>([]);
  const favouriteIds = favouritesList.map(item => item.id);
  const userId = useSelector((state: RootState) => state.user.id);
  const [loading,setLoading]=useState(true)


 
const handleData=async()=>{
  try {
    const {data,error}=await supabase.from("favourites") .select(`
      product_id,
      coffee_products (
        id,
        title,
        imageUrl,
        hasSugar,
        defaultSize,
        cupSizes,
        category_id
      )
    `)
    .eq('user_id', userId); 
  
    if(error){
      console.log("error getting items" ,error)
    }
    else {
      const cleaned = data.map(item => item.coffee_products);
      setFavouritesList(cleaned);
    }
    setLoading(false)
  } catch (error) {
    console.log("catch error")
  }
}
useFocusEffect(
  useCallback(() => {
    handleData();
  }, [userId])
);


  return (
  
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    {loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    ) : favouritesList.length === 0 ? (
      <View style={styles.header}>
        <Text style={styles.font}>No Favourites Yet</Text>
      </View>
    ) : (
      <View>
        <Text style={styles.subHeading}>Favourites</Text>
        <View style={styles.specialOffers}>
          <FlatList
            scrollEnabled={true}
            data={favouritesList}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            columnWrapperStyle={
              favouritesList.length === 1
                ? { justifyContent: 'flex-start', marginBottom: 8, marginLeft: 15 }
                : { justifyContent: 'space-evenly', marginBottom: 8 }
            }
            renderItem={({ item }) => (
              <Card
                {...item}
                id={item.id.toString()}
                showHeartIcon={true}
                favouriteIds={favouriteIds}
              />
            )}
          />
        </View>
      </View>
    )}
  </SafeAreaView>
  
    
  );
};

export default Favorites;
