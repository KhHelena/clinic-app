import React, { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

const formatDate = (date) => {
  const d = new Date(date)
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
}

const PatientForm = ({ patient, onSubmit, onCancel }) => {
  const [surname, setSurname] = useState(patient.Surname || '')
  const [firstName, setFirstName] = useState(patient.FirstName || '')
  const [patronymic, setPatronymic] = useState(patient.Patronymic || '')
  const [DataOfBirth, setDataOfBirth] = useState(
    patient.DataOfBirth || new Date().toString()
  )
  const [Sex, setSex] = useState(patient.Sex || '')
  const [Height, setHeight] = useState(patient.Height || '')
  const [Weight, setWeight] = useState(patient.Weight || '')
  const [Address, setAddress] = useState(patient.Address || '')
  const [PhoneN, setPhoneN] = useState(patient.PhoneN || '')
  const [Email, setEmail] = useState(patient.Email || '')
  const [Diagnosis, setDiagnosis] = useState(patient.Diagnosis || '')
  const [Nmedcard, setNmedcard] = useState(patient.Nmedcard || '')
  const [NSessionDiagn, setNSessionDiagn] = useState(
    patient.NSessionDiagn || ''
  )
  const [NSessionTreat, setNSessionTreat] = useState(
    patient.NSessionTreat || ''
  )

  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setDataOfBirth(selectedDate.toISOString())
    }
  }

  const handleSubmit = () => {
    const dateOfBirthWithoutTime = new Date(DataOfBirth)
    dateOfBirthWithoutTime.setHours(0, 0, 0, 0)

    // Convert the date to a Unix timestamp in seconds
    const timestamp = Math.floor(dateOfBirthWithoutTime.getTime() / 1000)

    onSubmit({
      Surname: surname,
      FirstName: firstName,
      Patronymic: patronymic,
      DataOfBirth: timestamp, // Send the timestamp instead of a formatted date string
      Sex: Sex,
      Height: parseInt(Height),
      Weight: parseInt(Weight),
      Address: Address,
      PhoneN: PhoneN,
      Email: Email,
      Diagnosis: Diagnosis,
      Nmedcard: parseInt(Nmedcard),
      NSessionDiagn: NSessionDiagn,
      NSessionTreat: NSessionTreat,
    })
  }

  return (
    <ScrollView className=" pt-5 bg-gray-100">
      <View className="flex-row justify-start pt-5 bg-gray-100">
        <TouchableOpacity
          onPress={onCancel}
          className="bg-gray-100 p-2 rounded-md shadow-md ml-4">
          <ArrowLeftIcon size="20" color="black" />
        </TouchableOpacity>
      </View>
      <View className=" flex-1 p-10 pt-5 gap-3">
        <View style={styles.row}>
          <Text>Прізвище:</Text>
          <TextInput
            placeholder="Прізвище"
            value={surname}
            onChangeText={setSurname}
            style={styles.input}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.row}>
          <Text>Ім'я:</Text>
          <TextInput
            placeholder="Імʼя"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.row}>
          <Text>По-батькові:</Text>
          <TextInput
            placeholder="По батькові"
            value={patronymic}
            onChangeText={setPatronymic}
            style={styles.input}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.row}>
          <Text>Дата народження:</Text>
          <TextInput
            placeholder="DataOfBirth"
            value={formatDate(DataOfBirth)}
            style={styles.input}
            onFocus={() => setShowDatePicker(true)}
          />
          {Platform.OS === 'ios' ? (
            <DateTimePicker
              value={new Date(DataOfBirth)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          ) : (
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text>Обрати дату</Text>
            </TouchableOpacity>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={new Date(DataOfBirth)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.row}>
          <Text>Стать:</Text>
          <Picker
            selectedValue={Sex}
            onValueChange={(itemValue) => setSex(itemValue)}
            style={{ height: 50, width: 100 }}>
            <Picker.Item label="ч." value="ч." />
            <Picker.Item label="ж." value="ж." />
          </Picker>
        </View>

        <View style={styles.row}>
          <Text>Ріст:</Text>
          <TextInput
            placeholder="Ріст"
            value={Height.toString()}
            onChangeText={setHeight}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text>Вага:</Text>
          <TextInput
            placeholder="Вага"
            value={Weight.toString()}
            onChangeText={setWeight}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <Text>Адреса:</Text>
          <TextInput
            placeholder="Адреса"
            value={Address}
            onChangeText={setAddress}
            autoCapitalize="words"
            style={styles.input}
          />
        </View>

        <View style={styles.row}>
          <Text>Номер моб. т.:</Text>
          <TextInput
            placeholder="Номер моб. телефону"
            value={PhoneN}
            onChangeText={setPhoneN}
            keyboardType="phone-pad"
            style={styles.input}
            maxLength={17}
          />
        </View>

        <View style={styles.row}>
          <Text>Email:</Text>
          <TextInput
            placeholder="Пошта"
            value={Email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.row}>
          <Text>Діагноз:</Text>
          <TextInput
            placeholder="Діагноз"
            value={Diagnosis}
            onChangeText={setDiagnosis}
            style={styles.input}
          />
        </View>

        <View style={styles.row}>
          <Text>Номер мед. картки:</Text>
          <TextInput
            placeholder="Номер мед.карти"
            value={Nmedcard.toString()}
            onChangeText={setNmedcard}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Підтвердити" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginLeft: 5,
    flex: 1,
  },
})
export default PatientForm
