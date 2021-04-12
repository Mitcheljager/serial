<script>
  export let section
  export let index

  import { flip } from "svelte/animate"

  import { page, hoveringElement, currentSectionIndex, currentTab } from "../../stores/data.js"

  import Paragraph from "./elements/Paragraph.svelte"
  import Heading from "./elements/Heading.svelte"
  import Columns from "./elements/Columns.svelte"

  const components = [
    { component: Paragraph, identifier: "paragraph" },
    { component: Heading, identifier: "heading" },
    { component: Columns, identifier: "columns" }
  ]
</script>



<div class="section" style="
  --background-color: { section.properties?.background_color || "initial" };
  --spacing: { section.properties?.spacing || 0 } ">

  <div class="wrapper">
    { #each $page.sections[index].elements || [] as element (element.id) }
      <div
        class="element"
        class:active={ $hoveringElement == element.id }
        on:click={ () => { $currentTab = "section"; $currentSectionIndex = index } }
        on:mouseenter={ () => $hoveringElement = element.id }
        on:mouseleave={ () => $hoveringElement = null }
        animate:flip="{{ duration: 200 }}">

        <svelte:component this={ components.filter(i =>  i.identifier == element.type)[0].component } { element } />
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

  .element {
    position: relative;
    margin: var(--margin) 0;
  }

  .active::after {
    content: "";
    display: block;
    position: absolute;
    top: -1rem;
    left: -1rem;
    width: calc(100% + 2rem);
    height: calc(100% + 2rem);
    box-shadow: inset 0 0 0 2px var(--primary);
    border-radius: .5rem;
    pointer-events: none;
    z-index: 10;
  }
</style>
