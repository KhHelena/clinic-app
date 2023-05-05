import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { getPatientProcedures } from '../api'

const ProceduresScreen = ({ patientId }) => {
  const [procedures, setProcedures] = useState([])

  useEffect(() => {
    fetchProcedures()
  }, [])

  const fetchProcedures = async () => {
    const data = await getPatientProcedures(patientId)
    setProcedures(data)
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
            {/* ... Отобразите другие свойства процедуры, если необходимо ... */}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
})

export default ProceduresScreen
