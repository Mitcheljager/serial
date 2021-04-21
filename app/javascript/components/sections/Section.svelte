<script>
  import { flip } from "svelte/animate"

  import { page, currentSectionIndex, currentTab } from "../../stores/data.js"

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

  <div class="wrapper">
    { #each $page.sections[index].elements || {} as element (element.uuid) }
      <div animate:flip="{{ duration: 200 }}">
        <Element { element } />
      </div>
    { /each }
  </div>
</div>



<style lang="scss">
  .section {
    padding: calc(1px + (var(--margin) * .5 * var(--spacing))) 0;
    min-height: 100px;
    background-color: var(--background-color);
  }
</style>
