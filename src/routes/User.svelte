<script>
  document.body.style.background =
    "linear-gradient(to top, rgb(11, 52, 72, 0.88) 0%, #0D3C54 25%, #1A7DAE 50%)";

  import { onMount } from "svelte";
  import Articulo from "../components/articulo.svelte";
  import CircleContainer from "../components/circlecontainer.svelte";
  import DatoLista from "../components/datoLista.svelte";
  import { pacienteId, citas, pacientes } from "../store";
  import { Link } from "svelte-routing";
  import CitasTable from "../components/tablaCitas.svelte";

  let nombreCompleto = "";
  let docIdentidad = "";
  let fechaNacimiento = "";
  let idPaciente;
  let citasData = [];
  let pacientesData = [];

  onMount(() => {
    pacienteId.subscribe((value) => {
      idPaciente = value;
    });

    citas.subscribe((value) => {
      const citasTemp = value;

      // Filtramos las citas por el id del paciente
      citasData = citasTemp.filter((cita) => cita.id_paciente === idPaciente);
    });

    pacientes.subscribe((value) => {
      pacientesData = value;
      const pacienteEspecifico = pacientesData.find(
        (paciente) => paciente.id === idPaciente
      );
      nombreCompleto =
        pacienteEspecifico.nombre + " " + pacienteEspecifico.apellidos;
      docIdentidad = pacienteEspecifico.numero_identificacion;
      fechaNacimiento = formatearFecha(pacienteEspecifico.fecha_nacimiento);
    });
  });

  function formatearFecha(fecha) {
    const date = new Date(fecha);
    const dia = String(date.getUTCDate()).padStart(2, "0");
    const mes = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    const anio = date.getUTCFullYear();
    return `${dia}/${mes}/${anio}`;
  }
</script>

<main>
  <img src="static/images/logo.png" alt="icono" id="icono" />

  <!-- Información del paciente -->
  <Articulo
    id="ArticuloInformacion"
    width="320px"
    height="600px"
    position="absolute"
    top="30%"
    left="20%"
    transform="translate(-50%, -26.5%)"
  >
    <CircleContainer
      src="/static/images/imagenPerfilPaciente.jpg"
      size="150px"
      background="linear-gradient(rgb(251, 100, 0), rgb(0, 119, 182))"
      opacityImg="1"
      position="absolute"
      left="50%"
      top="25%"
      transform="translate(-50%, -75%)"
    />
    <DatoLista
      dato={nombreCompleto}
      datoTipo="PACIENTE"
      position="relative"
      top="220px"
    />
    <DatoLista
      dato={docIdentidad}
      datoTipo="DOC. IDENTIDAD"
      position="relative"
      top="250px"
    />
    <DatoLista
      dato={fechaNacimiento}
      datoTipo="FECHA NACIMIENTO"
      position="relative"
      top="280px"
    />
  </Articulo>

  <!-- Main -->
  <Articulo
    id="ArticuloMain"
    width="1250px"
    height="700px"
    position="absolute"
    top="30%"
    left="50%"
    transform="translate(-30%, -30%)"
  >
    {#if idPaciente !== undefined}
      <CitasTable pacienteId={idPaciente} />
    {/if}
  </Articulo>

  <nav id="navegador">
    <ul class="nav">
      <li>
        <a href="a"><img src="static/images/ImagenPerfil.png" alt="" /></a>
      </li>
      <li>
        <img
          src="static/images/resultados.png"
          alt=""
          title="Resultados medicos"
        />
      </li>
      <li>
        <img src="static/images/agendadas.png" alt="" title="Citas agendadas" />
      </li>
      <li>
        <img
          src="static/images/historial.png"
          alt=""
          title="Historial medico"
        />
      </li>
      <li>
        <img
          src="static/images/asistencia.png"
          alt=""
          title="Asistencia/Ayuda"
        />
      </li>
      <li>
        <Link to="/"
          ><img src="static/images/Salir.png" alt="" title="Salir" /></Link
        >
      </li>
    </ul>
  </nav>
</main>

<style>
  #navegador {
    background: linear-gradient(to bottom, #065983 0%, #01141d 79%);
    width: 90%;
    height: 110px;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid 1px black;
    border-radius: 30px;
  }

  .nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  img {
    max-height: 90px;
    max-width: 90px;
    object-fit: contain;
  }
</style>
