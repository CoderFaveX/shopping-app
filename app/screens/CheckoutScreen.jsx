import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, FlatList } from "react-native";

export default function CheckoutScreen({ route, navigation }) {
  const { cart } = route.params || [];

  const handleOrderSuccess = () => {
    if (cart.length === 0) {
      Alert.alert("Error", "No products in the cart to place an order.");
    } else {
      Alert.alert("Success", "Order placed successfully!");
      navigation.navigate("OrderSuccessful");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productText}>{item.title}</Text>
        <Text style={styles.productPrice}><Text style={{ fontFamily: "verdana" }}>₦</Text>{item.price * 50}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
      <TouchableOpacity
        style={[
          styles.checkoutButton,
          cart.length === 0 && styles.checkoutButtonDisabled,
        ]}
        onPress={handleOrderSuccess}
        disabled={cart ? cart.length === 0 : true}
      >
        <Text style={styles.checkoutButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 25,
    fontFamily: "Poppins",
    borderBottomColor: "#666",
    borderBottomWidth: 2,
    fontWeight: "bold"
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productText: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  productPrice: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  emptyCart: {
    fontSize: 16,
    fontFamily: "Poppins",
    textAlign: "center",
    marginBottom: 20,
  },
  checkoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  checkoutButtonDisabled: {
    backgroundColor: "#b0c4de",
  },
  checkoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins",
  },
});
