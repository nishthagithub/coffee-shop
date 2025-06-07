import { CupSize } from '@/components/card/card.types';
import CustomButton from '@/components/customButton/CustomButton';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import coffeeProducts from '../../data/dummyData';
import { styles } from "./Coffee.styles";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleFavourite } from '../../redux/favouriteSlice';

const CoffeeInfo = () => {
  const { coffeeId } = useLocalSearchParams();
  const coffee = coffeeProducts.find((item) => item.id === coffeeId);
  const [selectedSize, setSelectedSize] = useState<CupSize>(coffee?.defaultSize || 'small');
  const [selectedSugar, setSelectedSugar] = useState(
    coffee?.hasSugar ? 'Medium' : 'No Sugar'
  );

  const dispatch = useDispatch();
const favourites = useSelector((state: RootState) => state.favourites.items);
const isFavourite = favourites.some(item => item.id === coffee?.id);
  const selectedPrice =  coffee?.cupSizes[selectedSize] ?? 0;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{ height: 290 }}>
          
            <Image source={coffee?.imageUrl} style={styles.image} />
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <TouchableOpacity style={styles.icon} onPress={()=>router.push("/(tabs)/home")} >
            <Ionicons name='chevron-back' size={30} color="#00582F" />
            </TouchableOpacity>
            <TouchableOpacity
  style={styles.icon}
  onPress={() => {
    if (coffee) {
      dispatch(toggleFavourite(coffee));
    }
  }}
>
  <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={25} color="#FF4848" />
</TouchableOpacity>
            </View>
          </View>
          <Text style={styles.text}>{coffee?.title}</Text>
          <Text style={styles.subText}> {coffee?.hasSugar ? 'Has Sugar' : 'No Sugar'}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.heading} >Cup Sizes</Text>
          <View style={styles.cupSizesContainer}>
            {coffee && Object.entries(coffee.cupSizes).map(([size, price]) => (
              <TouchableOpacity
                key={size}
                onPress={()=>setSelectedSize(size as CupSize)}
                style={[
                  //compulary
                  styles.cupSizeBox,
                  //condition match then only apply
                  selectedSize === size && styles.cupSizeBoxActive
                ]}
              >
                <Text
                  style={[
                    styles.cupSizeText,
                    selectedSize === size && styles.cupSizeTextActive
                  ]}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.heading} >Level Sugar</Text>
          {!coffee?.hasSugar ? (
            <View style={styles.cupSizesContainer}>
              <View style={[styles.cupSizeBox, styles.cupSizeBoxActive]}>
                <Text style={[styles.cupSizeText, styles.cupSizeTextActive]}>No Sugar</Text>
              </View>
            </View>
          ) : (
            <View style={styles.cupSizesContainer}>

{['Low', 'Medium', 'High'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.cupSizeBox,
                selectedSugar === level && styles.cupSizeBoxActive,
              ]}
              onPress={() => setSelectedSugar(level)}
            >
              <Text
                style={[
                  styles.cupSizeText,
                  selectedSugar === level && styles.cupSizeTextActive,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
            </View>
          )}

        </View>
        <View style={styles.info}>
        <Text style={styles.heading} >About</Text>
        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum iusto, ipsa ipsam animi illo dolor expedita modi repudiandae nemo, corrupti praesentium quo. Possimus at non enim asperiores quis inventore sequi!...<Text style={styles.subText2}>Read More</Text></Text>
        </View>
        <CustomButton title='Add to Cart |' price={selectedPrice}/>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default CoffeeInfo

