import Card from '@/components/card/card';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { styles } from './favorites.styles';

const Favorites = () => {
  const favourites = useSelector((state: RootState) => state.favourites.items);
  console.log(favourites);

  return (
  
      <SafeAreaView style={{ flex: 1,backgroundColor:"#fff" }}>
        {favourites.length === 0 ? (
          <View style={styles.header}>
            <Text style={styles.font}>No Favourites Yet</Text>
          </View>
        ) : (
          <>
          <View>
            <Text style={styles.subHeading}>Favourites</Text>
            <View style={styles.specialOffers}>
              <FlatList
              scrollEnabled={true}
                data={favourites}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 5 }}
                columnWrapperStyle={
                  favourites.length === 1
                    ? { justifyContent: 'flex-start', marginBottom: 8,marginLeft:15}
                    : { justifyContent: 'space-evenly', marginBottom: 8 }
                }
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
