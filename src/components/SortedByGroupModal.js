import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import PatientListItem from '../components/patientsComponents/PatientListItem';
import { getPatients, getAllGroups } from '../api/index';
import Constants from 'expo-constants';

import { ArrowLeftIcon } from 'react-native-heroicons/solid';

export default function SortedByGroupModal({ OnClose, groupName, groupId }) {
  const [groups, setGroups] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(groupId);
  const [lastLoadedIndex, setLastLoadedIndex] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
    fetchGroups();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const data = await getPatients();
    setPatients(data);
    setLoading(false);
  };

  const fetchGroups = async () => {
    setLoading(true);
    const data = await getAllGroups();
    setGroups(data);
    setLoading(false);
  };

  const filteredPatients = patients.filter(
    (patient) => patient.NGroup === parseInt(selectedGroup)
  );

  return (
    <>
      <View className="flex-row justify-start pt-5 bg-gray-100">
        <TouchableOpacity
          onPress={OnClose}
          className="bg-gray-100 p-2 rounded-md shadow-md ml-4">
          <ArrowLeftIcon size="20" color="black" />
        </TouchableOpacity>
      </View>
      <View className=" flex-1 pt-5 gap-3 bg-gray-100">
        <Text className="text-2xl mb-5 p-10 pb-0 pt-5">Пацієнти {groupName} групи</Text>
        <SafeAreaView className=" rounded-md">
          <FlatList
            data={filteredPatients}
            keyExtractor={(item) => item.Nmedcard.toString()}
            renderItem={({ item }) => (
              <PatientListItem patient={item} isCheckByGroup />
            )}
            onEndReached={() => setLastLoadedIndex(lastLoadedIndex + 10)}
            onEndReachedThreshold={0.5}
          />
        </SafeAreaView>
      </View>
    </>
  );
}