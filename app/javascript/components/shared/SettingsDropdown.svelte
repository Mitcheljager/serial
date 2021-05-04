<script>
  import { onMount, onDestroy } from "svelte"
  import { fly } from "svelte/transition"

  let active = false
  let element

  onMount(() => document.addEventListener("click", clickOutside))
  onDestroy(() => document.removeEventListener("click", clickOutside))

  function clickOutside(event) {
    if (event.target.closest(".dropdown") == element) return

    active = false
  }
</script>



<div class="dropdown mt-1/8" bind:this={ element }>
  <div class="dropdown__label form-input" on:click={ () => active = !active }>
    <slot name="label"></slot>
  </div>

  { #if active }
    <div class="dropdown__content" in:fly={{ y: 10, duration: 150 }}>
     <slot></slot>
    </div>
  { /if }
</div>



<style lang="scss">
  .dropdown {
    position: relative;
  }

  .dropdown__label {
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover,
    &:active {
      filter: brightness(1.15);
    }
  }

  .dropdown__content {
    position: absolute;
    top: 3rem;
    left: 0;
    padding: .75rem;
    width: 100%;
    max-width: 300px;
    background: var(--border-color);
    box-shadow: 0 0 0 2px var(--body-bg);
    z-index: 10;
    border-radius: .5rem;
  }
</style>
