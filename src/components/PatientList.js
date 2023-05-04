import React from 'react';
import { FlatList } from 'react-native';
import PatientListItem from './PatientListItem';

const PatientList = ({ patients, onDelete, onEdit }) => {
  return (
    <FlatList
      data={patients}
      keyExtractor={(item) => item.Nmedcard.toString()}
      renderItem={({ item }) => (
        <PatientListItem patient={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
};

export default PatientList;
