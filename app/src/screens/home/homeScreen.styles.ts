import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container:{
    flex:1,
    backgroundColor:"#fff"
    },
    profile:{
        width:37,
        height:37,
        borderRadius:18.5,
       
    },
    location:{
        flexDirection: "row",
        alignItems: "center",  
        gap: 8,
       
    },
    headers:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text:{
        color:"#000000",
        fontSize:14,
        fontFamily:"Montserrat_600SemiBold",
        fontWeight:"700",
        marginLeft:10
    },
    pageContent:{
        // paddingHorizontal:25
        marginLeft:15
    },
    subHeading:{
        marginTop:15,
        fontFamily:"Montserrat_600SemiBold",
        fontWeight:"bold",
        marginLeft:15
    },
    specialOffers:{
         flexDirection: 'row',
          flexWrap: 'wrap', 
          justifyContent: 'space-between'
    },
    footer:{
        alignItems:"center",
        gap:15,
        backgroundColor:"grey",
        color:"#FFFFFF"
    },
    footertext:{
        color:"#ffffff",
        fontFamily:"Montserrat_500Medium",
        
    }
    
    
})