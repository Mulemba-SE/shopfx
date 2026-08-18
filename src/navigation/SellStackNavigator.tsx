import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellScreen from '../screens/main/SellScreen';
import CartScreen from '../screens/main/CartScreen';
import CheckoutScreen from '../screens/main/CheckoutScreen';
import TransactionDetailsScreen from '../screens/main/TransactionDetailsScreen';
const Stack = createNativeStackNavigator();

export default function SellStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SellHome" component={SellScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
    </Stack.Navigator>
  );
}