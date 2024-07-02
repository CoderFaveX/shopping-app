import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Products from "../screens/ProductsScreen";
import Checkout from "../screens/CheckoutScreen";
import { useFonts } from "expo-font";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const [fontsLoaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <Text>Loading....</Text>
    );
  }
  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Checkout" component={Checkout} />
    </Tab.Navigator>
  );
}
