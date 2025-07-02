import { supabase } from '@/app/src/lib/supabase';
import { addToCart } from '@/app/src/redux/cartSlice';
import { RootState } from '@/app/src/redux/store';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './card.style';
import { productCardProps } from "./card.types";

const Card = ({imageUrl, title,hasSugar,defaultSize,cupSizes,showHeartIcon,id,favouriteIds}: productCardProps) => {
  const dispatch =useDispatch();
  const [isFavourite, setIsFavourite] = useState((favouriteIds ?? []).includes(id));
  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    setIsFavourite((favouriteIds ?? []).includes(id));
  }, [favouriteIds, id]); 
  
  const handleFavoriteItem = async () => {
    if (isFavourite) {
      const { error } = await supabase
        .from('favourites')
        .delete()
        .match({ user_id: userId, product_id: id });
  
      if (!error) {
        setIsFavourite(false);
      } else {
        console.error("Unfavourite error:", error.message);
      }
    } else {
      const { error } = await supabase
        .from('favourites')
        .insert([{ user_id: userId, product_id: id }]);
  
      if (!error) {
        setIsFavourite(true);
      } else {
        console.error("Favourite error:", error.message);
      }
    }
  };
  
  const Addtocart=()=>{
    dispatch(addToCart({
      id,
      imageUrl,
      title,
      price: defaultSize && cupSizes?.[defaultSize] ? cupSizes[defaultSize] : 0,
      selectedSize:defaultSize,
      selectedSugar: hasSugar ? "Medium" : "No Sugar",
      quantity:1,
      hasSugar: hasSugar ?? false
    }))
  }
  
  return (
    <View style={styles.card}>
      <Image 
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        style={styles.image} 
        resizeMode="cover" 
      />
      <View style={{padding:6}}>
     <View style={styles.icon}>
        <Text style={styles.title}>{title}</Text>
        {showHeartIcon && (
          <TouchableOpacity onPress={()=>handleFavoriteItem()}>
            <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={17} color="#FF4848" style={{marginTop:8}} />
            </TouchableOpacity>
        )}
      </View>
      <Text style={styles.type}>{hasSugar?"With Sugar":"Without Sugar"}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.price}>Rs.{cupSizes?.[defaultSize] ?? "N/A"}</Text>
        <TouchableOpacity>
          <Ionicons
           name="add-circle"
           onPress={Addtocart} 
           size={30.25} color="#00512C"  />
        </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

export default Card

