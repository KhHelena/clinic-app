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

const ProceduresScreen = ({ patientId }) => {
  const [procedures, setProcedures] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  useEffect(() => {
    fetchProcedures()
  }, [])

  const fetchProcedures = async () => {
    const data = await getPatientProcedures(patientId)
    setProcedures(data)
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

  const openTableModal = (dataSessions) => {
    setModalContent(<TableComponent data={dataSessions} />)
    setModalVisible(true)
  }

  const openGraphModal = (dataSessions) => {
    setModalContent(<ChartComponent data={dataSessions} />)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <Text>Список процедур для пациента {patientId}:</Text>
      <FlatList
        data={procedures}
        keyExtractor={(item) => item.IdDataSession.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Namesession}</Text>
            <Text>Дата: {item.DateOfSession}</Text>
            <Text>Продолжительность: {item.DurationOfSession}</Text>
            {item.DataSessions.length > 0 && (
              <Text>
                Средние значения:{' '}
                {JSON.stringify(calculateAverages(item.DataSessions))}
              </Text>
            )}
            {item.DataSessions && item.DataSessions.length > 0 && (
              <>
                <TouchableOpacity
                  onPress={() => openTableModal(item.DataSessions)}>
                  <Text style={styles.buttonText}>Просмотр в таблице</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openGraphModal(item.DataSessions)}>
                  <Text style={styles.buttonText}>Просмотр на графике</Text>
                </TouchableOpacity>
              </>
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
            <Button title="Закрыть" onPress={() => setModalVisible(false)} />
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
    backgroundColor: '#fff',
  },
  buttonText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
})

export default ProceduresScreen
