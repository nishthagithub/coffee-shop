
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle,Text, TouchableOpacity, TextStyle } from 'react-native'


interface customBtn {
    title:string,
    onPress?:()=>void,
    buttonStyle?:StyleProp<ViewStyle>,
    textStyle?:StyleProp<TextStyle>
}

const CustomButton:React.FC<customBtn> = ({title,buttonStyle,onPress,textStyle}) => {
  return (
   <View style={styles.container}>
    <TouchableOpacity style={[styles.button,buttonStyle]} onPress={onPress}>
         <Text style={[styles.text, textStyle]}>{title}</Text>

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
    height:38,
    justifyContent: 'center', 
    alignItems: 'center',
   
 },
 text:{
    color:"#ffffff",  
 }
})