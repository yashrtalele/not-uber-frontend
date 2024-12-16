import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'tamagui';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { onSignout } = useAuth();

  const handleSignout = async () => {
    const result = await onSignout!();
    if (result && result.error) {
      alert(result.msg);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <Button onPress={handleSignout}>Signout</Button>
    </View>
  );
}
