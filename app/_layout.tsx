import { Stack } from 'expo-router'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const _layout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  )
}

export default _layout

