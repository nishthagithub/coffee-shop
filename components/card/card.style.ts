import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 193,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'flex-start',
    marginTop:10
  },
  image: {
    width: 140,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius:10,
    alignSelf: 'center',
  },
  type:{
    fontSize:10,
    color:"#000000",
    fontFamily:"MoMontserrat_600SemiBold"
  },
  title: {
    fontSize: 14,
   fontFamily:"Montserrat_600SemiBold",
    marginTop: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  icon:{
flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  }
});

export default styles;
