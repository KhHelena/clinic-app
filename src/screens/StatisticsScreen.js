import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { downloadGroupStats, downloadPatientStats, getAllGroups, getPatients } from '../api/index';
import Constants from 'expo-constants'

const StatisticsScreen = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
  
    useEffect(() => {
      fetchGroups();
      fetchPatients();
    }, []);
  
    useEffect(() => {
      if (groups.length > 0) {
        setSelectedGroup(groups[0].NGroup);
      }
    }, [groups]);
  
    useEffect(() => {
      if (patients.length > 0) {
        setSelectedPatient(patients[0].Nmedcard);
      }
    }, [patients]);
  
    const fetchGroups = async () => {
      const data = await getAllGroups();
      setGroups(data);
    };
  
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Завантажити статистику:</Text>

      {/* Завантаження групи*/}
      <Text style={styles.label}>Оберіть групу:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedGroup}
        onValueChange={(itemValue) => setSelectedGroup(itemValue)}
      >
        {groups.map((group, index) => (
          <Picker.Item key={index} label={group.Name} value={group.NGroup} />
        ))}
      </Picker>
      <Button
        title="Завантажити"
        onPress={() => {
          if (selectedGroup) {
            downloadGroupStats(selectedGroup);
          }
        }}
      />

      {/* Завантаження мед карти */}
      <Text style={styles.label}>Оберіть мед карту:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedPatient}
        onValueChange={(itemValue) => setSelectedPatient(itemValue)}
      >
        {patients.map((patient, index) => (
          <Picker.Item key={index} label={`${patient.Nmedcard} - ${patient.Surname} ${patient.FirstName} ${patient.Patronymic}`} value={patient.Nmedcard} />
        ))}
      </Picker>
      <Button
        title="Завантажити"
        onPress={() => {
          if (selectedPatient) {
            downloadPatientStats(selectedPatient);
          }
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
  },
});

export default StatisticsScreen;
