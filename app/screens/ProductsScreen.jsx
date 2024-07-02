import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { AsyncStorage } from "react-native";
import axios from 'axios';

const ProductsScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const data = response.data.slice(0, 20);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
      // Fallback to dummy products if API fetch fails or takes too long
      setProducts([
        { id: 1, image: require("./cart.jpeg"), title: "Fun carts", price: 10 },
        { id: 2, image: require("./cart.jpeg"), title: "Nice carts", price: 20 },
        { id: 3, image: require("./cart.jpeg"), title: "Good carts", price: 30 },
      ]);
    }
  };

  const loadCartFromStorage = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('@cart');
      if (cartItems !== null) {
        setCart(JSON.parse(cartItems));
      }
    } catch (error) {
      console.error('Error loading cart from AsyncStorage:', error);
    }
  };

  const saveCartToStorage = async () => {
    try {
      await AsyncStorage.setItem('@cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
    }
  };

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    saveCartToStorage();
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter(item => item.id !== product.id);
    setCart(newCart);
    saveCartToStorage();
  };

  const isInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productText}>{item.title}</Text>
        <Text style={styles.productPrice}><Text style={{ fontFamily: "verdana" }}>₦</Text>{item.price * 50}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          isInCart(item) ? styles.buttonRemove : styles.buttonAdd,
        ]}
        onPress={() => isInCart(item) ? removeFromCart(item) : addToCart(item)}
      >
        <Text style={styles.buttonText}>
          {isInCart(item) ? "REMOVE" : "ADD TO CART"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate("Checkout", { cart })}
      >
        <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonAdd: {
    backgroundColor: "#5e5eca",
  },
  buttonRemove: {
    backgroundColor: "#5e5ecab0",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins",
  },
});

export default ProductsScreen;
