import CustomButton from '@/components/customButton/CustomButton'
import CustomInput from '@/components/CustomTextInput/CustomInput'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { loginn } from '../../auth/supabaseAuth'
import { styles } from "./login.styles"

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Format").required('Email is required'),
  password: Yup.string()
    .min(4, 'Too short')
    .required('Password is required'),
});

const Login = () => {
  const handlePress = () => {
    router.replace('/src/screens/signup/signup');
  }
  const [loading,setLoading]=useState(false)
  // const {login,user} = useAuth()
  
  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true)
    const result = await loginn(values.email, values.password);
    if (result.success) {
      router.push("/(tabs)/home");
    } 
    else {
      Alert.alert("Login Failed", result.message || "Unknown error");
    }
    setLoading(false)
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{alignItems:"center"}}>
            <Image source={require("../../../../assets/images/blackcoffee1.png")} style={styles.image}/>
          </View>
          
          <Text style={styles.header}>Login</Text>
          <Text style={styles.subHeader}>Enter Email and Password</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, handleBlur,values, errors, touched }) => (
              <>
                <View style={styles.inputContainer}>
             
                  <CustomInput 
                    style={styles.input} 
                    label={"Email"}
                    placeholder="Enter your email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    errorMessage={touched.email && errors.email ? errors.email : undefined}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                 
                </View>

                <View style={styles.inputContainer}>
                  
                  <CustomInput
                  label={"Password"}
                    style={styles.input}
                    placeholder="Enter your password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    errorMessage={touched.password && errors.password ? errors.password:undefined}
                    hidePassword
                  />
                 
                </View>

                <Text style={styles.text}>Forget Password ?</Text>
                <CustomButton 
                  title='Submit'
                  onPress={() => handleSubmit()}
                  loading={loading}
                />
                <Text style={styles.subTextt} onPress={handlePress}>
                  Didn't Have Account ?<Text style={styles.subText2}> Sign UP</Text>
                </Text>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Login