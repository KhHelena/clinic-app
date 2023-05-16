import React, { useEffect, useState } from 'react';
import 'react-native-svg';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigation from './src/navigation/AppNavigator';

 const checkloginStatus = async () => {
  const userId = await AsyncStorage.getItem("userId");
  return !!userId;
 }

 const checkrole = async () => {
  const userRole = await AsyncStorage.getItem("userRole");
  return !!userRole;
 }

 const getRole = async () => {
  const userRole = await AsyncStorage.getItem("userRole");
  return userRole
 }

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [savedRole, setSavedRole] = useState(null);
  const [whoIs, setWhoIs] = useState()

  useEffect(() => {
    async function fetchLoginStatus() {
      const isLoggedIn = await checkloginStatus();
      setLoggedIn(isLoggedIn);
    }

    async function fetchRole() {
      const isRole = await checkrole();
      setSavedRole(isRole);
    }

    async function getRoleFromAsync() {
      const role = await getRole();
      setWhoIs(role)
    }

    getRoleFromAsync();
    fetchLoginStatus();
    fetchRole();
  }, [])

  if (loggedIn === null || savedRole === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <AppNavigation loggedIn={loggedIn} userRole={whoIs} />
  );
}
