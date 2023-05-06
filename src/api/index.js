const API_URL = "https://olenakhatuntseva.pythonanywhere.com/api/";

export const getPatients = async () => {
  try {
    const response = await fetch(`${API_URL}/patients`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Другие функции для работы с API
export const addPatient = async (patient) => {
    try {
      const response = await fetch(`${API_URL}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updatePatient = async (id, patient) => {
    try {
      const response = await fetch(`${API_URL}/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deletePatient = async (id) => {
    try {
      await fetch(`${API_URL}/patients/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  // Получение всех групп
export const getAllGroups = async () => {
  try {
    const response = await fetch(`${API_URL}/groups`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Создание группы
export const createGroup = async (group) => {
  try {
    const response = await fetch(`${API_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Обновление группы
export const updateGroup = async (id, group) => {
  try {
    const response = await fetch(`${API_URL}groups/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });
    const responseText = await response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.error(error);
  }
};

// Удаление группы
export const deleteGroup = async (id) => {
  try {
    await fetch(`${API_URL}groups/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
};


// Перенос пациента в другую группу
export const transferPatient = async (patientId, groupId) => {
  try {
    const response = await fetch(`${API_URL}patients/${patientId}/transfer/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Получение списка процедур по ID пациента
export const getPatientProcedures = async (patientId) => {
  try {
    const response = await fetch(`${API_URL}patients/${patientId}/procedures`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Загрузка статистики по группе
export const downloadGroupStats = async (groupId) => {
  try {
    const response = await fetch(`${API_URL}groups/${groupId}/sessions`);
    const blob = await response.blob();
    const base64Data = await convertBlobToBase64(blob);
    const uri = await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + `sessions_group_${groupId}.xlsx`,
      base64Data.replace('data:application/octet-stream;base64,', ''),
      { encoding: FileSystem.EncodingType.Base64 }
    );
    await Sharing.shareAsync(FileSystem.documentDirectory + `sessions_group_${groupId}.xlsx`);
  } catch (error) {
    console.error(error);
  }
};

// Загрузка статистики по пациенту
export const downloadPatientStats = async (nmedcard) => {
  try {
    const response = await fetch(`${API_URL}patients/${nmedcard}/sessions`);
    const blob = await response.blob();
    const base64Data = await convertBlobToBase64(blob);
    const uri = await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + `sessions_medcard_${nmedcard}.xlsx`,
      base64Data.replace('data:application/octet-stream;base64,', ''),
      { encoding: FileSystem.EncodingType.Base64 }
    );
    await Sharing.shareAsync(FileSystem.documentDirectory + `sessions_medcard_${nmedcard}.xlsx`);
  } catch (error) {
    console.error(error);
  }
};

