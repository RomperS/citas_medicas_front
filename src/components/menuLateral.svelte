<script>
  import CircleContainer from "./circlecontainer.svelte";
  import { Link } from "svelte-routing"; // Importa Link
  let menuItems = [
      { name: "Perfil", link: "#" },
      { name: "Doctor", link: "#" },
      { name: "Calendario", link: "#" }
  ];
</script>

<article>
  <CircleContainer
    src="/static/images/recepcionista.jpg"
    size="150px"
    background="linear-gradient(rgb(251, 100, 0), rgb(0, 119, 182))"
    opacityImg="1"
    position="absolute"
    left="50%"
    top="25%"
    transform="translate(-50%, -75%)"
    backgroundHover="linear-gradient(rgb(251, 100, 0), rgb(251, 100, 0))"
  />
  <nav>
      {#each menuItems as item}
          <a href={item.link}>{item.name}</a>
      {/each}
  </nav>

  <Link to="/">
      <button>
          Salir
      </button>
  </Link>
</article>


<style>
  article {
    background-color: #011024;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 22%;
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 20px;
    box-sizing: border-box;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 50px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  a {
    width: 10vw;
    color: white;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    transition: background-color 0.3s ease;
    border-bottom: solid rgb(255, 255, 255) 2px;
  }

  a:hover {
    background-color: #1c3a75; /* Color de fondo al pasar el mouse */
    border-radius: 5px;
  }

  button {
    width: 10vw;
    background-color: rgb(0, 0, 0, 0);
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    transition: background-color 0.3s ease;
    color: white;
    border: none;
    position: absolute;
    top: 90%;
    left: 40%;
    transform: translate(-35%, -10%);
  }

  button:hover {
    background-color: #1c3a75; /* Color de fondo al pasar el mouse */
    border-radius: 5px;
  }
</style>
