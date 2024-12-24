import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface HeaderProps {
  backgroundColor?: string;
  iconBackgroundColor?: string;
}

function Header({
  backgroundColor = '',
  iconBackgroundColor = '',
}: HeaderProps) {
  const { colors } = useTheme();
  const handlePress = () => {
    router.back();
  };
  return (
    <View
      style={{
        backgroundColor: backgroundColor || colors.background,
        marginTop: 55,
        marginLeft: 25,
        height: 60,
      }}>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: iconBackgroundColor || colors.tint },
        ]}
        onPress={handlePress}>
        <ChevronLeft />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
