<script>
  import { onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { areas, medicos } from "../store.js"; // Importa los stores
  import { enviarCita } from "../../scripts/registrarCita.js";

  export let paciente = null; // Paciente para el cual se agenda la cita
  const dispatch = createEventDispatcher(); // Dispatcher para eventos

  let fecha = "";
  let hora = "";
  let idArea = "";
  let idMedico = null;
  let medicosList = [];
  let areasList = [];
  let estado = 'Agendada';
  let medicosFiltrados = []; // Para almacenar médicos filtrados

  // Suscríbete a los stores
  const unsubscribeAreas = areas.subscribe((value) => {
    areasList = value;
    if (areasList.length && idArea === "") {
      idArea = areasList[0].id; // Asigna el primer área por defecto
    }
  });

  const unsubscribeMedicos = medicos.subscribe((value) => {
    medicosList = value;
    filterMedicos(); // Filtra médicos cuando cambian
  });

  // Función para filtrar médicos basados en el área seleccionada
  function filterMedicos() {
    medicosFiltrados = medicosList.filter(
      (medico) => medico.id_area === parseInt(idArea)
    );
    // Resetea idMedico si no está en los médicos filtrados
    if (!medicosFiltrados.find((medico) => medico.id === idMedico)) {
      idMedico = null;
    }
  }

  function handleSubmit(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Crear el objeto JSON con los datos de la cita
    const citaData = {
      id_area: idArea,
      id_medico: idMedico,
      id_paciente: paciente.id,
      fecha,
      hora,
      estado,
    };

    console.log("Datos de la cita:", citaData);
    enviarCita(citaData); // Envía la cita a la API
    dispatch("close"); // Cierra el componente
  }

  function handleAreaChange() {
    filterMedicos(); // Filtra médicos cuando el área cambia
  }

  // Reacciona a cambios en idArea
  $: medicosFiltrados = medicosList.filter(
    (medico) => medico.id_area === parseInt(idArea)
  );

  // Limpiar suscripciones al desmontar el componente
  onDestroy(() => {
    unsubscribeAreas();
    unsubscribeMedicos();
  });
</script>

<div class="form-container">
  <h3>Agendar Cita para {paciente ? paciente.nombre : ""}</h3>
  <form on:submit={handleSubmit}>
    <label>
      Área:
      <select bind:value={idArea} on:change={handleAreaChange}>
        <option value="">Seleccione el área</option>
        {#each areasList as area}
          <option value={area.id}>{area.nombre_area}</option>
        {/each}
      </select>
    </label>
    <label>
      Médico:
      <select bind:value={idMedico} required>
        <option value="">Seleccione el médico</option>
        {#each medicosFiltrados as medico}
          <option value={medico.id}>{medico.nombre}</option>
        {/each}
      </select>
    </label>
    <label>
      Fecha:
      <input type="date" bind:value={fecha} required />
    </label>
    <label>
      Hora:
      <input type="time" bind:value={hora} required />
    </label>
    <button type="submit">Confirmar</button>
    <button type="button" on:click={() => dispatch("close")}>Cancelar</button>
  </form>
</div>

<style>
  .form-container {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    position: absolute;
    top: 20px;
    left: 20px;
    width: 350px;
    z-index: 2;
  }

  .form-container label {
    display: block;
    margin-bottom: 10px;
  }

  .form-container input,
  .form-container select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .form-container button {
    padding: 10px 20px;
    margin-right: 10px;
  }
</style>
