import { Stack } from 'expo-router'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthContext from "../app/src/auth/authContext"
import {Provider} from "react-redux"
import { store } from './src/redux/store'
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ActivityIndicator, View } from 'react-native'

const _layout = () => {
  const [fontsLoaded]=useFonts({'Montserrat-SemiBold':require("../assets/fonts/Montserrat-SemiBold.ttf")})
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
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
    </GestureHandlerRootView>
    </Provider>
  )
}

export default _layout

