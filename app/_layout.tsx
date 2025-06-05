import { Stack } from 'expo-router'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const _layout = () => {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
      <Stack.Screen 
          name="(tabs)" 
         
        />
         <Stack.Screen 
          name="index" 
          
         
        />
      
       
        
      
      </Stack>
    </SafeAreaProvider>
  )
}

export default _layout

