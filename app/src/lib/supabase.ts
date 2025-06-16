import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';
// dotenv.config();
const supabaseUrl = process.env.EXPO_PUBLIC_URLKEY as string
const supabaseAnonKey = process.env.EXPO_PUBLIC_ANONKEY as string
console.log("Supabase URL:", supabaseUrl); 
console.log("Supabase Key:", supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })