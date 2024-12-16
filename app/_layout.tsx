import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import { Slot, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { tamaguiConfig } from '../tamagui.config';
import { AuthProvider, useAuth } from './context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.

SplashScreen.preventAutoHideAsync();

function MainLayout() {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (authState?.authenticated === false) {
        router.replace('/(auth)/Signin');
      } else {
        router.replace('/(app)/Home');
      }
    };
    checkAuthentication();
  }, [authState, router]);

  return (
    <View className="h-full">
      <Slot />
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    LexendBlack: require('../assets/fonts/lexend/Lexend-Black.ttf'),
    LexendBold: require('../assets/fonts/lexend/Lexend-Bold.ttf'),
    LexendExtraBold: require('../assets/fonts/lexend/Lexend-ExtraBold.ttf'),
    LexendExtraLight: require('../assets/fonts/lexend/Lexend-ExtraLight.ttf'),
    LexendLight: require('../assets/fonts/lexend/Lexend-Light.ttf'),
    LexendMedium: require('../assets/fonts/lexend/Lexend-Medium.ttf'),
    LexendRegular: require('../assets/fonts/lexend/Lexend-Regular.ttf'),
    LexendSemiBold: require('../assets/fonts/lexend/Lexend-SemiBold.ttf'),
    LexendThin: require('../assets/fonts/lexend/Lexend-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <MainLayout />
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'auto'} />
        </ThemeProvider>
      </TamaguiProvider>
    </AuthProvider>
  );
}
