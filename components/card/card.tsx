import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './card.style';
import { productCardProps } from "./card.types";

const Card = ({imageUrl, title,hasSugar,defaultSize,cupSizes,showHeartIcon}: productCardProps) => {
  return (
    <View style={styles.card}>
      <Image 
        source={imageUrl} 
        style={styles.image} 
        resizeMode="cover" 
      />
     <View style={styles.icon}>
        <Text style={styles.title}>{title}</Text>
        {showHeartIcon && (
            <Ionicons name="heart-outline" size={17} color="#FF4848" style={{marginTop:8}} />
        )}
      </View>
      <Text style={styles.type}>{hasSugar?"With Sugar":"Without Sugar"}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.price}>Rs.{cupSizes?.[defaultSize] ?? "N/A"}</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={30.25} color="#00512C"  />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Card

