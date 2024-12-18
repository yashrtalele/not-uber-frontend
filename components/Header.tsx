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

function Header() {
  const { colors } = useTheme();
  const handlePress = () => {
    router.back();
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginTop: 55,
        marginLeft: 25,
        height: 60,
      }}>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: colors.tint }]}
        onPress={handlePress}>
        <ChevronLeft />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
