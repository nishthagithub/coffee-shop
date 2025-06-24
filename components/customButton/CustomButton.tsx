
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle,Text, TouchableOpacity, TextStyle, TouchableOpacityProps } from 'react-native'


interface customBtn extends TouchableOpacityProps {
    title:string,
    onPress?:()=>void,
    buttonStyle?:StyleProp<ViewStyle>,
    textStyle?:StyleProp<TextStyle>,
    price?:number,
    loading?:boolean
}

const CustomButton:React.FC<customBtn> = ({title,buttonStyle,onPress,textStyle,price,loading=false,...props}) => {
  return (
   <View style={styles.container}>
    <TouchableOpacity style={[styles.button,buttonStyle,loading && { opacity: 0.6 }]}
     onPress={onPress}
     disabled={loading}
     {...props}>
      <View style={{flexDirection:"row"}}>

         <Text style={[styles.text, textStyle]}>
         {loading ? "Loading..." : title}
          </Text>
         {!loading && price !== undefined && (
          <Text style={{color:"#fff"}}> ₹{price}</Text>
        )}
      </View> 
    </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{
   alignItems:"center",
   marginTop:10
    },
 button:{
    backgroundColor:"#00512C",
    width:330,
    borderRadius: 20,
    height:45,
    justifyContent: 'center', 
    alignItems: 'center',
   
 },
 text:{
    color:"#ffffff",  
 }
})