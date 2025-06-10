import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from '../src/screens/login/Login'
import { useAuth } from '../src/auth/authContext'
import CustomButton from '@/components/customButton/CustomButton'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'


const profile = () => {
  const {logout,user} =useAuth();
  const handleLogout =async()=>{
    await logout();
    router.replace("/src/screens/login/Login")
  }
  return (
    
    <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"  }}>
      {user ? (
        <>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Welcome, {user.username}</Text>
          <CustomButton title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text style={{ fontSize: 18 }}>You're not logged in.</Text>
      )}
    </View>
    </SafeAreaView>  
  )
}

export default profile