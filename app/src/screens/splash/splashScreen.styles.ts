import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  splashImage: {
    width: "100%",
    height: "100%",
  },
  coverImage: {
    position: "absolute",
    top: 141,
    left:-21
  },
  textContainer: {
    position: 'absolute',
    top:463,
    left:70
},
text: {
    color: '#FFFFFF',
    fontSize:24,
    fontFamily:"Montserrat_500Medium",
    width:208,
    height:91,
    textAlign: 'center',
},
subTextContainer:{
  position: 'absolute',
  top:563,
  left:60
},
subText: {
    color: '#FFFFFF',
    fontSize:14,
    fontFamily:"Montserrat_600SemiBold",
    textAlign: 'center',
    marginTop: 8,
    width: 250,
    height:90
}
}); 