import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccessfulScreen from '../screens/OrderSuccessfulScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProductsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Products" component={ProductsScreen} />
    <Stack.Screen name="OrderSuccessful" component={OrderSuccessfulScreen} />
  </Stack.Navigator>
);

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Products" component={ProductsStack} />
        <Tab.Screen name="Checkout" component={CheckoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
