import React, { useEffect, useState } from 'react'
import { View, TextInput, Modal, Button, FlatList } from 'react-native'
import PatientListItem from '../components/PatientListItem'
import PatientForm from '../components/PatientForm'
import { getPatients, deletePatient, updatePatient, getAllGroups } from '../api'
import { Picker } from '@react-native-picker/picker'

const PatientsScreen = () => {
  const [patients, setPatients] = useState([])
  const [groups, setGroups] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [searchNmedcard, setSearchNmedcard] = useState('')
  const [searchSurname, setSearchSurname] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [lastLoadedIndex, setLastLoadedIndex] = useState(10)

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
    await updatePatient(selectedPatient.Nmedcard, updatedPatient)
    fetchPatients()
    setModalVisible(false)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const filteredPatients = patients
    .filter((patient) => {
      return (
        patient.Nmedcard.toString().includes(searchNmedcard) &&
        patient.Surname.toLowerCase().includes(searchSurname.toLowerCase()) &&
        (selectedGroup === '' || patient.NGroup === parseInt(selectedGroup))
      )
    })
    .slice(0, lastLoadedIndex)

  return (
    <View>
      <TextInput
        placeholder="Search by Nmedcard"
        value={searchNmedcard}
        onChangeText={setSearchNmedcard}
      />
      <TextInput
        placeholder="Search by Surname"
        value={searchSurname}
        onChangeText={setSearchSurname}
      />
      <Picker
        selectedValue={selectedGroup}
        onValueChange={(itemValue) => setSelectedGroup(itemValue)}>
        <Picker.Item label="All groups" value="" />
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
          />
        )}
        onEndReached={() => setLastLoadedIndex(lastLoadedIndex + 10)}
        onEndReachedThreshold={0.5}
      />
      <Modal visible={modalVisible} onRequestClose={closeModal}>
        <PatientForm patient={selectedPatient} onSubmit={handleUpdate} />
        <Button title="Cancel" onPress={closeModal} />
      </Modal>
    </View>
  )
}

export default PatientsScreen
