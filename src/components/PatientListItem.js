import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const PatientListItem = ({ patient, onDelete, onEdit }) => {
  return (
    <View>
      <Text>
        {patient.Surname} {patient.FirstName} {patient.Patronymic}
      </Text>
      <Text>Address: {patient.Adress}</Text>
      <Text>Date of Birth: {patient.DataOfBirth}</Text>
      <Text>Sex: {patient.Sex}</Text>
      <Text>Height: {patient.Height}</Text>
      <Text>Weight: {patient.Weight}</Text>
      <Text>Phone: {patient.PhoneN}</Text>
      <Text>Email: {patient.Email}</Text>
      <Text>Diagnosis: {patient.Diagnosis}</Text>
      <Text>Group: {patient.NGroup}</Text>
      <Text>NSessionDiagn: {patient.NSessionDiagn}</Text>
      <Text>NSessionTreat: {patient.NSessionTreat}</Text>
      <Text>Nmedcard: {patient.Nmedcard}</Text>
      <TouchableOpacity onPress={() => onEdit(patient)}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(patient.Nmedcard)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PatientListItem
