<script>
  import { onMount } from "svelte";
  import MenuLateral from "../components/menuLateral.svelte";
  import Botongenerico from "../components/botongenerico.svelte";
  import Agendarcitas from "../components/agendarcitas.svelte";
  import Citas from "../components/citas.svelte";
  import { areas, medicos, pacientes, citas } from "../store.js";

  let pacientesDatos;
  let areasDatos;
  let medicosDatos;
  let citasMedicas;

  function testPacientesStore() {
    pacientes.subscribe((value) => {
      pacientesDatos = value;
    });
    medicos.subscribe((value) => {
      medicosDatos = value;
    });
    areas.subscribe((value) => {
      areasDatos = value;
    });
    citas.subscribe((value) => {
      citasMedicas = value;
    });
  }

  onMount(() => {
    testPacientesStore();
  });

  function test() {
    console.log("Contenido de pacientes:", pacientesDatos);
  }

  let mostrarAgendarCitas = false;
  let mostrarCitas = false;

  function showAgendarCitas() {
    mostrarAgendarCitas = true;
    mostrarCitas = false;
  }

  function showCitas() {
    mostrarCitas = true;
    mostrarAgendarCitas = false;
  }

  function handleCancel() {
    mostrarAgendarCitas = false;
    mostrarCitas = false;
  }

  let top = "30px";
  let left = "250px";
</script>

<main>
  <img src="/static/images/fondoAdmin.jpg" alt="" />
  <MenuLateral/>

  <Botongenerico
    text="Agendar Cita"
    position="absolute"
    top="88%"
    left="30%"
    height="60px"
    width="200px"
    on:click={showAgendarCitas}
  />

  <Botongenerico
    text="Ver Citas"
    position="absolute"
    top="88%"
    left="70%"
    height="60px"
    width="200px"
    on:click={showCitas}
  />

  <Agendarcitas
    {top}
    {left}
    isVisible={mostrarAgendarCitas}
    dataPacientes={pacientesDatos}
    areasVal={areasDatos}
    medicosVal={medicosDatos}
    on:cancel={handleCancel}
  />

  <Citas
    {top}
    {left}
    isVisible={mostrarCitas}
    areasVal={areasDatos}
    medicosVal={medicosDatos}
    pacientesVal={pacientesDatos}
    on:cancel={handleCancel}
  />

</main>

<style>
  img {
    width: 78%;
    height: 100vh;
    position: absolute;
    top: 0%;
    left: 22%;
  }
</style>
