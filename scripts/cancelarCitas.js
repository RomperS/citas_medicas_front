import { fetchCitas } from "./obtenerDatos"

function cancelarCita(dato) {
    const url = `http://localhost:3000/api/citas/${dato}`; // URL con el dato

    fetch(url, {
        method: 'DELETE', // Cambia a 'POST' si necesitas enviar datos
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json(); // Cambia a response.text() si no esperas JSON
    })
    .then(data => {
        fetchCitas();
        alert(JSON.stringify(data)); // Muestra la respuesta en un alert
    })
    .catch(error => {
        alert('Hubo un problema con la solicitud: ' + error.message); // Muestra el error
    });
}

export {cancelarCita};
