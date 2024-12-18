import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '@/components/Header';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Signin from './Signin';
import OTP from './OTP';
import Registration from './Registration';
import Password from './Password';

const Stack = createNativeStackNavigator();
function Layout() {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Password"
        component={Password}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Layout;
