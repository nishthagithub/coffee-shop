import CustomInput from '@/components/CustomTextInput/CustomInput'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { styles } from "./login.styles"

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
   <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: '100%', 
         
        }}>
          <Image source={require("../../../../assets/images/blackcoffee1.png")} style={{width:120}}/>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label} >Email</Text>
          <CustomInput label="email" customStyle={{ marginBottom: 6 }} />

          <Text style={styles.label}>Password</Text>
          <CustomInput label="password" hidePassword />
        </View>
    </SafeAreaView>
  )
}

export default Login