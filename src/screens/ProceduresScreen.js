import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native'
import { getPatientProcedures } from '../api/index'
import TableComponent from '../components/TableComponent'
import ChartComponent from '../components/ChartComponent'
import Icon from 'react-native-vector-icons/Ionicons'

const ProceduresScreen = ({ patient }) => {
  const [procedures, setProcedures] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  useEffect(() => {
    fetchProcedures()
  }, [])

  const fetchProcedures = async () => {
    const data = await getPatientProcedures(patient.Nmedcard)
    setProcedures(data)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${('0' + date.getDate()).slice(-2)}/${
      ('0' + (date.getMonth() + 1)).slice(-2)
    }/${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${(
      '0' + date.getMinutes()
    ).slice(-2)}`;
  };

  const calculateAverages = (dataSessions) => {
    const params = ['CO2', 'F', 'HR', 'O2', 'O2set', 'Pd', 'Ps', 'SpO2', 'V']
    const sums = {}
    const counts = {}

    dataSessions.forEach((session) => {
      params.forEach((param) => {
        if (session[param] !== null) {
          if (!sums[param]) {
            sums[param] = 0
            counts[param] = 0
          }
          sums[param] += session[param]
          counts[param]++
        }
      })
    })

    const averages = {}
    for (const param in sums) {
      averages[param] = (sums[param] / counts[param]).toFixed(2)
    }

    return averages
  }

  const openTableModal = (dataSessions, patient) => {
    setModalContent(<TableComponent data={dataSessions} patient={patient} />)
    setModalVisible(true)
  }

  const openGraphModal = (dataSessions, patient) => {
    setModalContent(<ChartComponent data={dataSessions} patient={patient}/>)
    setModalVisible(true)
  }

  const getAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Номер карти: {patient.Nmedcard}</Text>
        <Text>
          ПІБ: {patient.Surname} {patient.FirstName} {patient.Patronymic}
        </Text>
        <Text>Вік: {patient.DataOfBirth ? getAge(patient.DataOfBirth) : '-'} {'    '} Вага: {patient.Weight ? patient.Weight : '-'} {'    '} Зріст: {patient.Height ? patient.Height : '-'}</Text>

        <Text>Діагноз: {patient.Diagnosis ? patient.Diagnosis : '-'}</Text>
        <Text>Адреса: {patient.Address ? patient.Address : '-'}</Text>
      </View>
      <Text style={{marginBottom:10}}t>Список процедур пацієнта:</Text>
      <FlatList
        data={procedures}
        keyExtractor={(item) => item.IdDataSession.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.listItemInfo}>
              <Text style={styles.sessionName}>{item.Namesession}</Text>
              <Text>Дата: {formatDate(item.DateOfSession)}</Text>
              <Text>Тривалість: {item.DurationOfSession ? item.DurationOfSession : '-'}</Text>
              {item.DataSessions.length > 0 && (
                <View style={styles.averagesContainer}>
                  <Text>Середні показники:</Text>
                  <View style={styles.columns}>
                    {Object.entries(calculateAverages(item.DataSessions)).map(
                      ([key, value], index) => (
                        <View
                          key={key}
                          style={[
                            styles.column,
                            { borderRightWidth: index % 2 === 0 ? 1 : 0 },
                          ]}>
                          <Text>
                            {key}: {value}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                </View>
              )}
            </View>
            {item.DataSessions && item.DataSessions.length > 0 && (
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => openTableModal(item.DataSessions, patient)}>
                  <Icon name="grid-outline" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => openGraphModal(item.DataSessions, patient)}>
                  <Icon name="analytics-outline" size={24} color="#333" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {modalContent}
            <Button title="Повернутися" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f2f2f2',
  },
  header: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItem: {
    backgroundColor: '#fff',
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  listItemInfo: {
    flex: 1,
  },
  sessionName: {
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  button: {
    marginLeft: 8,
  },
  buttonText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  averagesContainer: {
    marginTop: 5,
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    padding: 2,
    borderColor: '#fff',
  },
})

export default ProceduresScreen
