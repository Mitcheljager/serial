<script>
  import { onMount, onDestroy } from "svelte"
  import { fly } from "svelte/transition"

  import { theme } from "../../stores/theme.js"
  import { palettes } from "../../stores/palettes.js"

  let active = false
  
  $: currentPalette = $theme.palette || $palettes[0]

  onMount(() => document.addEventListener("click", clickOutside))
  onDestroy(() => document.removeEventListener("click", clickOutside))

  function setPalette(palette) {
    $theme.palette = palette
  }

  function clickOutside(event) {
    if (event.target.closest(".palette")) return

    active = false
  }
</script>



<span class="form-label">Palette</span>

<p class="help mt-0">
  The overall colors of the backgrounds, fonts, and other elements.
</p>

<div class="palette mt-1/8">
  <div class="palette__label form-input" on:click={ () => active = !active }>
    <div class="colors">
      { #each Object.entries(currentPalette.colors) as [name, value] }
        <div class="colors__circle" style="--color: { value }"></div>
      { /each }
    </div>

    <div class="palette__name">{ currentPalette.name }</div>
  </div>

  { #if active }
    <div class="palette__content" in:fly={{ y: 10, duration: 150 }}>
      { #each $palettes as palette }
        <div class="palette__item" class:palette__item--active={ palette == currentPalette }>
          <div class="colors" on:click={ () => setPalette(palette) }>
            { #each Object.entries(palette.colors) as [name, value] }
              <div class="colors__circle" style="--color: { value }"></div>
            { /each }

            <div class="palette__name">{ palette.name }</div>
          </div>
        </div>
      { /each }
    </div>
  { /if }
</div>



<style lang="scss">
  .palette {
    position: relative;
  }

  .palette__label {
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover,
    &:active {
      filter: brightness(1.15);
    }
  }

  .palette__name {
    margin-left: .75rem;
  }

  .palette__content {
    position: absolute;
    top: 3rem;
    left: 0;
    padding: .75rem;
    width: 100%;
    max-width: 300px;
    background: var(--border-color);
    z-index: 10;
    border-radius: .5rem;
  }

  .palette__item {
    margin: 0 -.75rem;
    padding: .25rem .75rem;
    cursor: pointer;

    &:hover,
    &:active,
    &--active {
      color: white;
    }
  }

  .colors {
    display: flex;
    margin-left: .5rem;
  }

  .colors__circle {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: -.5rem;
    background: var(--color);
    box-shadow: 0 0 0 4px var(--bg-dark);
    border-radius: 50%;

    @for $i from 1 to 7 {
      &:nth-child(#{ $i }) {
        z-index: #{ 7 - $i };
      }
    }

    .palette__item & {
      box-shadow: 0 0 0 4px var(--border-color);
    }
  }
</style>
