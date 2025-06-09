import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from '../src/screens/login/Login'
import { useAuth } from '../src/auth/authContext'
import CustomButton from '@/components/customButton/CustomButton'
import { router } from 'expo-router'


const profile = () => {
  const {logout,user} =useAuth();
  const handleLogout =async()=>{
    await logout();
    router.replace("/src/screens/login/Login")
  }
  return (
    <View style={{flex:1}}>
      
      <View style={{ padding: 20 }}>
      {user ? (
        <>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Welcome, {user.username}</Text>
          <CustomButton title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text style={{ fontSize: 18 }}>You're not logged in.</Text>
      )}
    </View>
        
    </View>
  )
}

export default profile