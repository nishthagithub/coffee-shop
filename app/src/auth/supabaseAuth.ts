import { supabase } from "../lib/supabase";

export const signupp = async (
  email: string,
  password: string,
  username: string
):Promise<{ success: boolean; message?: string }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });
    if (error) {
      console.log(error);
      return {success:false,message:"signup failed"}
    }
    return {success:true};
  } catch (error) {
    console.error("Signup failed:", error);
    return {success:false,message: "An unexpected error occurred."}
  }
};

export const loginn = async (email: string, password: string):Promise<{ success: boolean; message?: string }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login failed:", error.message);
      return  {success:false,message:"login failed"};
    }
    return {success:true};
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session?.user || null;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};

export const verifyOtps = async (email: string, otp: string): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!email) {
      return { success: false, message: "Email is missing." };  
    }
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    if (error) {
      return { success: false, message: "Invalid OTP" };
    } 
    return { success: true };
  } catch (error) {
    console.error("OTP verification error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
};

export const addUserToDatabase = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    const { data, error } = await supabase.auth.getUser();
    console.log(JSON.stringify(data,null,2))
    const user = data.user;
    if (error || !user) {
      return { success: false, message: "User not found" };
    }
    const { data: existingUser, error: fetchError } = await supabase
      .from('Users')
      .select('id')
      .eq('id', user.id)
      .single();
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116: No rows found
      return { success: false, message: fetchError.message };
    }
    if (existingUser) {
      return { success: false, message: "User Already Exists" };
    }
    const { error: insertError } = await supabase.from('Users').insert([
      {
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username || user.email,
      },
    ]);
    if (insertError) {
      return { success: false, message: insertError.message };
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred." };
  }
};

export const checkUserExists = async (email: string) => {
  try {
    const { data, error } = await supabase
    .rpc('check_user_exists', { user_email: email });
    if (error) {
      return false; 
    }
    // If your RPC returns an array, check if it's empty
    return Array.isArray(data) ? data.length > 0 : !!data;
  } catch (error) {
    return false;
  }
};