<script>
  export let src = '';
  export let size = '100px';
  export let background = 'transparent';
  export let opacityImg = '1';
  export let position = 'static';
  export let top = 'auto';        
  export let left = 'auto';       
  export let transform = 'none'; 
</script>


<style>
  .circle-container {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: var(--background);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: var(--position);
    top: var(--top);
    left: var(--left);
    transform: var(--transform);
  }

  .circle-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: var(--opacityImg);
  }
  
  .circle-container:hover {
    cursor: pointer;
  }
</style>

<div class="circle-container" style="--size: {size}; --background: {background}; --opacityImg: {opacityImg}; --position: {position}; --top: {top}; --left: {left}; --transform: {transform}">
  <img src={src} alt="Imagen Cirular" />
</div>
