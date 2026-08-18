import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptsScreen from '../screens/main/ReceiptsScreen';
import TransactionDetailsScreen from '../screens/main/TransactionDetailsScreen';

const Stack = createNativeStackNavigator();

export default function ReceiptsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReceiptsList" component={ReceiptsScreen} />
      <Stack.Screen name="ReceiptDetails" component={TransactionDetailsScreen} />
    </Stack.Navigator>
  );
}