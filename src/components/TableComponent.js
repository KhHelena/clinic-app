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
      <ScrollView horizontal>
        <View>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              {[
                'Time',
                'CO2',
                'F',
                'HR',
                'O2',
                'O2set',
                'Pd',
                'Ps',
                'SpO2',
                'V',
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
                    row.CO2,
                    row.F,
                    row.HR,
                    row.O2,
                    row.O2set,
                    row.Pd,
                    row.Ps,
                    row.SpO2,
                    row.V,
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
  tableCell: {
    padding: 8,
    flex: 1,
    textAlign: 'center',
    width: 100
  },
});

export default TableComponent;
