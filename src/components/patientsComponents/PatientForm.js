import React, { useState } from 'react'
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'

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
    const dateOfBirthWithoutTime = new Date(DataOfBirth);
    dateOfBirthWithoutTime.setHours(0, 0, 0, 0);
    
    // Convert the date to a Unix timestamp in seconds
    const timestamp = Math.floor(dateOfBirthWithoutTime.getTime() / 1000);
  
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
    });
  };
  

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 20,
      }}>
      <TextInput
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Patronymic"
        value={patronymic}
        onChangeText={setPatronymic}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="DataOfBirth"
        value={formatDate(DataOfBirth)}
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
          <Text>Show Date Picker</Text>
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
      <Picker
        selectedValue={Sex}
        onValueChange={(itemValue) => setSex(itemValue)}
        style={{ height: 50, width: 100 }}>
        <Picker.Item label="м." value="м." />
        <Picker.Item label="ж." value="ж." />
      </Picker>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TextInput
          placeholder="Height"
          value={Height.toString()}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Weight"
          value={Weight.toString()}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        placeholder="Address"
        value={Address}
        onChangeText={setAddress}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Phone Number"
        value={PhoneN}
        onChangeText={setPhoneN}
        keyboardType="phone-pad"
        maxLength={17}
      />
      <TextInput
        placeholder="Email"
        value={Email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Diagnosis"
        value={Diagnosis}
        onChangeText={setDiagnosis}
      />
      <TextInput
        placeholder="Nmedcard"
        value={Nmedcard.toString()}
        onChangeText={setNmedcard}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  )
}

export default PatientForm
