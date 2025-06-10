import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:"#fff"
    },
    listContent: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 10,
      },
      row: {
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      text:{
     fontSize:18,
     fontWeight:500,
     marginLeft:20,
     marginTop:10
      },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor: "#53B1751a",
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 4,
        width:320,
        height:200,
        marginBottom:10,
        
        
      },
      category:{
       fontSize:14,
       fontWeight:400
      },
      image: {
        width: 80,
        height: 80,
        marginBottom: 8,
      },
      title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      },
})