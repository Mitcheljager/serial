<script>
  import { onMount, onDestroy } from "svelte"
  import { fly } from "svelte/transition"

  let active = false
  let element
  let contentElement
  let alignRight = false

  $: if (active) setTimeout(() => { position() })

  onMount(() => document.addEventListener("click", clickOutside))
  onDestroy(() => document.removeEventListener("click", clickOutside))

  function clickOutside(event) {
    if (event.target.closest(".dropdown") == element) return

    active = false
  }

  function position() {
    const offsetLeft = element.getBoundingClientRect().left
    const elementWidth = contentElement.offsetWidth
    const windowWidth = window.innerWidth

    alignRight = false
    if (offsetLeft + elementWidth > windowWidth) alignRight = true
  }
</script>



<div bind:this={ element } class="dropdown">
  <div on:click={ () => active = !active }>
    <slot name="label"></slot>
  </div>

  { #if active }
    <div
      bind:this={ contentElement }
      class="dropdown__content"
      class:dropdown__content--align-right={ alignRight }
      in:fly={{ y: 10, duration: 150 }}>

     <slot></slot>
    </div>
  { /if }
</div>



<style lang="scss">
  .dropdown {
    position: relative;
  }

  .dropdown__content {
    position: absolute;
    bottom: -.5rem;
    left: 0;
    padding: .75rem;
    width: 100%;
    min-width: 200px;
    max-width: 300px;
    max-height: 450px;
    transform: translateY(100%);
    background: var(--border-color);
    box-shadow: var(--shadow-medium);
    z-index: 100;
    border-radius: .5rem;
    overflow-y: auto;

    &--align-right {
      left: auto;
      right: 0;
    }
  }
</style>
