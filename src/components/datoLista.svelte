<script>
  export let dato;
  export let datoTipo;
  export let position = 'static'; // Valor por defecto
  export let top = 'auto'; // Valor por defecto
</script>

<div class="container" style="position: {position}; top: {top};">
  <span>{dato}</span>
  <div class="divider"></div>
  <span>{datoTipo}</span>
</div>

<style>
  .container {
    color: black;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .divider {
    width: 75%;
    border: solid 1px white;
    margin-top: 10px;
    position: relative;
  }
</style>
