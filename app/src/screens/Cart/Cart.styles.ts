import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container:{
    flex:1,
    backgroundColor:"#fff",
    
},
font:{
 fontSize:20,
fontWeight:500
},
content:{
    marginLeft:25,
    fontSize:20,
    fontWeight:500
},
card:{
    borderRadius: 12,
    width: '90%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    elevation:4,
    marginTop:15
   
},
cardTop: {
    flexDirection: 'row',
    gap:10
  },
  image: {
    width: 144,
    height: 105,
    // resizeMode: 'contain',
  },
 
  contents:{
    color:"#686868",
    fontSize:14
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  tagsContainer: {
    marginTop: 12,
  },
  tag: {
    color:"#686868",
    fontSize:14,
  },
  tagText: {
    color:"#686868",
    fontSize:14,
    fontWeight: '500',
  },
  total:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginRight:15
  },
  amount:{
    marginTop:15,
    flexDirection:"row",
    justifyContent:"space-between",
    marginRight:15
  },
  payment: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 15
  }
})