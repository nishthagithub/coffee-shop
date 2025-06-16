import * as React from 'react';
import { Button, View, Text } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const CLIENT_ID = '188026004530-6krh326rikf417mv0hn6t464j89jdu7r.apps.googleusercontent.com';
// const config: AuthRequestConfig = {
//     clientId: "google",
//     scopes: ["openid", "profile", "email"],
//     redirectUri: makeRedirectUri(),
//   };

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
};

export default function Data() {
  const [userInfo, setUserInfo] = React.useState(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({
        // useProxy: true, // Use Expo proxy for Expo Go
      }),
      scopes: ['openid', 'profile', 'email'],
      responseType: 'token',
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      fetchUserInfo(access_token);
    }
  }, [response]);

  const fetchUserInfo = async (token: string) => {
    let res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json();
    setUserInfo(user);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Login with Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
      {/* {userInfo && <Text>Welcome, {userInfo.name}</Text>} */}
    </View>
  );
}