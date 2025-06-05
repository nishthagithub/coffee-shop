import { Stack } from 'expo-router'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import signup from './src/screens/signup/signup'

const _layout = () => {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="(tabs)" 
         
        />
        <Stack.Screen 
          name="index" 
         
        />
        <Stack.Screen
         name="signup"
         
        />
      </Stack>
    </SafeAreaProvider>
  )
}

export default _layout

