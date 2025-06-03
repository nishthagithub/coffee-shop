import { Text } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { styles } from './splashScreen.styles';

const SplashScreen = () => {
  const router = useRouter();
  
  const handlePress = () => {
    router.replace('/src/screens/home/homeScreen');
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <LinearGradient
        colors={['#D7A870', '#B08149']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ImageBackground
          source={require('../../../../assets/images/splash.png')}
          style={styles.splashImage}
          // resizeMode="cover"
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
    </TouchableOpacity>
  );
};

export default SplashScreen;
