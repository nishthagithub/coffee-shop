import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Categories } from '../../data/dummyData';
import { styles } from "./explore.styles";
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { ActivityIndicator } from 'react-native-paper';

type category={
    id:string,
    name:string,
    image:string
   }


const explore = () => {
    const [categories, setCategories] = useState<category[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchCategories=async()=>{
        const {data,error} = await supabase.from("categories").select("*");
        if(error){
            console.log("error",error.message)
        }
        else{
            setCategories(data || [])
        }
        setLoading(false)
    }
    useEffect(()=>{
     fetchCategories()
    },[])
    const data = Categories;
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
            <Image source={{uri:item.image}} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
        
        <Text style={styles.text}>Explore</Text>
        
        {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderCard}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
        </SafeAreaView>
    )
}

export default explore

