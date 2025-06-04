import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 80,
        justifyContent:"center"
      },
      imageWrapper: {
        alignItems: 'center',
        marginTop: 40,
        
      },
      image: {
        width: 150,
        height: 120,
        resizeMode: 'contain',
      },
      title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        borderColor:"red",
        borderWidth:2
      },
      subtitle: {
        textAlign: "center",
        fontSize: 14,
        color: "#555",
        marginBottom: 24,
      },
      form: {
        marginTop: 12,
      },
      label: {
        textAlign:"left",
        fontSize: 14,
        marginBottom: 4,
        color: "#333",
        
      },
})