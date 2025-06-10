import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    
    subHeading:{
        marginTop:15,
        fontFamily:"Montserrat_600SemiBold",
        fontWeight:"bold",
        fontSize:20,
        marginLeft:25
       
    },
    specialOffers:{
         flexDirection: 'row',
          flexWrap: 'wrap', 
          justifyContent: 'space-between'
    },
    icon:{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    header:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    font:{
        fontSize: 18,
        color:"#666"
    }
})