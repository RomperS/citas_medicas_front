// testObtenerDatos.js
import { areas, medicos, pacientes } from './../src/storage.js';
import { fetchAreas, fetchMedicos, fetchPacientes } from './obtenerDatos.js';

fetchAreas();
fetchMedicos();
fetchPacientes();

function testAreasStore() {
  // Suscribirse al store de areas para imprimir su valor
  areas.subscribe(value => {
    console.log('Contenido de areas:', value);
  });
}

function testMedicosStore() {
  // Suscribirse al store de medicos para imprimir su valor
  medicos.subscribe(value => {
    console.log('Contenido de medicos:', value);
  });
}

function testPacientesStore() {
  // Suscribirse al store de pacientes para imprimir su valor
  pacientes.subscribe(value => {
    console.log('Contenido de pacientes:', value);
  });
}

// Ejecutar las pruebas

testAreasStore();
//testPacientesStore();
testMedicosStore();