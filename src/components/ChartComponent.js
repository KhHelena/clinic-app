import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const ChartComponent = ({ data }) => {
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

  const chartWidth = 400 // Длина графика
  const chartHeight = 220

  const parameters = ['CO2', 'F', 'HR', 'O2', 'O2set', 'Pd', 'Ps', 'SpO2', 'V']

  return (
    <ScrollView>
      {parameters.map((param, index) => (
        <View key={index}>
          <Text style={styles.chartHeader}>График {param}</Text>
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
})

export default ChartComponent
