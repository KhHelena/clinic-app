import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../../theme/index'
import { useNavigation } from '@react-navigation/native'


export default function PasswordRecoverScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')


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
        <Text style={{ fontSize: 100 }}>🤒</Text>
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        className="flex-1 bg-white px-8 pt-8">
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Електронна пошта</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Введіть вашу пошту"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
          <TouchableOpacity
            className="py-3 bg-blue-600 rounded-xl">
            <Text className="text-xl font-bold text-center text-white">
              Відновити пароль
            </Text>
          </TouchableOpacity>
        </View>
        </View>
    </View>
  )
}
