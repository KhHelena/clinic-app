import React, { useState } from 'react';
import { View, Text, Picker, Button } from 'react-native';

const TransferPatientModal = ({ patientId, groups, onTransfer, onCancel }) => {
  const [selectedGroup, setSelectedGroup] = useState('');

  const handleTransfer = () => {
    onTransfer(patientId, selectedGroup);
  };

  return (
    <View>
      <Text>Перенести пациента {patientId} в группу:</Text>
      <Picker
        selectedValue={selectedGroup}
        onValueChange={(itemValue) => setSelectedGroup(itemValue)}
      >
        {groups.map((group) => (
          <Picker.Item key={group.NGroup} label={group.Name} value={group.NGroup.toString()} />
        ))}
      </Picker>
      <Button title="Перенести" onPress={handleTransfer} />
      <Button title="Отмена" onPress={onCancel} />
    </View>
  );
};

export default TransferPatientModal;
