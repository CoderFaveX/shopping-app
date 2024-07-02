import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function OrderSuccessfulScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("./cart.jpeg")} style={styles.logo} />
      <Text style={styles.header}>Order Successful!</Text>
      <Button title="Back to Products" onPress={() => navigation.navigate("Products")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Poppins",
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 10,
    borderRadius: 8
  }
});
