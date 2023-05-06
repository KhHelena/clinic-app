// GroupPicker.js
import { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const GroupPicker = ({ groups, onSelect, onCancel }) => {
  const [selectedGroup, setSelectedGroup] = useState(groups[0].NGroup)

  const handleSelect = () => {
    onSelect(selectedGroup)
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 20,
      }}>
      <Text>Оберіть групу для переносу</Text>
      <Picker
        selectedValue={selectedGroup}
        onValueChange={(itemValue) => setSelectedGroup(itemValue)}>
        {groups.map((group) => (
          <Picker.Item
            key={group.NGroup}
            label={group.Name}
            value={group.NGroup}
          />
        ))}
      </Picker>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Скасувати" onPress={onCancel} />
        <Button title="Перенести" onPress={handleSelect} />
      </View>
    </View>
  )
}

export default GroupPicker
