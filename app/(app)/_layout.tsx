import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Menu } from '@tamagui/lucide-icons';
import { useRootNavigation } from 'expo-router';
import { DrawerActions, useTheme } from '@react-navigation/native';
import CustomDrawerContent from '@/components/CustomDrawerContent';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Layout() {
  const navigation = useRootNavigation();
  const { colors } = useTheme();
  const openDrawer = () => {
    navigation?.dispatch(DrawerActions.openDrawer());
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerActiveBackgroundColor: colors.separatorColor,
          drawerStyle: { backgroundColor: colors.background },
          drawerHideStatusBarOnOpen: true,
          drawerType: 'front',
          headerTintColor: colors.background,
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={openDrawer}
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.background },
                ]}>
                <Menu />
              </TouchableOpacity>
            );
          },
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default Layout;
