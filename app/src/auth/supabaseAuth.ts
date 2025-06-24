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
   return data;
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

 export const handleVerify = async (email: string,otp:string) => {
    if(!email){
        alert("email missing");
        return;
    }
    const {error}=await supabase.auth.verifyOtp({
        email,
        token:otp,
        type:"email"
    })
    if(error){
        alert("Invalid Otp")
        console.log(error);
    }
    else{
        router.replace("/(tabs)/home");
    }
}