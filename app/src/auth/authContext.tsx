import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, ReactNode, useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserData={
  username:string,
  password:string,
  email:string
}
type AuthContextProps={
  user:UserData|null,
  signup:(userData:UserData)=>Promise<void>
  login:(email: string, password: string) => Promise<boolean>;
  logout:()=>Promise<void>
}
const AuthContexts = createContext<AuthContextProps | undefined>(undefined)

const authContext = ({children}:{children:ReactNode}) => {
 const [user,setUser]=useState<UserData|null>(null);
 const signup=async(userData:UserData)=>{
  await AsyncStorage.setItem("user",JSON.stringify(userData))
  setUser(userData);
  console.log(user)
 }

 const login=async(email:string,password:string)=>{
  const stored = await AsyncStorage.getItem('user');
  if(stored){
    const storedUser: UserData = JSON.parse(stored);
    if (storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      return true;
    }
  }
  return false
 }
 const logout = async () => {
  await AsyncStorage.removeItem('user');
  setUser(null);
};
  
  return (
    <AuthContexts.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContexts.Provider>
  )
}
//custom Hook 
export const useAuth = () => {
  const context = useContext(AuthContexts);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default authContext


const styles = StyleSheet.create({})