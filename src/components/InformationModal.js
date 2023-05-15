import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'

import { ArrowLeftIcon } from 'react-native-heroicons/solid'

export default function InformationModal({ OnClose }) {
  return (
      <ScrollView>
          <View className="flex-row justify-start mt-5">
            <TouchableOpacity
              onPress={OnClose}
              className="bg-white p-2 rounded-md shadow-md ml-4">
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>
          <View className=" flex-1 p-10 pt-5 gap-3">
            <Text className="text-2xl mb-5">Інформація про додаток</Text>
            <Text className="text-gray-700 ml-4">
              Стек розробки программи з бекендом, реалізованим на Flask
              (Python), і фронтендом, реалізованим на Expo React Native, має
              наступний опис:{' '}
            </Text>
            <Text className="text-gray-900 ml-4 text-lg">Бекенд: </Text>
            <Text className="text-gray-700 ml-4">
              Мова програмування: Python{'\n'}Фреймворк: Flask
            </Text>
            <Text className="text-gray-900 ml-4 text-lg">Фронтенд: </Text>
            <Text className="text-gray-700 ml-4">
              Мова програмування: JavaScript (React Native){'\n'}Фреймворк: Expo
            </Text>
            <Text className="text-gray-900 ml-4 text-lg">Залежності:</Text>
            <Text className="text-gray-700 ml-4">
              "@react-native-async-storage/async-storage": "^1.18.1"{'\n'}
              "@react-native-picker/picker": "^2.4.10"{'\n'}
              "@react-navigation/bottom-tabs": "^6.5.7"{'\n'}
              "@react-navigation/material-top-tabs": "^6.6.2"{'\n'}
              "@react-navigation/native": "^6.1.6"{'\n'}
              "@react-navigation/native-stack": "^6.9.12" {'\n'}
              "expo": "~48.0.6"{'\n'}
              "expo-linear-gradient": "^12.1.2" {'\n'}
              "expo-location": "~15.1.1" {'\n'}
              "expo-status-bar": "~1.4.4" {'\n'}
              "nativewind": "^2.0.11"{'\n'}
              "react":"18.2.0"{'\n'}
              "react-native": "0.71.3"{'\n'}
              "react-native-heroicons":"^3.2.0"{'\n'}
              "react-native-maps": "1.3.2"{'\n'}
              "react-native-maps-directions": "^1.9.0" {'\n'}
              "react-native-ratings": "^8.1.0"{'\n'}
              "react-native-safe-area-context": "4.5.0"{'\n'}
              "react-native-screens": "~3.20.0" {'\n'}
              "react-native-star-rating": "^1.1.0" {'\n'}
              "react-native-svg": "^13.4.0"{'\n'}
              "react-native-vector-icons": "^9.2.0" {'\n'}
              "tailwindcss": "^3.2.7"
            </Text>

            <Text className="text-gray-900 ml-4 text-lg">
              Розробка на бекенді (Flask):{' '}
            </Text>
            <Text className="text-gray-700 ml-4">
              Мова програмування: Python {'\n'}
              Фреймворк: Flask {'\n'}
              Використання Flask дозволяє швидко створювати веб-додатки і API на
              мові Python. Flask надає необхідні інструменти для маршрутизації
              URL, обробки запитів та створення відповідей.
            </Text>

            <Text className="text-gray-900 ml-4 text-lg">
              Розробка на фронтенді (Expo React Native):{' '}
            </Text>
            <Text className="text-gray-700 ml-4">
              Мова програмування: JavaScript {'\n'}
              Фреймворк: Expo React Native {'\n'}
              Expo - це платформа, яка допомагає розробникам створювати мобільні
              додатки з використанням React Native. Вона надає зручний інтерфейс
              командного рядка для розробки, тестування та розгортання додатків.
              Expo також надає доступ до різноманітних модулів та компон
            </Text>
          </View>
        </ScrollView>
  )
}
