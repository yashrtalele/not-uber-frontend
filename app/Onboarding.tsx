import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useTheme } from '@react-navigation/native';
import { ChevronRight } from '@tamagui/lucide-icons';

const styles = StyleSheet.create({
  container: {
    height: 400,
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  imageContainer: {
    width: 357,
    height: 238,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 190,
  },
  bottomContainerHeading: {
    width: '97.8%',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  nextButton: {
    width: 332,
    height: 67,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  infoContainer: {
    width: 351,
    height: 252,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoInnerContainer: {
    paddingTop: 35,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  nextText: {
    fontFamily: 'Lexend',
    fontWeight: 400,
    fontSize: 25,
  },
  nextButtonContainer: {
    width: '85%',
    paddingLeft: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%' },
  bottomHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Lexend',
  },
});

export default function Onboarding() {
  const { colors } = useTheme();
  const handleDone = async () => {
    // await SecureStore.setItemAsync('onboarding', 'true');
    // router.replace('/(auth)/Signin');
    console.log('Button Pressed');
    router.push('/(auth)/Signin');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/onboarding.png')}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={[styles.infoContainer, { backgroundColor: colors.card }]}>
          <View style={styles.infoInnerContainer}>
            <View style={styles.bottomContainerHeading}>
              <Text style={[styles.bottomHeading, { color: colors.text }]}>
                Instant Ride Booking
              </Text>
            </View>
            <Text style={[styles.info, { color: colors.secondaryLightText }]}>
              Select your destination, book a ride in an instant, and arrive at
              your destination with ease!
            </Text>
          </View>
          <View
            style={[
              styles.nextButton,
              { backgroundColor: colors.secondaryButtonColor },
            ]}>
            <TouchableOpacity onPress={handleDone}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 67,
                  width: 332,
                }}>
                <View style={styles.nextButtonContainer}>
                  <Text
                    style={[
                      styles.nextText,
                      { color: colors.secondaryTextColor },
                    ]}>
                    Getting Started
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    height: '100%',
                    alignItems: 'center',
                  }}>
                  <ChevronRight color={colors.secondaryTextColor} size={35} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
