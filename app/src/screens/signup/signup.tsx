import CustomButton from '@/components/customButton/CustomButton'
import CustomInput from '@/components/CustomTextInput/CustomInput'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { addUserToDatabase, checkUserExists, signupp } from "../../auth/supabaseAuth"
import { styles } from "./signup.styles"


const signup = () => {
    const handlePress=()=>{
        router.replace('/src/screens/login/Login');
      }
      const [loading, setLoading] = useState(false);

    // New function to handle signup logic
    const handleSignup = async (values: { email: string; password: string; username: string }) => {
      setLoading(true);
      try {
        const userExists = await checkUserExists(values.email);
        console.log('Checking if user exists for email:', values.email);
      if (userExists) {
        console.log(userExists)
        Alert.alert("User Already Exists", "An account with this email already exists.");
        setLoading(false);
        return;
      }
      const result = await signupp(values.email, values.password, values.username);
      
      if (result.success) {
        
        Alert.alert(
          "OTP Sent",
          `An OTP has been sent to ${values.email}`,
          [
            {
              text: "OK",
              onPress: () => {
                router.push({
                  pathname: '/src/screens/signup/verifyOtp',
                  params: { email: values.email }
                });
              }
            }
          ]
        );
      } else {
        Alert.alert("Signup Failed", result.message || "Unknown error");
      }
      } catch (error) {
        console.error("Signup error:", error);
    Alert.alert("Error", "Something went wrong.");
      }
      
      setLoading(false)
    };

    const signupSchema= Yup.object().shape({
        username:Yup.string().required("username is required"),
        email: Yup.string().email("Incorrect Format").required('Email is required'),
        password: Yup.string().min(4, 'Too short').required('Password is required'),
    })
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{alignItems:"center"}}>
         
        <Image source={require("../../../../assets/images/blackcoffee1.png")} style={styles.image}/>
        </View>
        
        <Text style={styles.header}>Sign Up</Text>

        <Text style={styles.subHeader}>Enter your credentials to continue</Text>
        <Formik   
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={signupSchema}
        onSubmit={handleSignup}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={false}
        >
          {({ handleChange,handleBlur, handleSubmit, values, errors, touched }) => {
            
            return (
              <>
                <View style={styles.inputContainer}>
                  
                  <CustomInput 
                  label={"Username"}
                    style={styles.input} 
                    placeholder="Enter your Username" 
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    errorMessage={touched.username && errors.username?errors.username:undefined}
                  />
                 
                </View>

                <View style={styles.inputContainer}>
                  
                  <CustomInput 
                    style={styles.input} 
                    label={"Email"}
                    placeholder="Enter your email" 
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    errorMessage={touched.email&& errors.email?errors.email:undefined}
                  />
                  
                </View>

                <View style={styles.inputContainer}>
                 
                  <CustomInput
                    style={styles.input}
                    label={"Password"}
                    placeholder="Enter your password"
                    hidePassword
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    errorMessage={touched.password && errors.password? errors.password:undefined}
                  />
                  
                </View>
                
                <Text>By continuing you agree to our <Text style={styles.text}>Terms of Service {""}</Text>
                and <Text style={styles.text}>Privacy Policy</Text></Text>
                <CustomButton title='Submit'  onPress={handleSubmit} loading={loading}/>
                <Text style={styles.subTextt} onPress={handlePress}>Have Account ?<Text style={styles.text}> Login</Text></Text>
              </>
            );
          }}
        </Formik>
      </View>
    
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default signup

