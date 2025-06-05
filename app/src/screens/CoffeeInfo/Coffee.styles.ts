import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    card: {
        width: 200,
        height: 120,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: '#ccc',
      },
      image: {
        position: 'absolute',
        width: "100%", // Larger than card
        height: 400, // Larger than card
        top: -38,    // Adjust to "slide" the image vertically
        // left: -40,   // Adjust to "slide" the image horizontally
      },
      text:{
        color:"#fff",
        fontSize:36,
        fontFamily:"Montserrat_600SemiBold",
        marginLeft:15
      },
      subText:{
        color:"#fff",
        fontSize:14,
        fontFamily:"Montserrat_600SemiBold",
        marginLeft:15
      },
      info:{
        marginLeft:15,
        marginTop:15,
        marginRight:10
      },
      cupSizesContainer: {
        flexDirection: 'row',
        justifyContent:"space-between",
        marginTop: 8,
       
      },
      cupSizeBox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8, 
        backgroundColor: '#fff',
        
      },
      cupSizeBoxActive: {
        backgroundColor: '#00512C', 
        width:80,
        borderRadius:20,
      },
      cupSizeText: {
        fontSize: 14,
        color: '000000',
        textAlign:"center",
        fontFamily:"Montserrat_600SemiBold"
      },
      cupSizeTextActive: {
        color: '#fff',
        fontWeight: 'bold',
      },
      heading:{
        color:"#000",
        fontSize:18,
        fontFamily:"Montserrat_600SemiBold"
      },
      subText2:{
        color:"#80A896"
      },
      icon:{
        borderRadius:20,
        backgroundColor:"#fff",
        width:30,
        height:30,
        marginLeft:10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10
      }
      
})