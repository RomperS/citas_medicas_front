import App from './App.svelte';
import 'flowbite';
import 'flowbite-svelte';
import { fetchAreas, fetchMedicos, fetchPacientes, fetchCitas } from '../scripts/obtenerDatos';

fetchAreas();
fetchMedicos();
fetchPacientes();
fetchCitas();

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;