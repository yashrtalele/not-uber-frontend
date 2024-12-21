import React from 'react';
import { Text, View } from 'react-native';
import Header from '@/components/Header';

export default function PastTrips() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>PastTrips</Text>
      </View>
    </View>
  );
}
