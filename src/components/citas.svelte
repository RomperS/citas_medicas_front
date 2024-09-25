<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte"; 
  import FormularioCitas from "../components/formularioCitas.svelte";
  import { fetchCitas } from "../../scripts/obtenerDatos";
  import { citas } from "../store";
  import { cancelarCita } from "../../scripts/cancelarCitas";

  export let areasVal = [];
  export let medicosVal = [];
  export let pacientesVal = [];
  export let top = "0px";
  export let left = "0px";
  export let isVisible = false;

  let dataCitas = [];
  const dispatch = createEventDispatcher();
  let visible = isVisible;
  $: visible = isVisible;

  let selectedRow = null;
  let filterText = "";
  let citaSeleccionada = null;
  let formularioVisible = false;
  let idCita = undefined;

  let originalCitas = [];
  let displayedCitas = [];

  // Usar declaración reactiva para suscribirse automáticamente al store
  $: dataCitas = $citas;

  $: {
    if (dataCitas.length) {
      originalCitas = [...dataCitas];
      displayedCitas = filterText ? applyFilter() : [...originalCitas];
    }
  }

  function getAreaName(id) {
    const area = areasVal.find((area) => area.id === id);
    return area ? area.nombre_area : "Desconocido";
  }

  function getMedicoName(id) {
    const medico = medicosVal.find((medico) => medico.id === id);
    return medico ? medico.nombre_completo : "Desconocido";
  }

  function getPacienteName(id) {
    const paciente = pacientesVal.find((paciente) => paciente.id === id);
    return paciente ? paciente.nombre_completo : "Desconocido";
  }

  function applyFilter() {
    if (filterText) {
      return originalCitas.filter(
        (cita) =>
          cita.fecha.includes(filterText) || cita.hora.includes(filterText)
      );
    }
    return [...originalCitas];
  }

  function handleFilterChange(event) {
    filterText = event.target.value;
    displayedCitas = applyFilter();
  }

  function selectRow(index) {
    selectedRow = index;
    if (displayedCitas[index]) {
      citaSeleccionada = displayedCitas[index];
      idCita = citaSeleccionada.id;
    }
  }

  function ocultarFormulario() {
    formularioVisible = false;
  }

  function ocultarComponente() {
    dispatch("cancel");
  }

  function formatDate(dateTime) {
    const date = new Date(dateTime);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Meses están basados en 0
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  }

  function test() {
    fetchCitas();
  }

  function cancelar() {
    if (idCita != undefined) {
      cancelarCita(idCita);
    } else {
      return alert(idCita);
    }
  }
</script>

{#if visible}
  <div class="table-container" style="top: {top}; left: {left};">
    <input
      type="text"
      placeholder="Filtrar por fecha o hora"
      on:input={handleFilterChange}
      class="filter-input"
    />

    <table>
      <thead>
        <tr>
          <th>Área</th>
          <th>Médico</th>
          <th>Paciente</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedCitas as cita, index}
          <tr
            class:selected={selectedRow === index}
            on:click={() => selectRow(index)}
          >
            <td>{getAreaName(cita.id_area)}</td>
            <td>{getMedicoName(cita.id_medico)}</td>
            <td>{getPacienteName(cita.id_paciente)}</td>
            <td>{formatDate(cita.fecha)}</td>
            <td>{formatTime(cita.hora)}</td>
            <td>{cita.estado}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="buttons">
      <button class="btn" on:click={cancelar}>Cancelar cita</button>
      <button class="btn" on:click={test}>Refrescar</button>
      <button class="btn" on:click={ocultarComponente}>Cancelar</button>
    </div>

    {#if formularioVisible && citaSeleccionada}
      <FormularioCitas cita={citaSeleccionada} on:close={ocultarFormulario} />
    {/if}
  </div>
{/if}

<style>
  ::-webkit-scrollbar {
    display: none;
  }
  .table-container {
    border-radius: 10px;
    background-color: #006699;
    position: absolute;
    overflow: auto;
    max-height: 810px;
    height: 100vh;
    width: 80%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding-bottom: 60px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    position: relative;
    left: 7.5%;
    width: 1200px;
    border-collapse: collapse;
  }

  thead,
  tbody {
    display: block;
  }

  tbody {
    max-height: 680px;
    overflow: auto;
  }

  thead th,
  tbody td {
    border: 1px solid black;
    text-align: left;
    padding: 8px;
    width: 200px; /* Ancho fijo para las celdas */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  thead th {
    background-color: rgb(3, 4, 94);
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tbody tr {
    display: table; /* Hace que las filas del cuerpo de la tabla se comporten como tablas dentro del bloque */
    width: 100%;
    table-layout: fixed; /* Asegura que el ancho de las celdas sea fijo */
  }
  thead th {
    background-color: rgb(3, 4, 94);
    color: white;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tr {
    background-color: #d3d3d3;
    width: 1200px;
  }

  tr.selected {
    background-color: rgb(0, 96, 185);
    color: white;
  }

  .filter-input {
    width: 1200px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;
    left: 50%;
    top: 5px;
    transform: translate(-50%);
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #0056b3;
  }
</style>
