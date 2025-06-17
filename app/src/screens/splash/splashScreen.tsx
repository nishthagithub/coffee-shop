import { Text } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { useAuth } from '../../auth/authContext';
import { styles } from './splashScreen.styles';
import { getCurrentUser } from '../../auth/supabaseAuth';

const SplashScreen = () => {
  const router = useRouter();
  // const { checkAuth } = useAuth();

  useEffect(() => {
    const userAuth = async () => {
      const isAuthenticated = await getCurrentUser();
      if (isAuthenticated) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/src/screens/login/Login");
      }
    }

    const timeout = setTimeout(() => {
      userAuth();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#D7A870', '#B08149']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ImageBackground
          source={require('../../../../assets/images/splash.png')}
          style={styles.splashImage}
        >
          <Image
            source={require('../../../../assets/images/cover-img.png')}
            style={styles.coverImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Coffee so good, your taste buds will love it</Text>
          </View>
          <View style={styles.subTextContainer}>
            <Text style={styles.subText}>The best grain, the finest roast, the most powerful flavor.</Text>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;
