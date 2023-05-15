import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native'

import { ArrowLeftIcon } from 'react-native-heroicons/solid'

export default function PasswordModal({ OnClose }) {
  return (
    <>
      <View className="flex-row justify-start mt-5">
        <TouchableOpacity
          onPress={OnClose}
          className="bg-white p-2 rounded-md shadow-md ml-4">
          <ArrowLeftIcon size="20" color="black" />
        </TouchableOpacity>
      </View>
      <View className=" flex-1 p-10 pt-5 gap-3">
        <Text className="text-2xl mb-5">Зміна паролю</Text>
        <Text className="text-gray-700 ml-4">Актуальний пароль</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Введіть ваш пароль"
          secureTextEntry
        />

        <Text className="text-gray-700 ml-4">Новий пароль</Text>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          placeholder="Придумайте новий пароль"
          secureTextEntry
        />
        <View className="items-center">
          <TouchableOpacity className="bg-indigo-100 px-5 py-3 rounded-md">
            <Text>Підтвердити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
