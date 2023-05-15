import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

import InformationModal from '../components/InformationModal'
import PasswordModal from '../components/PasswordModal'
import ContactModal from '../components/ContactModal'

export default function SettingsScreen() {
  const navigation = useNavigation()
  const [notification, setNotification] = useState(null)
  const [isInfoModalVisible, setInfoModalVisible] = useState(false)
  const [isContactModalVisible, setContactModalVisible] = useState(false)
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false)

  
  const openInfoModal = () => {
    setInfoModalVisible(true)
  }

  const openPasswordModal = () => {
    setPasswordModalVisible(true)
  }

  const openContactModal = () => {
    setContactModalVisible(true)
  }

  const closeInfoModal = () => {
    setInfoModalVisible(false)
  }

  const closePasswordModal = () => {
    setPasswordModalVisible(false)
  }

  const closeContactModal = () => {
    setContactModalVisible(false)
  }


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId')
      await AsyncStorage.removeItem('role')
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <SafeAreaView className="bg-white flex-1 p-10 gap-3">
      <Text className="text-2xl mb-5">Налаштування</Text>
      <View className="bg-gray-100 p-3 rounded-md flex-row justify-between items-center">
        <View className="flex-row">
          <Icon name="notifications-outline" size={24} color="#3f3f3f" />
          <Text className="text-lg ml-5">Повідомлення</Text>
        </View>
        <Switch value={notification} onValueChange={setNotification} />
      </View>

      <TouchableOpacity
        className="bg-gray-100 p-3 rounded-md flex-row"
        onPress={openPasswordModal}>
        <Icon name="shield-outline" size={24} color="#3f3f3f" />
        <Text className="text-lg ml-5">Змінити пароль</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-100 p-3 rounded-md flex-row"
        onPress={openContactModal}>
        <Icon name="mail-outline" size={24} color="#3f3f3f" />
        <Text className="text-lg ml-5">Зв'язок з розробником</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-100 p-3 rounded-md flex-row"
        onPress={openInfoModal}>
        <Icon name="information-outline" size={24} color="#3f3f3f" />
        <Text className="text-lg ml-5">Довідка</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-100 p-3 rounded-md flex-row"
        onPress={handleLogout}>
        <Icon name="walk-outline" size={24} color="#3f3f3f" />
        <Text className="text-lg ml-5">Вийти</Text>
      </TouchableOpacity>

      {/* Modal for contact */}
      <Modal visible={isContactModalVisible} className="bg-white">
        <ContactModal OnClose={closeContactModal}/>
      </Modal>

      {/* Modal for change password */}
      <Modal visible={isPasswordModalVisible} className="bg-white">
        <PasswordModal OnClose={closePasswordModal}/>
      </Modal>

      {/* Modal for check app info */}
      <Modal visible={isInfoModalVisible} className="bg-white">
        <InformationModal OnClose={closeInfoModal} />
      </Modal>
    </SafeAreaView>
  )
}
