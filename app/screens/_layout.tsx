import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Messages from './Messages';
import AccountSettings from './AccountSettings';
import PastTrips from './PastTrips';
import PaymentMethods from './PaymentMethods';

const Stack = createNativeStackNavigator();
function Layout() {
  return (
    <Stack.Navigator initialRouteName="Messages">
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PastTrips"
        component={PastTrips}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Layout;
