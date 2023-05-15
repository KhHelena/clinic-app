import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { getPatientProcedures, getPatientByMedcard } from '../api/index'
import TableComponent from '../components/TableComponent'
import ChartComponent from '../components/ChartComponent'

export default function UserProfileScreen() {
  const navigation = useNavigation()
  const [student, setStudent] = useState({})
  const [procedures, setProcedures] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [patient, setPatient] = useState({})

  useEffect(() => {
    fetchPatientData()
    fetchProcedures()
  }, [])

  const fetchPatientData = async () => {
    try {
      const nmedcard = await AsyncStorage.getItem('userId')
      const patientData = await getPatientByMedcard(nmedcard)
      setPatient(patientData)
    } catch (error) {
      console.error('Error fetching patient data', error)
    }
  }

  const fetchProcedures = async () => {
    try {
      const nmedcard = await AsyncStorage.getItem('userId')
      const data = await getPatientProcedures(nmedcard)
      setProcedures(data)
    } catch (error) {
      console.error('Error fetching procedures', error)
    }
  }

  const openInfoModal = (name) => {
    setDevelopScreenName(name)
    setIndevelopModalVisible(true)
  }

  const closeInfoModal = () => {
    setIndevelopModalVisible(false)
  }

  const openStudentModal = () => {
    setStudentInfoModalVisible(true)
  }

  const closeStudentModal = () => {
    setStudentInfoModalVisible(false)
  }

  const openLessonsListVisible = () => {
    setLessonsListVisible(true)
  }

  const closeLessonsListVisible = () => {
    setLessonsListVisible(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${('0' + date.getDate()).slice(-2)}/${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${(
      '0' + date.getMinutes()
    ).slice(-2)}`
  }

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
    setModalContent(<ChartComponent data={dataSessions} patient={patient} />)
    setModalVisible(true)
  }

  const getAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const monthDiff = today.getMonth() - dob.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--
    }
    return age
  }

  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row mx-5 mt-16 items-center">
        <View className="inline-block mr-5 h-20 w-20 rounded-full ring-2 bg-gray-300 justify-center items-center">
          <Text className="text-2xl">{patient.Surname?.charAt(0)}</Text>
        </View>
        <View>
          <Text className=" text-2xl text-slate-800">
            {patient.Surname} {patient.FirstName}
          </Text>
        </View>
      </View>

      <Text className="mx-5 text-lg text-gray-500 my-5">Короткі відомості</Text>
      <View className="mx-5">
        <View>
          <Text>Номер карти: {patient.Nmedcard}</Text>
          <Text>
            ПІБ: {patient.Surname} {patient.FirstName} {patient.Patronymic}
          </Text>
          <Text>
            Вік: {patient.DataOfBirth ? getAge(patient.DataOfBirth) : '-'}{' '}
            {'    '} Вага: {patient.Weight ? patient.Weight : '-'} {'    '}{' '}
            Зріст: {patient.Height ? patient.Height : '-'}
          </Text>

          <Text>Діагноз: {patient.Diagnosis ? patient.Diagnosis : '-'}</Text>
          <Text>Адреса: {patient.Address ? patient.Address : '-'}</Text>
        </View>
      </View>
      <Text className="mx-5 text-lg text-gray-500 my-5">
        Список процедур пацієнта:
      </Text>

      <View className="mx-3">
        <FlatList
          data={procedures}
          keyExtractor={(item) => item.IdDataSession.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.listItemInfo}>
                <Text style={styles.sessionName}>{item.Namesession}</Text>
                <Text>Дата: {formatDate(item.DateOfSession)}</Text>
                <Text>
                  Тривалість:{' '}
                  {item.DurationOfSession ? item.DurationOfSession : '-'}
                </Text>
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
                        )
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
              <Button
                title="Повернутися"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
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
  
  