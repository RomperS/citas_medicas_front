import { writable } from 'svelte/store';

export const areas = writable([]);
export const medicos = writable([]);
export const pacientes = writable([]);
export const citas = writable([]);
export const pacienteId = writable(null);
