import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

const TableComponent = ({ data, patient }) => {

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
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text>Номер карти: {patient.Nmedcard}</Text>
        <Text>
          ПІБ: {patient.Surname} {patient.FirstName} {patient.Patronymic}
        </Text>
        <Text>Вік: {patient.DataOfBirth ? getAge(patient.DataOfBirth) : '-'} {'    '} Вага: {patient.Weight ? patient.Weight : '-'} {'    '} Зріст: {patient.Height ? patient.Height : '-'}</Text>

        <Text>Діагноз: {patient.Diagnosis ? patient.Diagnosis : '-'}</Text>
        <Text>Адреса: {patient.Address ? patient.Address : '-'}</Text>
      </View>

      <Text style={styles.tableHeader}>Табличний вигляд</Text>
            <Text>SpO2 - насичення крові киснем</Text>
            <Text>V - хвилинний обєм дихання</Text>
            <Text>F - частота дихання </Text>
            <Text>HR - серцевий ритм</Text>

      <ScrollView horizontal>
        <View>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              {[
                'Time',
                'SpO2',
                'O2',
                'CO2',
                'O2set',
                'F, уд/хв',
                'V, л/хв',
                'HR',
                'Pd',
                'Ps',
              ].map((header, index) => (
                <Text key={index} style={styles.tableCellHeader}>
                  {header}
                </Text>
              ))}
            </View>
          </View>





          <ScrollView>
            <View style={styles.table}>
              {data.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.tableRow}>
                  {[
                    row.Time,
                    row.SpO2,
                    row.O2,
                    row.CO2,
                    row.O2set,
                    row.F,
                    row.V,
                    row.HR,
                    row.Pd,
                    row.Ps,
                  ].map((cell, cellIndex) => (
                    <Text key={cellIndex} style={styles.tableCell}>
                      {cell === null ? 'N/A' : cell}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10
  },
  header: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center'
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRowHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCellHeader: {
    padding: 8,
    width: 50,
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  column1: {
      flex: 1,
      width: 200,
  },
  column2: {
        flex: 1,
        width: 0.3,
    },
  columns: {
      flexDirection: 'row',
      flex: 1,
      marginBottom: 0,
      marginTop: 0,
  },
  tableCell: {
    padding: 8,
    flex: 1,
    textAlign: 'center',
    width: 100
  },
});

export default TableComponent;
