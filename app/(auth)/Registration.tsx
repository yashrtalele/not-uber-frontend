import React from 'react';
import { Text, View } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

export default function Registration() {
  const { phoneNumber } = useGlobalSearchParams() as {
    phoneNumber: string;
  };
  console.log(phoneNumber);
  return (
    <View>
      <Text>Registration</Text>
    </View>
  );
}
