import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { ProductsProvider } from '../context/ProductsContext';
import MainTabNavigator from './MainTabNavigator';
import { CartProvider } from '../context/CartContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { TransactionsProvider } from '../context/TransactionsContext';

function RootNavigatorInner() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <MainTabNavigator /> : <AuthNavigator />;
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
        <TransactionsProvider>
          <RootNavigatorInner />
        </TransactionsProvider>
      </CartProvider>
      </ProductsProvider>
    </AuthProvider>
    </NavigationContainer>
  );
}