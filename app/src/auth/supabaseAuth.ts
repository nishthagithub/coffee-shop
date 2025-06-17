import { router } from "expo-router";
import { supabase } from "../lib/supabase";

export const signupp =async( email: string,
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
    if (error){
      console.log(error)
      throw error};
    if(data){
      console.log(data)
      alert("Sign up Successfully")
    //   router.replace('/src/screens/login/Login');
    }
   }

   export const loginn=async(email: string,password: string)=>{
    const {data,error}=await supabase.auth.signInWithPassword({
      email,password
    })
    if(error){
      console.error("Login failed:", error.message);
    return false;
    }
    // console.log(data)
    return data.user;
  }
  export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  export const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session?.user || null;
  };

  export const signWithOtp=async(email: string,
    password: string,
    username: string)=>{
        const {error}=await supabase.auth.signInWithOtp({
            email,
            options:{
                shouldCreateUser:true,
                data:{username:username,password:password}
            }
        })
        if (error) {
            console.error("OTP Signin error:", error.message);
            throw error;
          }
          return true;
    
  }