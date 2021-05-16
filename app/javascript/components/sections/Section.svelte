<script>
  import Shape from "./_Shape.svelte"

  import { flip } from "svelte/animate"

  import { page, currentSectionIndex, currentTab } from "../../stores/data.js"
  import { theme } from "../../stores/theme.js"

  import Element from "../elements/_Base.svelte"

  export let section
  export let index

  $: backgroundColor = section.properties?.background_color || "initial"
</script>



<div
  class="section"
  class:text-primary-color-offset={ backgroundColor == "var(--primary-color)" }
  class:text-secondary-color-offset={ backgroundColor == "var(--secondary-color)" }
  style="
  --background-color: { backgroundColor };
  --spacing: { section.properties?.spacing || 0 }"
  on:click={ () => { $currentTab = "section"; $currentSectionIndex = index } }>

  { #if $theme["navigation"] == "floating" && index == 0 }
    <div class="navigation-offset"></div>
  { /if }

  <Shape position="top" { section } { index } />

  <div class="wrapper">
    { #each $page.sections[index].elements || {} as element (element.uuid) }
      <div animate:flip="{{ duration: 200 }}">
        <Element { element } />
      </div>
    { /each }
  </div>

  <Shape position="bottom" { section } { index } />
</div>



<style lang="scss">
  .section {
    position: relative;
    min-height: 100px;
    background-color: var(--background-color);
    overflow: hidden;
  }

  .wrapper {
    position: relative;
    padding: calc(1px + (var(--margin) * .5 * var(--spacing))) 1.5rem;
    z-index: 1;
  }

  .navigation-offset {
    // Calculation of the navigation height, based on the font size, padding, and margin
    height: calc(((.5rem + (.4rem * var(--margin-multiplier))) * 2) + (var(--font-size-body) * 1.35));
  }
</style>
