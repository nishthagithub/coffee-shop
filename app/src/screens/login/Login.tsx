import CustomInput from '@/components/CustomTextInput/CustomInput'
import React from 'react'
import { Button, Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { styles } from "./login.styles"
import CustomButton from '@/components/customButton/CustomButton'
import { Link } from 'expo-router'

const Login = () => {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{alignItems:"center"}}>
         
        <Image source={require("../../../../assets/images/blackcoffee1.png")} style={styles.image}/>
        </View>
        
        <Text style={styles.header}>Login</Text>

        <Text style={styles.subHeader}>Enter Email and Password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <CustomInput style={styles.input} placeholder="Enter your email" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <CustomInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            hidePassword
          />
        </View>
        <Text style={styles.text}>Forget Password ?</Text>
        <CustomButton title='Submit'/>
        <Text style={styles.subTextt}>Didn't Have Account ? Sign UP</Text>
      </View>
    
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default Login