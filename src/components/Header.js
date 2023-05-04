// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ totalPatients, onAdd }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onAdd} style={styles.addButton}>
      <Icon name="add-outline" size={24} color="#333" />
    </TouchableOpacity>
    <Text style={styles.totalPatients}>Total Patients: {totalPatients}</Text>
    <View style={styles.imagePlaceholder} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  addButton: {
    marginRight: 10,
  },
  totalPatients: {
    fontSize: 18,
  },
  imagePlaceholder: {
    width: 24, // Replace with the width of your image
    height: 24, // Replace with the height of your image
  },
});

export default Header;
