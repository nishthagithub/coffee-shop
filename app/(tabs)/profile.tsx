import CustomButton from '@/components/customButton/CustomButton'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../src/auth/authContext'
import ImageGallery from '../src/data/ImageGallery'

const profile = () => {
  const { logout, user } = useAuth();
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [uri, setUri] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    router.replace("/src/screens/login/Login")
  }

  const handleImageSelected = (selectedUri: string) => {
    setUri(selectedUri);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        {user ? (
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

            <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>Welcome, {user.username}</Text>
            <CustomButton title="Logout" onPress={handleLogout} />
          </>
        ) : (
          <Text style={{ fontSize: 18 }}>You're not logged in.</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

export default profile