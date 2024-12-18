import React from 'react';
import { Text, View } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

export default function Password() {
  const { phoneNumber, userEmail } = useGlobalSearchParams() as {
    phoneNumber: string;
    userEmail: string;
  };
  console.log(phoneNumber, userEmail);
  return (
    <View>
      <Text>Password</Text>
    </View>
  );
}
