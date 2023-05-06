import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const GroupAppForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit({
      Name: name,
    });
  };

  return (

        <View style={styles.groupForm}>
          <View style={{ paddingBottom: 10 }}>
            <Text>Ім'я группи:</Text>
            <TextInput
              placeholder="Введіть ім'я"
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
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  groupForm: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default GroupAppForm;
