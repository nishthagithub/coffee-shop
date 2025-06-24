import CustomButton from '@/components/customButton/CustomButton'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import ImageGallery from '../src/data/ImageGallery'
import { supabase } from '../src/lib/supabase'
import { AppDispatch, RootState } from '../src/redux/store'
import { fetchUserData } from '../src/redux/userSlice'

const profile = () => {
  // const { logout, user } = useAuth();
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [uri, setUri] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { username, email, id, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleLogout = async () => {
    dispatch({ type: 'user/logout' }); // Optionally handle user state reset if you have a logout action
    await supabase.auth.signOut();
    router.replace("/src/screens/login/Login")
  }

  const handleImageSelected = (selectedUri: string) => {
    setUri(selectedUri);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        {id ? (
          <>
            <TouchableOpacity onPress={() => setShowImageGallery(true)}>
              {uri ? (
                <Image 
                  source={{ uri }} 
                  style={{ width: 100, height: 100, borderRadius: 50 }} 
                />
              ) : (
                <Image 
                  source={require("../../assets/images/profile.png")} 
                  style={{ width: 100, height: 100, borderRadius: 50 }} 
                />
              )}
            </TouchableOpacity>

            <ImageGallery 
              isVisible={showImageGallery}
              onClose={() => setShowImageGallery(false)}
              onImageSelected={handleImageSelected}
            />

<Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>
      Welcome, {username || "User"}
    </Text>
            <CustomButton title="Logout" onPress={handleLogout} loading={loading} />
          </>
        ) : (
          <Text style={{ fontSize: 18 }}>You're not logged in.</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

export default profile