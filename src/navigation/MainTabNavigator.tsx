import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import DashboardScreen from '../screens/main/DashboardScreen';
import ProductsStackNavigator from './ProductsStackNavigator';
import PlaceholderScreen from '../screens/main/PlaceholderScreen';
import SellStackNavigator from './SellStackNavigator';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

function ReceiptsScreen() {
  return <PlaceholderScreen title="Receipts" icon="file-text" />;
}
function MoreScreen() {
  return <PlaceholderScreen title="More" icon="more-horizontal" />;
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.gradientStart,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Home: 'home',
            Sell: 'shopping-cart',
            Products: 'box',
            Receipts: 'file-text',
            More: 'more-horizontal',
          };
          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Sell" component={SellStackNavigator} />
      <Tab.Screen name="Products" component={ProductsStackNavigator} />
      <Tab.Screen name="Receipts" component={ReceiptsScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}