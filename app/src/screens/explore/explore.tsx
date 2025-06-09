import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Categories, category } from '../../data/dummyData';
import { styles } from "./explore.styles";
import { router } from 'expo-router';


const explore = () => {
    const data = Categories;
    // console.log(data)
    
    const renderCard=({item}:{item: category})=>{
        return (
        <TouchableOpacity
         style={styles.card}
         onPress={()=>
            router.push({
                pathname: '/src/screens/category/category',
                params: { categoryId: item.id },
              })
         }
         >
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
        
        <Text style={styles.text}>Explore</Text>
        
        <FlatList
         data={data}
         keyExtractor={(item) => item.id}
         numColumns={2}
         renderItem={renderCard}
         columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
         showsVerticalScrollIndicator={false}
        />
        </SafeAreaView>
    )
}

export default explore

