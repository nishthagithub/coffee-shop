import { Text } from '@react-navigation/elements';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as ExpoSplashScreen from 'expo-splash-screen';
import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { styles } from './splashScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
ExpoSplashScreen.preventAutoHideAsync();

const SplashScreen = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat_500Medium': require('../../../../assets/fonts/Montserrat_500Medium.ttf'),
    'Montserrat-SemiBold': require('../../../../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen once fonts are loaded
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <LinearGradient colors={['#D7A870', '#B08149']} style={styles.gradient}>
        <ImageBackground
          source={require('../../../../assets/images/splash.png')}
          style={styles.splashImage}
          resizeMode="cover"
        >
          <Image
            source={require('../../../../assets/images/cover-img.png')}
            style={styles.coverImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Coffee so good, your taste buds will love it</Text>
            <Text style={styles.subText}>The best grain, the finest roast, the most powerful flavor.</Text>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
