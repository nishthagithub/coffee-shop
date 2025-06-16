import { supabase } from "../../lib/supabase"
import CustomButton from '@/components/customButton/CustomButton'
import CustomInput from '@/components/CustomTextInput/CustomInput'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'
import { useAuth } from '../../auth/authContext'
import { styles } from "./signup.styles"

const signup = () => {
    const handlePress=()=>{
        router.replace('/src/screens/login/Login');
      }
     const {signup}= useAuth()
     const signupp =async( email: string,
      password: string,
      username: string)=>{
      const {data,error}=await supabase.auth.signUp({
        email,
        password,
        options:{
          data:{
            username:username
          }
          
        }
      })
      if (error) throw error;
      if(data){
        alert("Email has been send to mail.verify it")
        router.replace('/src/screens/login/Login');
      }
     }
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
        onSubmit={async (values) => {
          console.log('Form values:', values);
          await signupp(values.email, values.password, values.username);
          router.replace('/src/screens/login/Login');
        }}
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
                <CustomButton title='Submit' onPress={handleSubmit}/>
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

