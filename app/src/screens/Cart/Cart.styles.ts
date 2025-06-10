import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container:{
    flex:1,
    backgroundColor:"#fff",
  
    
},
font:{
 fontSize:18,
fontWeight:500,
marginBottom:16,
marginTop:10
},
content:{
    marginLeft:25,
    marginRight:25,
    flex:1
},
card:{
    borderRadius: 12,
    width: '97%',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 16,
    elevation:4,
},
cardTop: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
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
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection:"row",
    justifyContent: 'space-between', // This ensures spacing
  alignItems: 'center',
    marginTop: 12,
  },
  tags:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 'auto',
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
  tagfont:{
  fontSize:18,
  fontWeight:500
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
  },
  
  cards:{
    marginTop:10,
    flexDirection:"row",
    gap:18
  }
})