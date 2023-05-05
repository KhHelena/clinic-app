// GroupPicker.js
import {useState} from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GroupPicker = ({ groups, onSelect, onCancel }) => {
  const [selectedGroup, setSelectedGroup] = useState(groups[0].NGroup);

  const handleSelect = () => {
    onSelect(selectedGroup);
  };

  return (
    <View>
      <Text>Select a group</Text>
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
      <Button title="Transfer" onPress={handleSelect} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

export default GroupPicker;
