import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import { useTheme } from '@react-navigation/native';
import { ChevronRight, Eye, EyeOff } from '@tamagui/lucide-icons';
import { useAuth } from '../context/AuthContext';

const styles = StyleSheet.create({
  singleInputContainer: {
    paddingTop: 30,
    paddingBottom: 155,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoInnerContainer: {
    paddingTop: 20,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontFamily: 'Roboto',
    fontSize: 14,
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
  linkText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#3F3FFF',
  },
});

export default function Registration() {
  const { onSignup } = useAuth();
  const { colors } = useTheme();
  const { phoneNumber } = useGlobalSearchParams() as {
    phoneNumber: string;
  };
  console.log(
    '🚀 ~ file: Registration.tsx:Registration ~ phoneNumber:',
    phoneNumber,
  );
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePress = async () => {
    if (email === '' || name === '' || password === '') {
      alert('Please fill all the fields!');
      return;
    }
    // const response = await onSignup!(email, password, email, name, phoneNumber);
    console.log(
      '🚀 ~ file: Registration.tsx:handlePress ~ response:',
      name,
      email,
      password,
    );
    // if (response) {
    //   console.log(response);
    // }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.singleInputContainer}>
        <View
          style={{
            flexDirection: 'column',
            gap: 20,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: 'bold',
              fontFamily: 'Lexend',
              color: colors.text,
            }}>
            What&apos;s your name?
          </Text>
          <TextInput
            style={{
              borderWidth: 0,
              borderRadius: 15,
              width: 330,
              height: 60,
              paddingLeft: 30,
              paddingRight: 30,
              backgroundColor: colors.card,
            }}
            placeholder="John Doe"
            placeholderTextColor="#B2B2B2"
            fontSize={21}
            color={colors.text}
            fontFamily="Lexend"
            fontWeight="500"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 30,
            gap: 20,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: 'bold',
              fontFamily: 'Lexend',
              color: colors.text,
            }}>
            Email
          </Text>
          <TextInput
            style={{
              borderWidth: 0,
              borderRadius: 15,
              width: 330,
              height: 60,
              paddingLeft: 30,
              paddingRight: 30,
              backgroundColor: colors.card,
            }}
            placeholder="john.doe@email.com"
            placeholderTextColor="#B2B2B2"
            fontSize={21}
            color={colors.text}
            fontFamily="Lexend"
            fontWeight="500"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 30,
            gap: 20,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: 'bold',
              fontFamily: 'Lexend',
              color: colors.text,
            }}>
            Password
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 20,
              flexDirection: 'row',
              width: 330,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                borderWidth: 0,
                borderRadius: 15,
                width: 270,
                height: 60,
                paddingLeft: 30,
                backgroundColor: colors.card,
              }}
              placeholder="P@ssw0rd!"
              placeholderTextColor="#B2B2B2"
              fontSize={21}
              color={colors.text}
              fontFamily="Lexend"
              fontWeight="500"
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity
              style={{
                paddingRight: 30,
              }}
              onPress={toggleShowPassword}>
              {showPassword ? <Eye /> : <EyeOff />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={[styles.infoContainer, { backgroundColor: colors.card }]}>
          <View style={styles.infoInnerContainer}>
            <Text style={[styles.info, { color: colors.secondaryLightText }]}>
              By tapping next you indicate that you are at least 18 years of age
              and agree to the
              <Text style={styles.linkText}>{' Terms & Conditions'}</Text> and
              acknowledge the
              <Text style={styles.linkText}>{' Privacy Policy'}</Text>.
            </Text>
          </View>
          <View
            style={[
              styles.nextButton,
              { backgroundColor: colors.secondaryButtonColor },
            ]}>
            <TouchableOpacity onPress={handlePress}>
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
                    Next
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
