import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors.js';

const TabBarButton = ({ title, onPress, isFocused }) => {
  return (
    <TouchableOpacity
      style={[styles.tabButton, { backgroundColor: isFocused ? Colors.primary : Colors.lightGray }]}
      onPress={onPress}
    >
      <Text style={{ color: isFocused ? Colors.white : Colors.black }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default TabBarButton;
