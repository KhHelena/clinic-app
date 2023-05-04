import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const GroupForm = ({ group, onSubmit }) => {
  const [name, setName] = useState(group.Name || '');

  const handleSubmit = () => {
    onSubmit({
      ...group,
      Name: name,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Group Name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default GroupForm;
