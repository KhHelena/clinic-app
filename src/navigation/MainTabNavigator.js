import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientsScreen from '../screens/PatientsScreen';
import GroupsScreen from '../screens/GroupsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Patients" component={PatientsScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;