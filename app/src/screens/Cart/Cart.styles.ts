import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container:{
    flex:1,
    backgroundColor:"#fff",
  
    
},
font:{
 fontSize:20,
fontWeight:500,
marginBottom:16
},
content:{
    marginLeft:25,
    marginRight:25,
    flex:1
},
card:{
    borderRadius: 12,
    width: '90%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    elevation:4,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4
},
cardTop: {
    flexDirection: 'row',
    gap:16
  },
  image: {
    width: 144,
    height: 105,
    borderRadius: 8
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
    gap:8
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
  priceSummary: {
    marginTop: 24,
    marginBottom: 24
  },
  total:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:12
  },
  totalText: {
    fontSize: 16,
    color: '#333'
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  amount:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:12,
    paddingTop:12,
    borderTopWidth:1,
    borderTopColor: '#eee'
  },
  payment: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  paymentText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  }
})