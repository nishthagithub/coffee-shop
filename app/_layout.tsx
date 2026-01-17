import { Stack } from 'expo-router'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthContext from "../app/src/auth/authContext"

const _layout = () => {
  return (
    
    <SafeAreaProvider>
      <AuthContext>
      <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
      <Stack.Screen 
          name="(tabs)" 
         
        />
         <Stack.Screen 
          name="index" 
          
         
        />
      
       
        
      
      </Stack>
      </AuthContext>
    </SafeAreaProvider>
  )
}

export default _layout

