import CustomInput from '@/components/CustomTextInput/CustomInput'
import React from 'react'
import { Button, Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { styles } from "./signup.styles"
import CustomButton from '@/components/customButton/CustomButton'
import { router } from 'expo-router'

const signup = () => {
    const handlePress=()=>{
        router.replace('/src/screens/login/Login');
      }
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{alignItems:"center"}}>
         
        <Image source={require("../../../../assets/images/blackcoffee1.png")} style={styles.image}/>
        </View>
        
        <Text style={styles.header}>Sign Up</Text>

        <Text style={styles.subHeader}>Enter your credentials to continue</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <CustomInput style={styles.input} placeholder="Enter your Username" />
        </View>

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
        <Text>By continuing you agree to our <Text style={styles.text}>Terms of Service {""}</Text>
        and <Text style={styles.text}>Privacy Policy</Text></Text>
        <CustomButton title='Submit'/>
        <Text style={styles.subTextt} onPress={handlePress}>Have Account ?<Text style={styles.text}> Login</Text></Text>
      </View>
    
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default signup

