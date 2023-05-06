// GroupsListItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GroupsListItem = ({ group, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <Icon name="people" size={40} color="#9b59b6" />
      <View style={styles.info}>
        <Text style={styles.groupName}>{group.Name}</Text>
        <View style={styles.footer}>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => onEdit(group)} style={styles.button}>
              <Icon name="create-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(group.NGroup)} style={styles.button}>
              <Icon name="trash-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <Text>Group ID: {group.NGroup}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingHorizontal: 10,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    marginLeft: 8,
  },
});

export default React.memo(GroupsListItem);
