<script>
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"

  import { currentEditable } from "@stores/data"

  let element
  let width = 0

  onMount(getWidth)

  function getWidth() {
    const container = document.querySelector("[data-role='theme-container']")
    width = container.offsetWidth
  }
  
  function clickOutside(event) {
    if (event.target.closest(".floating-settings")) return

    if ($currentEditable?.type == "button" && !event.target.closest("[data-editable-button]")) $currentEditable = null
    if ($currentEditable?.type == "text" && !event.target.closest("[contenteditable]")) $currentEditable = null
    if ($currentEditable?.type == "image" && !event.target.closest("[data-editable-image]")) $currentEditable = null
  }
</script>



<svelte:body on:click={ clickOutside } />

<div
  bind:this={ element }
  class="floating-settings"
  style="--width: { width }px"
  transition:fly={{ y: 100, duration: 150 }}>

  <slot></slot>
</div>



<style lang="scss">
  .floating-settings {
    position: fixed;
    bottom: 1.5rem;
    margin-left: 1.5rem;
    display: flex;
    width: 100%;
    min-height: 4rem;
    max-width: calc(var(--width) - 3rem);
    z-index: 100;

    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 4rem;
      bottom: 1rem;
      height: 10px;
      width: calc(100% - 8rem);
      border-radius: 2rem;
      z-index: -1;
      opacity: .5;
      background: black;
      box-shadow: 0 0 2rem 2rem black;
    }
  }
</style>
