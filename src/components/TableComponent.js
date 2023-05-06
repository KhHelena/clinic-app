import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TableComponent = ({ data }) => {
  return (
    <ScrollView>
      <Text style={styles.tableHeader}>Табличний вигляд</Text>
      <ScrollView horizontal>
        <ScrollView>
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
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10
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
