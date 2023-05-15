import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { themeColors } from '../../theme/index'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { registerDoctor, registerPatient } from '../../api/index'
import DateTimePicker from '@react-native-community/datetimepicker'

const formatDate = (date) => {
  const d = new Date(date)
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
}

export default function RegistrationScreen() {
  const navigation = useNavigation()
  const [role, setRole] = useState('doctor')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [doctorData, setDoctorData] = useState({})
  const [patientData, setPatientData] = useState({})
  const [Nmedcard, setNmedCard] = useState({})
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [sex, setSex] = useState('')
  const [DataOfBirth, setDataOfBirth] = useState(new Date().toString())
  const [surname, setSurname] = useState('')
  const [firstName, setFirstName] = useState('')
  const [patronymic, setPatronymic] = useState('')

  const handleFullNameChange = (value) => {
    setFullName(value)
    const parts = value.trim().split(' ')
    if (parts.length >= 1) {
      setSurname(parts[0])
    }
    if (parts.length >= 2) {
      setFirstName(parts[1])
    }
    if (parts.length >= 3) {
      setPatronymic(parts[2])
    }
  }

  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setDataOfBirth(selectedDate.toISOString())
    }
  }

  const handleRegister = async () => {
    try {
      let response
      if (role === 'doctor') {
        response = await registerDoctor({
          email,
          password,
          fullName,
        })
      } else {
        response = await registerPatient({
          Nmedcard: Nmedcard,
          Surname: surname,
          FirstName: firstName,
          Patronymic: patronymic,
          DataOfBirth: Math.floor(new Date(DataOfBirth).getTime() / 1000),
          Sex: sex,
          Height: parseInt(height),
          Weight: parseInt(weight),
          Address: address,
          PhoneN: phone,
          Email: email,
          Password: password,
          NGroup: 1,
        })
      }

      if (response.success || response.message) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      } else {
        Alert.alert('Помилка реєстрації', 'Будь ласка, спробуйте ще раз.')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      Alert.alert('Помилка реєстрації', 'Будь ласка, спробуйте ще раз.')
    }
  }

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex mb-8">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Text style={{ fontSize: 100 }}>🤒</Text>
        </View>
      </SafeAreaView>
      <ScrollView
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <View className="form space-y-2">
          {/* Role selection */}
          <Text className="text-gray-700 ml-4">Зареєструватись як</Text>
          <Picker
            selectedValue={role}
            style={{ height: 50, width: '100%' }}
            onValueChange={(itemValue) => setRole(itemValue)}>
            <Picker.Item label="Лікар" value="doctor" />
            <Picker.Item label="Пацієнт" value="patient" />
          </Picker>
          {/* Full name input */}
          <Text className="text-gray-700 ml-4">Повне ім'я</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Введіть повне ім'я"
            value={fullName}
            onChangeText={handleFullNameChange}
          />

          <Text className="text-gray-700 ml-4">Електронна пошта</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Введіть вашу пошту"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />

          {/* Conditional fields for doctor or patient */}
          {role === 'patient' && (
            <>
              <Text className="text-gray-700 ml-4">Номер мед.картки</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Введіть вашу адресу"
                onChangeText={setNmedCard}
                value={Nmedcard}
              />

              <Text className="text-gray-700 ml-4">Адреса</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Введіть вашу адресу"
                onChangeText={setAddress}
                value={address}
              />

              <Text className="text-gray-700 ml-4">Мобільний телефон</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Введіть номер телефону"
                onChangeText={setPhone}
                value={phone}
                keyboardType="phone-pad"
              />

              <Text className="text-gray-700 ml-4">Вага</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Введіть вашу вагу"
                onChangeText={setWeight}
                value={weight}
                keyboardType="numeric"
              />

              <Text className="text-gray-700 ml-4">Зріст</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Введіть ваш зріст"
                onChangeText={setHeight}
                value={height}
                keyboardType="numeric"
              />

              <Text className="text-gray-700 ml-4">Стать</Text>
              <Picker
                selectedValue={sex}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue) => setSex(itemValue)}>
                <Picker.Item label="Чоловіча" value="м." />
                <Picker.Item label="Жіноча" value="ж." />
              </Picker>

              <Text className="text-gray-700 ml-4">Дата народження</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="DataOfBirth"
                value={formatDate(DataOfBirth)}
                onFocus={() => setShowDatePicker(true)}
              />

              {showDatePicker && (
                <DateTimePicker
                  value={new Date(DataOfBirth)}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </>
          )}

          {/* Password input */}
          <Text className="text-gray-700 ml-4">Пароль</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            placeholder="Введіть пароль"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="py-3 bg-blue-500 rounded-xl mb-16"
            onPress={handleRegister}>
            <Text className="font-xl font-bold text-center text-white">
              Зареєструватись
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
