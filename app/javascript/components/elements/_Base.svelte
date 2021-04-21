<script>
  import { hoveringElement, currentElement } from "../../stores/data.js"

  import Paragraph from "./Paragraph.svelte"
  import Heading from "./Heading.svelte"
  import Columns from "./Columns.svelte"

  export let element

  const components = [
    { component: Paragraph, identifier: "paragraph" },
    { component: Heading, identifier: "heading" },
    { component: Columns, identifier: "columns" }
  ]
</script>



<div
  class="element"
  class:element--hovering={ $hoveringElement == element.uuid }
  on:mouseenter={ () => $hoveringElement = element.uuid }
  on:mouseleave={ () => $hoveringElement = null }
  on:click={ () => $currentElement = element.uuid }>

  <svelte:component this={ components.filter(i => i.identifier == element.content_type)[0].component } { element } />
</div>



<style lang="scss">
  .element {
    position: relative;
    margin: var(--margin) 0;

    &--hovering::after {
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
  }
</style>
