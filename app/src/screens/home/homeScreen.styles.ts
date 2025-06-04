import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container:{
    flex:1,
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
        // marginLeft:20,
        fontSize:14,
        fontFamily:"Montserrat_600SemiBold"
    },
    pageContent:{
        paddingHorizontal:25
    },
    
    
})