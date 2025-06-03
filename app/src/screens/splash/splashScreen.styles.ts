import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  splashImage: {
    width: width,
    height: height,
  },
  coverImage: {
    position: "absolute",
    top: 141,
    left:-21
  },
  textContainer: {
    position: 'absolute',
    top:463,
    left:80
},
text: {
    color: '#FFFFFF',
    fontSize:24,
    fontFamily:"Montserrat_500Medium",
    width:208,
    height:91,
    textAlign: 'center',
},
subText: {
    color: '#FFFFFF',
    fontSize:14,
    fontFamily:"Montserrat_600SemiBold",
    textAlign: 'center',
    marginTop: 8,
    width: 208,
}
}); 