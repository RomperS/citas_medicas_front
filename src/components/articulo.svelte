<script>
  export let id = "";
  export let width = "100px";
  export let height = "100px";
  export let position = "absolute";
  export let top = "0px";
  export let left = "0px";
  export let transform = "none";
</script>

<article
  {id}
  style="width: {width}; height: {height}; position: {position}; top: {top}; left: {left}; transform: {transform};"
>
  <slot>

  </slot>
</article>

<style>
  article {
    background-color: rgb(6, 89, 131, 0.57);
    border: 1px solid black;
    border-radius: 30px;
  }
</style>
