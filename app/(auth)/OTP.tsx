import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useGlobalSearchParams } from 'expo-router';
import { OtpInput } from 'react-native-otp-entry';
import { verifyOTP } from '@/services/otpService';
import Header from '@/components/Header';
import { ChevronRight } from '@tamagui/lucide-icons';
import { useTheme } from '@react-navigation/native';

const styles = StyleSheet.create({
  containerStyle: {
    width: 330,
  },
  pinCodeContainerStyle: {
    width: 60,
    height: 57,
    borderRadius: 20,
  },
  pinCodeTextStyle: {
    fontFamily: 'Lexend',
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
  },
  focusedPinCodeContainerStyle: {
    borderColor: '#030318',
    backgroundColor: 'transparent',
  },
  placeholderTextStyle: {
    fontWeight: '500',
    fontFamily: 'Lexend',
    fontSize: 32,
  },
  submitContainer: {
    width: 332,
    height: 67,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    width: 340,
    paddingBottom: 15,
  },
  singleInputContainer: {
    paddingTop: 170,
    paddingBottom: 205,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontWeight: '600',
    fontFamily: 'Lexend',
    fontSize: 23,
    color: '#030318',
  },
  infoContainer: {
    width: 351,
    height: 99,
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoInnerContainer: {
    paddingBottom: 5,
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
});

export default function OTP() {
  const { colors } = useTheme();
  const { phoneNumber, found, userEmail } = useGlobalSearchParams() as {
    phoneNumber: string;
    found: string;
    userEmail: string;
  };

  console.log(userEmail);
  const [code, setCode] = useState('');
  const handlePress = async () => {
    if (code.length !== 4) {
      alert('Please enter a valid code!');
      return;
    }
    const response = await verifyOTP(phoneNumber, code);
    if (response) {
      console.log(response);
      if (found === 'false') {
        console.log('User not found!');
        router.push({
          pathname: '/Registration',
          params: { phoneNumber },
        });
      } else {
        alert(`Welcome ${userEmail}!`);
        router.push({
          pathname: '/Password',
          params: { phoneNumber, userEmail },
        });
      }
    } else {
      alert('Failed to verify OTP!');
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header />
      <View style={styles.singleInputContainer}>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingText, { color: colors.text }]}>
            Enter the code sent to you at {phoneNumber}
          </Text>
        </View>
        <View>
          <OtpInput
            numberOfDigits={4}
            hideStick
            placeholder="0000"
            type="numeric"
            onFilled={otp => setCode(otp)}
            theme={{
              containerStyle: styles.containerStyle,
              pinCodeContainerStyle: [
                styles.pinCodeContainerStyle,
                { borderColor: 'transparent', backgroundColor: colors.card },
              ],
              pinCodeTextStyle: [
                styles.pinCodeTextStyle,
                { color: colors.text },
              ],
              focusedPinCodeContainerStyle: [
                styles.focusedPinCodeContainerStyle,
                { backgroundColor: colors.focusedContainer },
              ],
              placeholderTextStyle: [
                styles.placeholderTextStyle,
                { color: colors.text },
              ],
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (found === 'true') {
              router.push({
                pathname: '/Password',
                params: { phoneNumber, userEmail },
              });
            }
          }}
          style={{
            paddingTop: 10,
            width: '75%',
            height: '30%',
          }}>
          <Text
            style={{
              fontFamily: 'Lexend',
              fontSize: 15,
              fontWeight: '400',
              color: colors.text,
            }}>
            {found === 'true' ? 'Login via password instead' : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.infoContainer,
            { backgroundColor: colors.cardBackgroundNoText },
          ]}>
          <View style={styles.infoInnerContainer}>
            <TouchableOpacity
              style={[
                styles.submitContainer,
                { backgroundColor: colors.secondaryButtonColor },
              ]}
              onPress={handlePress}>
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
                    {found === 'true' ? 'Sign in' : 'Next'}
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
