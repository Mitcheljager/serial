<script>
  import { theme } from "../../stores/theme"
  import { palettes } from "../../stores/palettes"
  import { settings } from "../../stores/user"

  import Dropdown from "./Dropdown.svelte"

  $: currentPalette = $theme.palette || $palettes[0]

  function setPalette(palette) {
    $theme.palette = palette
  }
</script>



<span class="form-label">Palette</span>

{ #if $settings.show_help_text }
  <p class="help mt-0">
    The overall colors of the backgrounds, fonts, and other elements.
  </p>
{ /if }

<Dropdown>
  <div class="clickable-label label mt-1/8" slot="label">
    <div class="colors">
      { #each Object.entries(currentPalette.colors) as [name, value] }
        <div class="colors__circle" style="--color: { value }"></div>
      { /each }
    </div>

    <div class="label__name">{ currentPalette.name }</div>
  </div>

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
</Dropdown>



<style lang="scss">
  .label {
    display: flex;
    align-items: center;
  }

  .label__name,
  .palette__name {
    margin-left: .75rem;
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
