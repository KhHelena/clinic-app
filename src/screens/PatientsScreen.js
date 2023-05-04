import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TextInput, Modal, Button, FlatList, StyleSheet } from 'react-native';
import PatientListItem from '../components/PatientListItem';
import PatientForm from '../components/PatientForm';
import Header from '../components/Header'; // Add this import
import { getPatients, deletePatient, updatePatient, getAllGroups } from '../api';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';


const PatientsScreen = () => {
  const [patients, setPatients] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchType, setSearchType] = useState('Nmedcard');
  const [searchValue, setSearchValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [lastLoadedIndex, setLastLoadedIndex] = useState(10);

  useEffect(() => {
    fetchPatients();
    fetchGroups();
  }, []);

  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  const fetchGroups = async () => {
    const data = await getAllGroups();
    setGroups(data);
  };

  const handleDelete = async (id) => {
    await deletePatient(id);
    fetchPatients();
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  const handleUpdate = async (updatedPatient) => {
    await updatePatient(selectedPatient.Nmedcard, updatedPatient);
    fetchPatients();
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const filteredPatients = patients
    .filter((patient) => {
      if (searchType === 'Nmedcard') {
        return (
          patient.Nmedcard.toString().includes(searchValue) &&
          (selectedGroup === '' || patient.NGroup === parseInt(selectedGroup))
        );
      } else {
        return (
          patient.Surname.toLowerCase().includes(searchValue.toLowerCase()) &&
          (selectedGroup === '' || patient.NGroup === parseInt(selectedGroup))
        );
      }
    })
    .slice(0, lastLoadedIndex);

  return (
    <SafeAreaView style={styles.container}>
      <Header totalPatients={patients.length} onAdd={() => setModalVisible(true)} />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={`Search by ${searchType === 'Nmedcard' ? 'Nmedcard' : 'Surname'}`}
          value={searchValue}
          onChangeText={setSearchValue}
          style={styles.searchInput}
        />
        <Picker
          selectedValue={searchType}
          onValueChange={(itemValue) => setSearchType(itemValue)}
          style={styles.searchPicker}
        >
          <Picker.Item label="Nmedcard" value="Nmedcard" />
          <Picker.Item label="Surname" value="Surname" />
        </Picker>
      </View>
      <Picker
        selectedValue={selectedGroup}
        onValueChange={(itemValue) => setSelectedGroup(itemValue)}
      >
        <Picker.Item label="All groups" value="" />
        {groups.map((group) => (
          <Picker.Item key={group.NGroup} label={group.Name} value={group.NGroup.toString()} />
        ))}
      </Picker>
      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.Nmedcard.toString()}
        renderItem={({ item }) => (
          <PatientListItem
            patient={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        onEndReached={() => setLastLoadedIndex(lastLoadedIndex + 10)}
        onEndReachedThreshold={0.5}
        />
        <Modal visible={modalVisible} onRequestClose={closeModal}>
          <PatientForm patient={selectedPatient} onSubmit={handleUpdate} />
          <Button title="Cancel" onPress={closeModal} />
        </Modal>
      </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
  },
  searchPicker: {
    width: 130,
  },
});

export default PatientsScreen;      