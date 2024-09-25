// procesarCombobox.js

/**
 * Convierte un array de áreas en un arreglo de nombres de áreas.
 * @param {Array} areas - Array de objetos de áreas.
 * @return {Array} - Arreglo de nombres de áreas.
 */
export function obtenerNombresAreas(areas) {
    return areas.map(area => area.nombre_area);
}

/**
 * Encuentra el ID de un área por su nombre.
 * @param {Array} areas - Array de objetos de áreas.
 * @param {string} nombreArea - Nombre del área.
 * @return {number|null} - ID del área o null si no se encuentra.
 */
export function obtenerIdAreaPorNombre(areas, nombreArea) {
    const area = areas.find(area => area.nombre_area === nombreArea);
    return area ? area.id : null;
}

/**
 * Filtra médicos por el ID de área y retorna un arreglo con sus nombres.
 * @param {Array} medicos - Array de objetos de médicos.
 * @param {number} idArea - ID del área.
 * @return {Array} - Arreglo de nombres de médicos.
 */
export function obtenerMedicosPorArea(medicos, idArea) {
    return medicos
        .filter(medico => medico.id_area === idArea)
        .map(medico => medico.nombre);
}