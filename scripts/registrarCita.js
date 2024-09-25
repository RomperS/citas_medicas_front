import { apiBaseUrl } from '../src/config';
import { citas } from "../src/store";

const API_BASE_URL = apiBaseUrl;

async function enviarCita(citaData) {
  try {
    const response = await fetch(`${API_BASE_URL}/citas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(citaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        alert(errorData.message); // Muestra el mensaje de error en una alerta
      }
      throw new Error(`Error: ${response.statusText}`);
    }

    // Espera la respuesta y luego actualiza el store
    const newCita = await response.json();
    citas.update(currentCitas => [...currentCitas, newCita]);
    return newCita; // Devuelve la nueva cita si lo necesitas
  } catch (error) {
    console.error('Error al enviar la cita:', error);
    throw error;
  }
}



export { enviarCita };
