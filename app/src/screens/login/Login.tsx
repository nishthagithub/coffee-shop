import CustomButton from '@/components/customButton/CustomButton'
import CustomInput from '@/components/CustomTextInput/CustomInput'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { useAuth } from '../../auth/authContext'
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
  const {login,user} = useAuth()

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const success = await login(values.email, values.password);
      if (success) {
        router.push("/(tabs)/home");
        console.log(user)
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("An error occurred during login");
    }
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