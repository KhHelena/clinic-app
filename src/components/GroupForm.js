// GroupForm.js
import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'

const GroupForm = ({ group, onSubmit, onCancel }) => {
  const [name, setName] = useState(group.Name || '')
  const [nGroup, setNGroup] = useState(group.NGroup || '')

  const handleSubmit = () => {
    onSubmit({
      NGroup: nGroup,
      Name: name
    })
  }

  return (
    <View style={styles.groupForm}>
      <View style={{ paddingBottom: 10 }}>
        <Text>Ім'я группи:</Text>
        <TextInput
          placeholder="Group Name"
          value={name}
          onChangeText={setName}
          style={{
            borderBottomWidth: 1,
            paddingTop: 10,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button title="Повернутися" onPress={onCancel} />
        <Button title="Підтвердити" onPress={handleSubmit} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  groupForm: {
    backgroundColor: '#fff',
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
    marginTop: 10,
  },
})

export default GroupForm
