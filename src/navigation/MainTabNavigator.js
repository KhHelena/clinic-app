import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PatientsScreen from '../screens/PatientsScreen';
import GroupsScreen from '../screens/GroupsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

import 'react-native-svg';

const Tab = createMaterialTopTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Пацієнти"
      
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: true,
        tabBarShowIcon: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Пацієнти') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Групи') {
            iconName = focused ? 'albums' : 'albums-outline';
          } else if (route.name === 'Статистика') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Налаштування') {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          return <Icon name={iconName} size={24} color={color}/>;
        },
        tabBarStyle: {
          backgroundColor: 'white',
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: Platform.OS === 'android' ? 5 : 0,
        },
      })}>
      <Tab.Screen name="Пацієнти" component={PatientsScreen}/>
      <Tab.Screen name="Групи" component={GroupsScreen}/>
      <Tab.Screen name="Статистика" component={StatisticsScreen}/>
      <Tab.Screen name="Налаштування" component={SettingsScreen}/>
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
