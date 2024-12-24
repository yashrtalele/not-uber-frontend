import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChooseVehicle from './ChooseVehicle';

const Stack = createNativeStackNavigator();
function Layout() {
  return (
    <Stack.Navigator initialRouteName="ChooseVehicle">
      <Stack.Screen
        name="ChooseVehicle"
        component={ChooseVehicle}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Layout;
