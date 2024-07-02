import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("./cart.jpeg")} style={styles.logo} />
      <Text style={styles.header}>Welcome to Our Shopping App</Text>
      <Image src="./cart.jpeg" height={100} width={100} />
      <Text style={styles.subheader}>Find the best products and deals!</Text>
      <Button title="View Products" onPress={() => navigation.navigate("Products")} />
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Poppins",
  },
  subheader: {
    fontSize: 18,
    marginBottom: 40,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 10,
    borderRadius: "50%"
  }
});