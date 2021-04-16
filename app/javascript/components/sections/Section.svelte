<script>
  import { flip } from "svelte/animate"

  import { page } from "../../stores/data.js"

  import Element from "../elements/_Base.svelte"

  export let section
  export let index
</script>



<div class="section" style="
  --background-color: { section.properties?.background_color || "initial" };
  --spacing: { section.properties?.spacing || 0 } ">

  <div class="wrapper">
    { #each $page.sections[index].elements || {} as element (element.uuid) }
      <div animate:flip="{{ duration: 200 }}">
        <Element { element } sectionIndex={ index } />
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
