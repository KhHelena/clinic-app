import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GroupHeader = ({ totalGroups, onAdd }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onAdd} style={styles.addButton}>
      <Icon name="add-outline" size={24} color="#333" />
    </TouchableOpacity>
    <Text style={styles.totalGroups}>Total Groups: {totalGroups}</Text>
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
  totalGroups: {
    fontSize: 18,
  },
  imagePlaceholder: {
    width: 24,
    height: 24,
  },
});

export default GroupHeader;
