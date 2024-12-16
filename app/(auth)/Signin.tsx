import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import { useTheme } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phoneInput: {
    borderWidth: 0,
    borderRadius: 15,
    width: 330,
    height: 60,
    paddingLeft: 10,
  },
  flagStyle: {
    width: 35,
    height: 25,
    borderRadius: 5,
    marginLeft: 10,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 500,
    fontFamily: 'Lexend',
  },
  singleInputContainer: {
    paddingTop: 300,
    paddingBottom: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Lexend',
    fontWeight: 'bold',
    fontSize: 27,
  },
  headingContainer: {
    width: 300,
    paddingBottom: 15,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 188,
    backgroundColor: '#FAFAFA',
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
    fontSize: 14,
    color: '#656565',
  },
  nextText: {
    fontFamily: 'Lexend',
    fontWeight: 400,
    fontSize: 25,
    color: '#FFFFFF',
  },
  nextButtonContainer: {
    width: 332,
    height: 67,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Signin() {
  const { colors } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const handleSendOtp = () => {
    console.log(phoneInput.current?.getValue());
    console.log(phoneNumber);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.singleInputContainer, {}]}>
        <View style={styles.headingContainer}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Phone Number
          </Text>
        </View>
        <PhoneInput
          ref={phoneInput}
          style={[
            styles.phoneInput,
            {
              backgroundColor: colors.card,
            },
          ]}
          flagStyle={styles.flagStyle}
          textStyle={[styles.textStyle, { color: colors.text }]}
          initialCountry="in"
          offset={30}
          onChangePhoneNumber={(number: string) => {
            setPhoneNumber(number);
          }}
          textProps={{
            placeholder: '77569 94033',
            keyboardType: 'number-pad',
            autoFocus: true,
            autoCorrect: false,
            autoCapitalize: 'none',
          }}
          autoFormat
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoInnerContainer}>
            <Text style={styles.info}>
              By continuing you may receive an SMS for verification. Message and
              data rates may apply.
            </Text>
          </View>
          <View
            style={[
              styles.nextButton,
              { backgroundColor: colors.buttonColor },
            ]}>
            <TouchableOpacity onPress={handleSendOtp}>
              <View style={styles.nextButtonContainer}>
                <Text style={styles.nextText}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
