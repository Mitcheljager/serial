<script>
  export let section

  import { page, hoveringElement } from "../../stores/data.js"

  import Paragraph from "./elements/Paragraph.svelte"
  import Heading from "./elements/Heading.svelte"
  import Columns from "./elements/Columns.svelte"

  const components = [
    { component: Paragraph, identifier: "paragraph" },
    { component: Heading, identifier: "heading" },
    { component: Columns, identifier: "columns" }
  ]
</script>

<div class="section" style="background-color: { section.properties.background_color }; --spacing: { section.properties.spacing || 0 } ">
  <div class="wrapper">
    { #each $page.sections[0].elements as element }
      <div
        class="element"
        class:active={ $hoveringElement == element.id }
        on:mouseenter={ () => $hoveringElement = element.id }
        on:mouseleave={ () => $hoveringElement = null }>

        <svelte:component this={ components.filter(i =>  i.identifier == element.type)[0].component } { element } />
      </div>
    { /each }
  </div>
</div>

<style lang="scss">
  .section {
    padding: calc(1px + (var(--margin) * .5 * var(--spacing))) 0;  
  }

  .element {
    position: relative;
    margin: var(--margin) 0;
  }

  .active::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0 2px var(--primary);
    border-radius: .5rem;
    pointer-events: none;
    z-index: 10;
  }
</style>
