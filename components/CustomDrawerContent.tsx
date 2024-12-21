import React from 'react';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function CustomDrawerContent(props: any) {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Messages"
          onPress={() => {
            router.push({
              pathname: '/screens/Messages',
            });
          }}
        />
        <DrawerItem
          label="Past Trips"
          onPress={() => {
            router.push({
              pathname: '/screens/PastTrips',
            });
          }}
        />
        <DrawerItem
          label="Payment Methods"
          onPress={() => {
            router.push({
              pathname: '/screens/PaymentMethods',
            });
          }}
        />
        <DrawerItem
          label="Account Settings"
          onPress={() => {
            router.push({
              pathname: '/screens/AccountSettings',
            });
          }}
        />
      </DrawerContentScrollView>
      <TouchableOpacity style={{ padding: 20, paddingBottom: 20 + bottom }}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
