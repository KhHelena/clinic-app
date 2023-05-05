import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PatientsScreen from '../screens/PatientsScreen';
import GroupsScreen from '../screens/GroupsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createMaterialTopTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Пацієнти"
      
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: true,
        tabBarShowIcon: true,
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
          }

          return <Icon name={iconName} size={24} color={color}/>;
        },
      })}
    >
      <Tab.Screen name="Пацієнти" component={PatientsScreen}/>
      <Tab.Screen name="Групи" component={GroupsScreen}/>
      <Tab.Screen name="Статистика" component={StatisticsScreen}/>
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
