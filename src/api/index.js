// Backend url
const API_URL = 'https://olenakhatuntseva.pythonanywhere.com/api/'

// Get all patients
export const getPatients = async () => {
  try {
    const response = await fetch(`${API_URL}/patients`)
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

// Add patient
export const addPatient = async (patient) => {
  try {
    const response = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

//Update patient
export const updatePatient = async (id, patient) => {
  try {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

// Delete patient
export const deletePatient = async (id) => {
  try {
    await fetch(`${API_URL}/patients/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error(error)
  }
}

// Get all groups
export const getAllGroups = async () => {
  try {
    const response = await fetch(`${API_URL}/groups`)
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

// Create group
export const createGroup = async (group) => {
  try {
    const response = await fetch(`${API_URL}/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group),
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

// Update group
export const updateGroup = async (id, group) => {
  try {
    const response = await fetch(`${API_URL}groups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group),
    })
    const responseText = await response.text()
    return JSON.parse(responseText)
  } catch (error) {
    console.error(error)
  }
}

// Group delete
export const deleteGroup = async (id) => {
  try {
    await fetch(`${API_URL}groups/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error(error)
  }
}

// Transfer patient to another group
export const transferPatient = async (patientId, groupId) => {
  try {
    const response = await fetch(
      `${API_URL}patients/${patientId}/transfer/${groupId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

// Get procedures list by patients id
export const getPatientProcedures = async (patientId) => {
  try {
    const response = await fetch(`${API_URL}patients/${patientId}/procedures`)
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import axios from 'axios'
import { encode as btoa } from 'base-64'

const arrayBufferToBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

// Download group statistics
export const downloadGroupStats = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}groups/${groupId}/sessions`, {
      responseType: 'arraybuffer',
    })
    const base64Data = arrayBufferToBase64(response.data)
    const uri = await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + `sessions_group_${groupId}.xlsx`,
      base64Data,
      { encoding: FileSystem.EncodingType.Base64 }
    )
    await Sharing.shareAsync(
      FileSystem.documentDirectory + `sessions_group_${groupId}.xlsx`
    )
  } catch (error) {
    console.error(error)
  }
}

// Download patient statistics
export const downloadPatientStats = async (nmedcard) => {
  try {
    const response = await axios.get(
      `${API_URL}patients/${nmedcard}/sessions`,
      {
        responseType: 'arraybuffer',
      }
    )
    const base64Data = arrayBufferToBase64(response.data)
    const uri = await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + `sessions_medcard_${nmedcard}.xlsx`,
      base64Data,
      { encoding: FileSystem.EncodingType.Base64 }
    )
    await Sharing.shareAsync(
      FileSystem.documentDirectory + `sessions_medcard_${nmedcard}.xlsx`
    )
  } catch (error) {
    console.error(error)
  }
}

// Register a doctor
export const registerDoctor = async (doctor) => {
  console.log(JSON.stringify(doctor))
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctor),
    });
    console.log(response)
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Login doctor
export const loginDoctor = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Get doctor information
export const getDoctor = async (doctorId) => {
  try {
    const response = await fetch(`${API_URL}/doctor/${doctorId}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Register a patient
export const registerPatient = async (patient) => {
  try {
    const response = await fetch(`${API_URL}/patients/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Login patient
export const loginPatient = async (credentials) => {
  
    const response = await fetch(`${API_URL}/patients/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
};

// Get patient data by medcard number
export const getPatientByMedcard = async (nmedcard) => {
  try {
    const response = await fetch(`${API_URL}/patients/${nmedcard}`)
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}