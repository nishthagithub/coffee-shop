import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:"#fff"
    },
    text:{
        marginLeft:25,
        fontSize:18,
        fontWeight:500,
        marginTop:10
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    category:{
        flexDirection:"row",
        alignItems:"center",
        gap:10
    },
    subheader:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginRight:10
    }
})