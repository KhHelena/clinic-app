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
      initialRouteName="Patients"
      
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: true,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Patients') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Groups') {
            iconName = focused ? 'albums' : 'albums-outline';
          } else if (route.name === 'Statistics') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Icon name={iconName} size={24} color={color}/>;
        },
      })}
      tabBarOptions={{
        showIcon: true,
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Patients" component={PatientsScreen}/>
      <Tab.Screen name="Groups" component={GroupsScreen}/>
      <Tab.Screen name="Statistics" component={StatisticsScreen}/>
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
