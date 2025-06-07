import Card from '@/components/card/card';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import coffeeProducts from '../../data/dummyData';
import { styles } from './favorites.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Favorites = () => {
  const favourites = useSelector((state: RootState) => state.favourites.items);
  console.log(favourites);

  return (
  
      <SafeAreaView style={{ flex: 1 }}>
        {favourites.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 30 }}>No Favourites Yet</Text>
        ) : (
          <>
          <View>
            <Text style={styles.subHeading}>Favourites</Text>
            <View style={styles.specialOffers}>
              <FlatList
                data={favourites}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 5 }}
                columnWrapperStyle={{
                  justifyContent: 'space-evenly',
                  marginBottom: 8,
                }}
                renderItem={({ item }) => (
                  <Card
                    {...item}
                    showHeartIcon={true}
                  />
                )}
              />
            </View>
            </View>
          </>
        )}
      </SafeAreaView>
    
  );
};

export default Favorites;
