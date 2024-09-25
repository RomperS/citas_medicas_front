<script>
  import { createEventDispatcher } from 'svelte';
  
  export let text = "Click me";
  export let position = "static";
  export let top = "auto";
  export let left = "auto";
  export let height = "50px";
  export let width = "150px";

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }
</script>

<button 
  style="
      position: {position};
      top: {top};
      left: {left};
      height: {height};
      width: {width};
  "
  on:click={handleClick}
>
  {text}
</button>

<style>
button {
  border: solid #062666 2px;
  background-color: #031d52;
  color: white;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1c3a75;
}
</style>
