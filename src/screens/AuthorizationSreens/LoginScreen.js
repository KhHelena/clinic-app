import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../../theme/index'
import { useNavigation } from '@react-navigation/native'
import { loginDoctor, loginPatient } from '../../api/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'

export default function LoginScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')

  const handleLogin = async () => {
    try {
      let response
      if (role === 'patient') {
        response = await loginPatient({ email, password })
      } else {
        response = await loginDoctor({ email, password })
      }

      if (response.status === 'success') {
        
        
        await AsyncStorage.setItem('userRole', role)

        if (role === 'patient') {
          await AsyncStorage.setItem('userId', response.student.Nmedcard.toString())
          navigation.reset({
            index: 0,
            routes: [{ name: 'User' }],
          })
        } else {
          await AsyncStorage.setItem('userId', response.student.id.toString())
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          })
        }
      } else {
        Alert.alert('Помилка авторизації. Перевірте свої авторизаціонні данні.')
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex pb-8">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">

        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        className="flex-1 bg-white px-8 pt-8">
        <View className="form space-y-2">
          <Picker
            selectedValue={role}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
            <Picker.Item label="Пацієнт" value="patient" />
            <Picker.Item label="Лікар" value="doctor" />
          </Picker>
          <Text className="text-gray-700 ml-4">Електронна пошта</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Введіть вашу пошту"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
          <Text className="text-gray-700 ml-4">Пароль</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            placeholder="Введіть ваш пароль"
          />
          <TouchableOpacity
            className="flex items-end"
            onPress={() => navigation.navigate('Recover')}>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogin}
            className="py-3 bg-blue-600 rounded-xl">
            <Text className="text-xl font-bold text-center text-white">
              Вхід
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Або
        </Text>
        <View className="flex-row justify-center mt-0">
          <Text className="text-gray-500 font-semibold">
            Не маєте аккаунту?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-blue-600">Зареєструватись</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
