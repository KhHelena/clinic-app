import React from 'react';
import { FlatList } from 'react-native';
import GroupListItem from './GroupListItem';

const GroupList = ({ groups, onEdit, onDelete }) => {
  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item.NGroup.toString()}
      renderItem={({ item }) => (
        <GroupListItem group={item} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
};

export default GroupList;
