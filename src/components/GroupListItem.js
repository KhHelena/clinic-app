import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const GroupListItem = ({ group, onEdit, onDelete }) => {
  return (
    <View>
      <Text>{group.Name}</Text>
      <TouchableOpacity onPress={() => onEdit(group)}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(group.NGroup)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupListItem;
