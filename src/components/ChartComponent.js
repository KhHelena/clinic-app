import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const ChartComponent = ({ data, patient }) => {

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


  const chartData = (parameter) => {
    return {
      labels: data.map((item) => item.Time.toString()),
      datasets: [
        {
          data: data.map((item) => item[parameter] || 0),
        },
      ],
    }
  }

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  }

  const chartWidth = 400
  const chartHeight = 220

  const parameters = ['Co2', 'F', 'HR', 'O2', 'O2set', 'Pd', 'Ps', 'SpO2', 'V']
// виведення інформації за пвцієнтом
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text>Номер карти: {patient.Nmedcard}</Text>
        <Text>
          {patient.Surname} {patient.FirstName} {patient.Patronymic}
        </Text>
        <Text>Вік: {patient.DataOfBirth ? getAge(patient.DataOfBirth) : '-'} {'    '} Вага: {patient.Weight ? patient.Weight : '-'} {'    '} Зріст: {patient.Height ? patient.Height : '-'}</Text>

        <Text>Діагноз: {patient.Diagnosis ? patient.Diagnosis : '-'}</Text>
        <Text>Адреса: {patient.Address ? patient.Address : '-'}</Text>
      </View>
      {parameters.map((param, index) => (
      /* виведення графіків за показниками*/
        <View key={index}>
          <Text style={styles.chartHeader}>Графік {param}</Text>
          <LineChart
            data={chartData(param)}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
          />
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  chartHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center'
  },
})

export default ChartComponent
