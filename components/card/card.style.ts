import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: 148,
    height: 193,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'flex-start',
  },
  image: {
    width: 144,
    height: 100,
    borderRadius: 10,
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
});

export default styles;
