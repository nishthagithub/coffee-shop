import { Slot } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const _layout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default _layout

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})