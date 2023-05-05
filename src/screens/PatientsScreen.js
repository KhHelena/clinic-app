import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  TextInput,
  Modal,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native'
import PatientListItem from '../components/PatientListItem'
import PatientForm from '../components/PatientForm'
import Header from '../components/Header'
import {
  getPatients,
  deletePatient,
  updatePatient,
  getAllGroups,
  transferPatient,
  getPatientProcedures,
} from '../api/index'
import { Picker } from '@react-native-picker/picker'
import Constants from 'expo-constants'
import ProceduresScreen from './ProceduresScreen'
import GroupPicker from '../components/GroupPicker';

const PatientsScreen = () => {
  const [patients, setPatients] = useState([])
  const [groups, setGroups] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [searchType, setSearchType] = useState('Nmedcard')
  const [searchValue, setSearchValue] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [lastLoadedIndex, setLastLoadedIndex] = useState(10)
  const [transferModalVisible, setTransferModalVisible] = useState(false)
  const [proceduresModalVisible, setProceduresModalVisible] = useState(false)

  useEffect(() => {
    fetchPatients()
    fetchGroups()
  }, [])

  const fetchPatients = async () => {
    const data = await getPatients()
    setPatients(data)
  }

  const fetchGroups = async () => {
    const data = await getAllGroups()
    setGroups(data)
  }

  const handleDelete = async (id) => {
    await deletePatient(id)
    fetchPatients()
  }

  const handleEdit = (patient) => {
    setSelectedPatient(patient)
    setModalVisible(true)
  }

  const handleUpdate = async (updatedPatient) => {
    await updatePatient(updatedPatient.Nmedcard, updatedPatient)
    fetchPatients()
    setModalVisible(false)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const handleTransfer = async (patientId, groupId) => {
    await transferPatient(patientId, groupId)
    fetchPatients()
    setTransferModalVisible(false)
  }

  const handleShowProcedures = (patientId) => {
    setSelectedPatient(patientId)
    setProceduresModalVisible(true)
  }

  const filteredPatients = patients
    .filter((patient) => {
      if (searchType === 'Nmedcard') {
        return (
          patient.Nmedcard.toString().includes(searchValue) &&
          (selectedGroup === '' || patient.NGroup === parseInt(selectedGroup))
        )
      } else {
        return (
          patient.Surname.toLowerCase().includes(searchValue.toLowerCase()) &&
          (selectedGroup === '' || patient.NGroup === parseInt(selectedGroup))
        )
      }
    })
    .slice(0, lastLoadedIndex)

  return (
    <SafeAreaView style={styles.container}>
      <Header
        totalPatients={patients.length}
        onAdd={() => setModalVisible(true)}
      />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={`Пошук за ${
            searchType === 'Nmedcard' ? 'номером мед.картки' : 'прізвищем'
          }`}
          value={searchValue}
          onChangeText={setSearchValue}
          style={styles.searchInput}
        />
        <Picker
          selectedValue={searchType}
          onValueChange={(itemValue) => setSearchType(itemValue)}
          style={styles.searchPicker}>
          <Picker.Item label="мед.картка" value="Nmedcard" />
          <Picker.Item label="прізвище" value="Surname" />
        </Picker>
      </View>
      <Picker
        selectedValue={selectedGroup}
        onValueChange={(itemValue) => setSelectedGroup(itemValue)}>
        <Picker.Item label="Усі групи" value="" />
        {groups.map((group) => (
          <Picker.Item
            key={group.NGroup}
            label={group.Name}
            value={group.NGroup.toString()}
          />
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
            onTransfer={() => {
              setSelectedPatient(item.Nmedcard)
              setTransferModalVisible(true)
            }}
            onShowProcedures={handleShowProcedures}
          />
        )}
        onEndReached={() => setLastLoadedIndex(lastLoadedIndex + 10)}
        onEndReachedThreshold={0.5}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <PatientForm patient={selectedPatient} onSubmit={handleUpdate} />
          <Button title="Cancel" onPress={closeModal} />
        </View>
      </Modal>
      <Modal
        visible={transferModalVisible}
        onRequestClose={() => setTransferModalVisible(false)}>
        <GroupPicker
          groups={groups}
          onSelect={(groupId) => handleTransfer(selectedPatient, groupId)}
          onCancel={() => setTransferModalVisible(false)}
        />
      </Modal>
      <Modal
        visible={proceduresModalVisible}
        onRequestClose={() => setProceduresModalVisible(false)}>
        <ProceduresScreen patientId={selectedPatient} />
        <Button
          title="Close"
          onPress={() => setProceduresModalVisible(false)}
        />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: 150,
  },
})

export default PatientsScreen
