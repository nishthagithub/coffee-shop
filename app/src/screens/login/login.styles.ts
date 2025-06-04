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
    color: "#555",
  },
  inputContainer: {
    width: "95%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    // marginBottom: 6,
    color: "#333",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#888",
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor:"#ffffff",
    paddingHorizontal: 0,
    
  },
})