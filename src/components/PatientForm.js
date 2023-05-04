// src/components/PatientForm.js

import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const PatientForm = ({ patient, onSubmit }) => {
  const [surname, setSurname] = useState(patient.Surname || '');
  const [firstName, setFirstName] = useState(patient.FirstName || '');
  const [patronymic, setPatronymic] = useState(patient.Patronymic || '');

  const handleSubmit = () => {
    onSubmit({
      ...patient,
      Surname: surname,
      FirstName: firstName,
      Patronymic: patronymic,
    });
 
};

return (
<View>
<TextInput
     placeholder="Surname"
     value={surname}
     onChangeText={setSurname}
   />
<TextInput
     placeholder="First Name"
     value={firstName}
     onChangeText={setFirstName}
   />
<TextInput
     placeholder="Patronymic"
     value={patronymic}
     onChangeText={setPatronymic}
   />
<Button title="Submit" onPress={handleSubmit} />
</View>
);
};

export default PatientForm;