const API_URL = "https://worker2245.pythonanywhere.com/api/";

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
