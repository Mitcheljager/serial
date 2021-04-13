<script>
  import { fade } from "svelte/transition"

  let active = false
</script>

<div class="dropdown">
  <div class="dropdown__action" on:click={ () => active = !active }>
    <slot name="label"></slot>
  </div>

  { #if active }
    <div class="dropdown__content" transition:fade={{ duration: 100 }}>
      <slot></slot>
    </div>
  { /if }
</div>

<style lang="scss">
  .dropdown {
    position: relative;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    z-index: 10;
  }

  .dropdown__action {
    position: relative;
    padding: .25rem .75rem;
    border: 2px solid var(--border-color);
    border-radius: 1rem;
    z-index: 1;

    &:hover,
    &:active {
      color: white;
    }
  }

  .dropdown__content {
    position: absolute;
    top: 0;
    left: 0;
    height: auto;
    max-height: 500px;
    width: 250px;
    padding-top: 1.5rem;
    border: 2px solid var(--border-color);
    border-radius: 1rem;
    background: var(--body-bg);
    box-shadow: 0 3px 6px #00000050;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
