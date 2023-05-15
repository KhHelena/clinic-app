import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PagerView from 'react-native-pager-view'
import Pagination from 'react-native-pagination'

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { themeColors } from '../../theme/index'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const pagerRef = useRef(null)
  const [activePage, setActivePage] = useState(0)
  const navigation = useNavigation()
  const handlePageSelected = (e) => {
    setActivePage(e.nativeEvent.position)
  }

  const renderDots = () => {
    const dots = []
    for (let i = 0; i < 2; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dotStyle,
            i === activePage ? styles.activeDotStyle : styles.inactiveDotStyle,
          ]}
        />
      )
    }
    return dots
  }

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}>
        <View
          key="1"
          className="flex-1"
          style={{ backgroundColor: themeColors.bg }}>
          <View className="flex-1 flex justify-around my-4">
            <Text className="text-white font-bold text-4xl text-center">
              Кабінет Пацієнта
            </Text>
            <View className="flex-row justify-center">
              <Text style={{ fontSize: 100 }}>🤒</Text>
            </View>
            <View className="space-y-4">
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                className="py-3 bg-white mx-7 rounded-xl">
                <Text className="text-xl font-bold text-center text-gray-700">
                  Вхід
                </Text>
              </TouchableOpacity>
              <View className="flex-row justify-center">
                <Text className="text-white font-semibold">
                  Не має аккаунту?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text className="font-semibold text-blue-600">
                    {' '}
                    Реєстрація
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          key="2"
          className="flex-1"
          style={{ backgroundColor: themeColors.bg }}>
          <View className="flex-1 flex justify-around my-4">
            <Text className="text-white font-bold text-4xl text-center">
              Кабінет Лікаря
            </Text>
            <View className="flex-row justify-center">
              <Text style={{ fontSize: 150 }}>🥼</Text>
            </View>
            <View className="space-y-4">
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                className="py-3 bg-white mx-7 rounded-xl">
                <Text className="text-xl font-bold text-center text-gray-700">
                  Вхід
                </Text>
              </TouchableOpacity>
              <View className="flex-row justify-center">
                <Text className="text-white font-semibold">
                  Не має аккаунту?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text className="font-semibold text-blue-600">
                    {' '}
                    Реєстрація
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </PagerView>
      <View style={styles.pagination}>{renderDots()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDotStyle: {
    backgroundColor: 'white',
  },
  inactiveDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
})
