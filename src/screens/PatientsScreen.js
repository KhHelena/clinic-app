import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  TextInput,
  Modal,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import PatientListItem from '../components/patientsComponents/PatientListItem'
import PatientForm from '../components/patientsComponents/PatientForm'
import Header from '../components/patientsComponents/Header'
import {
  getPatients,
  deletePatient,
  updatePatient,
  getAllGroups,
  transferPatient,
  getPatientProcedures,
  addPatient,
} from '../api/index'
import { Picker } from '@react-native-picker/picker'
import Constants from 'expo-constants'
import ProceduresScreen from './ProceduresScreen'
import GroupPicker from '../components/patientsComponents/GroupPicker'

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
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [procedurePatient, setProcedurePatient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
    fetchGroups()
  }, [])

  const fetchPatients = async () => {
    setLoading(true) // Встановіть завантаження у true, коли починається завантаження
    const data = await getPatients()
    setPatients(data)
    setLoading(false) // Встановіть завантаження у false, коли дані завантажені
  }

  const fetchGroups = async () => {
    setLoading(true) // Встановіть завантаження у true, коли починається завантаження
    const data = await getAllGroups()
    setGroups(data)
    setLoading(false) // Встановіть завантаження у false, коли дані завантажені
  }

  const handleCreate = async (newPatient) => {
    await addPatient(newPatient)
    fetchPatients()
    setCreateModalVisible(false)
  }

  //Delete Patient
  const handleDelete = async (id) => {
    await deletePatient(id)
    fetchPatients()
  }

  //Prepare edit
  const handleEdit = (patient) => {
    setSelectedPatient(patient)
    setModalVisible(true)
  }

  //Edit
  const handleUpdate = async (updatedPatient) => {
    await updatePatient(updatedPatient.Nmedcard, updatedPatient)
    fetchPatients()
    setModalVisible(false)
  }

  //Close edit
  const closeModal = () => {
    setModalVisible(false)
  }

  //Transfer
  const handleTransfer = async (patientId, groupId) => {
    await transferPatient(patientId, groupId)
    fetchPatients()
    setTransferModalVisible(false)
  }

  //Show procedures
  const handleShowProcedures = (patient) => {
    setProcedurePatient(patient)
    setProceduresModalVisible(true)
  }

  // Filter Patients by Nmedcard or Surname
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
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        totalPatients={patients.length}
        onAdd={() => setCreateModalVisible(true)}
      />

      {/* Search */}
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

      {/* Filter by group */}
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

      {/* Draw Patients list */}
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

      {/* Open Edit Patient Modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <PatientForm
            patient={selectedPatient}
            onSubmit={handleUpdate}
            onCancel={closeModal}
          />
        </View>
      </Modal>

      {/* Transfer Patient Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={transferModalVisible}
        onRequestClose={() => setTransferModalVisible(false)}>
        <View style={styles.modalContainer}>
          <GroupPicker
            groups={groups}
            onSelect={(groupId) => handleTransfer(selectedPatient, groupId)}
            onCancel={() => setTransferModalVisible(false)}
          />
        </View>
      </Modal>

      {/* Open Procedure List Modal*/}
      <Modal
        visible={proceduresModalVisible}
        onRequestClose={() => setProceduresModalVisible(false)}>
        <ProceduresScreen patient={procedurePatient} />
        <Button
          title="Скасувати"
          onPress={() => setProceduresModalVisible(false)}
        />
      </Modal>

      {/* create patient modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={createModalVisible}
        onRequestClose={() => setCreateModalVisible(false)}>
        <View style={styles.modalContainer}>
          <PatientForm
            patient={{}}
            onSubmit={handleCreate}
            onCancel={() => setCreateModalVisible(false)}
          />
        </View>
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
    paddingHorizontal: 15,
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
