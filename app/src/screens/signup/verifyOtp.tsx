import CustomButton from '@/components/customButton/CustomButton'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../../lib/supabase'
import { addUserToDatabase, verifyOtps } from '../../auth/supabaseAuth'

const verifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [loading,setLoading]=useState(false)
    const { email } = useLocalSearchParams<{ email: string }>();
    const onSubmit = async () => {
      setLoading(true)
       const result= await verifyOtps(email, otp); 
       if(result.success){
        alert("OTP verified successfully!");
        
        router.replace("(tabs)/home")
       }
       else{
        alert(result.message || "OTP verification failed.");
       }
       setLoading(false)
      };
  return (
    <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Enter OTP</Text>
      <Text style={styles.subHeader}>Check your email for a 6-digit code</Text>
      <Text>Email send to {email}</Text>
      <TextInput
        style={styles.otpInput}
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
      />
      <CustomButton title="Verify OTP" onPress={onSubmit} loading={loading} />
    </SafeAreaView>
  )
}

export default verifyOtp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
      },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
      },
      subHeader: {
        fontSize: 16,
        marginBottom: 10,
      },
      otpInput: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
      },
})