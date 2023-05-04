import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${('0' + date.getDate()).slice(-2)}.${(
    '0' +
    (date.getMonth() + 1)
  ).slice(-2)}.${date.getFullYear()}`
}

const PatientListItem = ({ patient, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      {patient.Sex === 'м.' ? (
        <Icon name="man" size={40} color="#6bdaff" />
      ) : (
        <Icon name="woman" size={40} color="#ff94fd" />
      )}
      <View style={styles.info}>
        <Text>
          {patient.Surname} {patient.FirstName} {patient.Patronymic}
        </Text>
        <View style={styles.columns}>
          <View style={styles.column}>
            <Text>{formatDate(patient.DataOfBirth)}</Text>
            <Text>📞 {patient.PhoneN}</Text>
            <Text>Email: {patient.Email}</Text>
            <Text>Адреса: {patient.Adress}</Text>
          </View>
          <View style={styles.column}>
            <Text>
              {patient.Height} см / {patient.Weight} кг
            </Text>
            <Text>Діагноз: {patient.Diagnosis}</Text>
            <Text>NSessionDiagn: {patient.NSessionDiagn}</Text>
            <Text>NSessionTreat: {patient.NSessionTreat}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => onEdit(patient)}
              style={styles.button}>
              <Icon name="create-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(patient.Nmedcard)}
              style={styles.button}>
              <Icon name="trash-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <Text>
            Мед. Карта: {patient.Nmedcard} Група: {patient.NGroup}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  info: {
    flex: 1,
    paddingHorizontal: 10,
  },
  columns: {
    flexDirection: 'row',
    flex: 1,
  },
  column: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginLeft: 8,
  },
})

export default React.memo(PatientListItem)
