import { Stack } from 'expo-router'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthContext from "../app/src/auth/authContext"
import {Provider} from "react-redux"
import { store } from './src/redux/store'

const _layout = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default _layout

