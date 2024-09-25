<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
  import FormularioCitas from '../components/formularioCitas.svelte';

  export let dataPacientes = [];
  export let top = "0px";
  export let left = "0px";
  export let isVisible = false;

  const dispatch = createEventDispatcher();

  let visible = isVisible;
  $: visible = isVisible;

  let selectedRow = null;
  let filterText = "";
  let pacienteSeleccionado = null;
  let formularioVisible = false;

  // Usar el store directamente
  $: originalPacientes = [...dataPacientes];
  $: displayedPacientes = [...originalPacientes];

  function applyFilter() {
    if (filterText) {
      displayedPacientes = originalPacientes.filter((paciente) =>
        paciente.numero_identificacion.includes(filterText)
      );
    } else {
      displayedPacientes = [...originalPacientes];
    }
  }

  function handleFilterChange(event) {
    filterText = event.target.value;
    applyFilter();
  }

  function selectRow(index) {
    selectedRow = index;
    if (displayedPacientes[index]) {
      pacienteSeleccionado = displayedPacientes[index];
    }
  }

  function mostrarFormulario() {
    formularioVisible = true;
  }

  function ocultarFormulario() {
    formularioVisible = false;
  }

  function ocultarComponente() {
    dispatch("cancel");
  }

  function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
</script>

{#if visible}
  <div class="table-container" style="top: {top}; left: {left};">
    <input
      type="text"
      placeholder="Filtrar por número de identificación"
      on:input={handleFilterChange}
      class="filter-input"
    />

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Número de Identificación</th>
          <th>Fecha de Nacimiento</th>
          <th>Correo Electrónico</th>
          <th>Número de Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {#each displayedPacientes as paciente, index}
          <tr
            class:selected={selectedRow === index}
            on:click={() => selectRow(index)}
          >
            <td>{paciente.nombre}</td>
            <td>{paciente.apellidos}</td>
            <td>{paciente.numero_identificacion}</td>
            <td>{formatearFecha(paciente.fecha_nacimiento)}</td>
            <td>{paciente.correo_electronico}</td>
            <td>{paciente.numero_telefono}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="buttons">
      <button class="btn" on:click={mostrarFormulario}>Agendar cita</button>
      <button class="btn" on:click={() => dispatch('historial', pacienteSeleccionado)}>Historial médico</button>
      <button class="btn" on:click={ocultarComponente}>Cancelar</button>
    </div>

    {#if formularioVisible && pacienteSeleccionado}
      <FormularioCitas
        paciente={pacienteSeleccionado}
        on:close={ocultarFormulario}
      />
    {/if}
  </div>
{/if}

<style>
  /* Tu estilo aquí */
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
    width: 200px;
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
    display: table;
    width: 100%;
    table-layout: fixed;
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
