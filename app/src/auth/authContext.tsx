import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const authContext = () => {
  const [email,setEmail]=useState("");
  
  return (
    <View>
      <Text>authContext</Text>
    </View>
  )
}

export default authContext

const styles = StyleSheet.create({})