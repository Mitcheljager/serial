<script>
  import { fly } from "svelte/transition"

  export let direction = "down"
  export let closeOnClick = false

  let active = false
  let element
  let contentElement
  let alignRight = false

  $: if (active) setTimeout(() => { position() })

  function clickOutside(event) {
    if (!active) return
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



<svelte:body on:click={ clickOutside } />

<div bind:this={ element } class="dropdown" class:active>
  <div on:click={ () => active = !active }>
    <slot name="label">Label</slot>
  </div>

  { #if active }
    <div
      bind:this={ contentElement }
      in:fly={{ y: 10, duration: 150 }}
      on:click={ () => { if (closeOnClick) active = false } }
      class="dropdown__content"
      class:dropdown__content--up={ direction == "up" }
      class:dropdown__content--align-right={ alignRight }>

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
    max-height: 350px;
    transform: translateY(100%);
    background: var(--border-color);
    box-shadow: var(--shadow-medium);
    z-index: 100;
    border-radius: .5rem;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--text-color-dark) rgba(0, 0, 0, .25);

    &--align-right {
      left: auto;
      right: 0;
    }

    &--up {
      bottom: auto;
      top: -.5rem;
      transform: translateY(-100%);
    }
  }
</style>
