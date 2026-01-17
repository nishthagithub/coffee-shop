import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  image:{
   width:120
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 24,
    color: "#7C7C7C",
  },
  inputContainer: {
    width: "95%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#7C7C7C",
  },
  input: {
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor:"#ffffff",
    paddingHorizontal: 0,
  },
  text:{
    textAlign:"right",
    marginRight:12,
    fontSize:12,
    color:"#000000",
    fontFamily:"Montserrat_600SemiBold",
    fontWeight:"700"
  },
  subTextt:{
    textAlign:"center",
    marginTop:10,
    color:"#000000",
    fontFamily:"Montserrat_600SemiBold",
    fontWeight:"500"
  },
  subText2:{
    color:"#80A896"
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
})