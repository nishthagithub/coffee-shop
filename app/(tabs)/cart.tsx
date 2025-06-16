import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Cart from '../src/screens/Cart/Cart';


const cart = () => {
  const publihserKey =process.env.EXPO_PUBLIC_API_URL
  return (
    <StripeProvider publishableKey={publihserKey}>
      <Cart/>
    </StripeProvider>
    
  )
}

export default cart

const styles = StyleSheet.create({})