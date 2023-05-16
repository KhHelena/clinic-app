import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//import screens
import HomeScreen from '../screens/AuthorizationSreens/HomeScreen'
import LoginScreen from '../screens/AuthorizationSreens/LoginScreen'
import RegistrationScreen from '../screens/AuthorizationSreens/RegistrationScreen'
import PasswordRecoverScreen from '../screens/AuthorizationSreens/PasswordRecoverScreen'
import MainTabNavigator from '../navigation/MainTabNavigator'
import UserTabNavigator from '../navigation/UserTabNavigator'

const Stack = createNativeStackNavigator()

const AppNavigation = ({ loggedIn, userRole }) => {
  console.log('App navigator: ', userRole)
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={loggedIn ? (userRole == 'patient' ? 'User' : 'Main') : 'Home'}>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="Recover"
          options={{ headerShown: false }}
          component={PasswordRecoverScreen}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={MainTabNavigator}
        />
        <Stack.Screen
          name="User"
          options={{ headerShown: false }}
          component={UserTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
