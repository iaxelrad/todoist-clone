import { useOAuth } from '@clerk/clerk-expo';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function Index() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: googleOAuth } = useOAuth({ strategy: 'oauth_google' });
  const { top } = useSafeAreaInsets();

  const handleAppleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log('🚀 ~ handleAppleOAuth ~ createdSessionId:', createdSessionId);

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await googleOAuth();
      console.log('🚀 ~ handleAppleOAuth ~ createdSessionId:', createdSessionId);

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openLink = async () => {
    await WebBrowser.openBrowserAsync('https://google.com');
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image source={require('@/assets/images/todoist-logo.png')} style={styles.loginImage} />
      <Image source={require('@/assets/images/login.png')} style={styles.bannerImage} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleAppleOAuth} style={styles.button}>
          <Ionicons name='logo-apple' size={24} />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoogleOAuth} style={styles.button}>
          <Ionicons name='logo-google' size={24} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoogleOAuth} style={styles.button}>
          <Ionicons name='mail' size={24} />
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          By continuing, you agree to Todoist's{' '}
          <Text style={styles.link} onPress={openLink}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={openLink}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  loginImage: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bannerImage: {
    height: 280,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  buttonsContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
