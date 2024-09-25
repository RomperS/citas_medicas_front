// src/obtenerDatos.js
import { areas, medicos, pacientes, citas } from '../src/store.js';
import { apiBaseUrl } from '../src/config.js'

const API_BASE_URL = apiBaseUrl;

async function fetchAreas() {
  try {
    const response = await fetch(`${API_BASE_URL}/areas`);
    if (!response.ok) throw new Error('Error al obtener áreas');
    const areasData = await response.json();
    areas.set(areasData); // Actualiza el store global
  } catch (error) {
    console.error(error);
  }
}

async function fetchMedicos() {
  try {
    const response = await fetch(`${API_BASE_URL}/medicos`);
    if (!response.ok) throw new Error('Error al obtener médicos');
    const medicosData = await response.json();
    medicos.set(medicosData.map(medico => ({
      ...medico,
      nombre_completo: `${medico.nombre} ${medico.apellidos}`
    })));
  } catch (error) {
    console.error(error);
  }
}

async function fetchPacientes() {
  try {
    const response = await fetch(`${API_BASE_URL}/pacientes`);
    if (!response.ok) throw new Error('Error al obtener pacientes');
    const pacientesData = await response.json();
    pacientes.set(pacientesData.map(paciente => ({
      ...paciente,
      nombre_completo: `${paciente.nombre} ${paciente.apellidos}`
    }))); // Actualiza el store global
  } catch (error) {
    console.error(error);
  }
}


async function fetchCitas() {
  try {
    const response = await fetch(`${API_BASE_URL}/citas`);
    if (!response.ok) throw new Error('Error al obtener citas');
    const citasData = await response.json();
    citas.set(citasData); // Actualiza el store global
  } catch (error) {
    console.error(error);
  }
}

export { fetchAreas, fetchMedicos, fetchPacientes, fetchCitas };
