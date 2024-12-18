import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useGlobalSearchParams } from 'expo-router';
import { OtpInput } from 'react-native-otp-entry';
import { verifyOTP } from '@/services/otpService';

const styles = StyleSheet.create({
  containerStyle: {
    width: 330,
  },
  pinCodeContainerStyle: {
    width: 60,
    height: 57,
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
  },
  pinCodeTextStyle: {
    fontFamily: 'Lexend',
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
    color: '#030318',
  },
  focusedPinCodeContainerStyle: {
    borderColor: '#030318',
  },
  placeholderTextStyle: {
    fontWeight: '500',
    fontFamily: 'Lexend',
    fontSize: 32,
    color: '#000000',
  },
  submitContainer: {
    backgroundColor: '#030318',
    width: 332,
    height: 67,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontFamily: 'Lexend',
    fontSize: 27,
    fontWeight: '500',
    textAlign: 'center',
  },
  headingContainer: {
    width: 340,
    paddingBottom: 15,
  },
  singleInputContainer: {
    paddingTop: 200,
    paddingBottom: 370,
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
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoInnerContainer: {
    paddingBottom: 5,
  },
});

export default function OTP() {
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
      <View style={styles.singleInputContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
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
              pinCodeContainerStyle: styles.pinCodeContainerStyle,
              pinCodeTextStyle: styles.pinCodeTextStyle,
              focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle,
              placeholderTextStyle: styles.placeholderTextStyle,
            }}
          />
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.infoContainer}>
          <View style={styles.infoInnerContainer}>
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={handlePress}>
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
