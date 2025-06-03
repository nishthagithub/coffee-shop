import React from 'react';
import SplashScreen from "./src/screens/splash/splashScreen";
import { useFonts } from '@expo-google-fonts/montserrat/useFonts';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat/500Medium';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat/600SemiBold';


export default function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold
  })
  return (
    <>
      <SplashScreen/>
    </>
  );
}
