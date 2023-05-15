import React, { useEffect, useState } from 'react';
import 'react-native-svg';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});


import AppNavigation from './src/navigation/AppNavigator';

 const checkloginStatus = async () => {
  const userId = await AsyncStorage.getItem("userId");
  return !!userId;
 }

 const checkrole = async () => {
  const userRole = await AsyncStorage.getItem("userRole");
  return !!userRole;
 }

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [savedRole, setSavedRole] = useState(null);

  useEffect(() => {
    async function fetchLoginStatus() {
      const isLoggedIn = await checkloginStatus();
      setLoggedIn(isLoggedIn);
    }

    async function fetchRole() {
      const isRole = await checkrole();
      setSavedRole(isRole);
    }

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
    <AppNavigation loggedIn={loggedIn} userRole={savedRole} />
  );
}
