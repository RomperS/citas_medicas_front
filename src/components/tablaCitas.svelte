<script>
  import { onMount } from "svelte";
  import { citas } from "../store";

  export let pacienteId;

  console.log(pacienteId);

  let loading = true;
  let citasData = [];

  let unsubscribe;

  onMount(() => {
    // Suscribirse a la tienda "citas" y filtrar las citas del paciente
    unsubscribe = citas.subscribe((value) => {
      const citasTemp = value;
      citasData = filtrarPorPaciente(citasTemp, pacienteId);
      console.log(citasData);
    });

    // Simular un retraso de carga
    setTimeout(() => {
      loading = false;
    }, 1000);

    // Desuscribirse al desmontar el componente
    return () => {
      unsubscribe();
    };
  });

  function filtrarPorPaciente(arreglo, idPaciente) {
    return arreglo.filter((item) => item.id_paciente === idPaciente);
  }
</script>

{#if loading}
  <p>Cargando citas...</p>
{:else}
  <table>
    <caption>Listado de Citas</caption>
    <thead>
      <tr>
        <th>Área</th>
        <th>Médico</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      {#if citasData.length > 0}
        {#each citasData as cita (cita.id)}
          <tr>
            <td>{cita.id_area}</td>
            <!-- Asumiendo que 'id_area' representa el área -->
            <td>{cita.id_medico}</td>
            <!-- Asumiendo que 'id_medico' representa el médico -->
            <td>{cita.fecha}</td>
            <!-- Asegúrate de que 'fecha' esté bien formateada -->
            <td>{cita.hora}</td>
            <td>{cita.estado}</td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td colspan="5">No hay citas disponibles</td>
        </tr>
      {/if}
    </tbody>
  </table>
{/if}

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-family: Arial, sans-serif;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:hover {
    background-color: #e0e0e0;
  }
  caption {
    font-size: 1.5em;
    margin: 10px 0;
  }
</style>
