<script>
  import { hoveringElement, currentElement } from "@stores/data.js"
  import { editMode } from "@stores/user.js"

  import Heading from "./Heading.svelte"
  import Paragraph from "./Paragraph.svelte"
  import Columns from "./Columns.svelte"
  import Offset from "./Offset.svelte"
  import CallToAction from "./CallToAction.svelte"
  import Image from "./Image.svelte"
  import Sponsors from "./Sponsors.svelte"
  import CustomHTML from "./CustomHTML.svelte"
  import Buttons from "./Buttons.svelte"

  export let element

  const components = [
    { component: Heading, identifier: "heading" },
    { component: Paragraph, identifier: "paragraph" },
    { component: Columns, identifier: "columns" },
    { component: Offset, identifier: "offset" },
    { component: CallToAction, identifier: "call_to_action" },
    { component: Image, identifier: "image" },
    { component: Sponsors, identifier: "sponsors" },
    { component: CustomHTML, identifier: "custom_html" },
    { component: Buttons, identifier: "buttons" }
  ]
</script>



<div class="wrapper" class:full-width={ element.properties.full_width }>
  <div
    class="element"
    class:element--hovering={ $hoveringElement == element.uuid }
    on:mouseenter={ () => { if ($editMode) $hoveringElement = element.uuid } }
    on:mouseleave={ () => { if ($editMode) $hoveringElement = null } }
    on:click={ () => $currentElement = element.uuid }>

    <svelte:component this={ components.filter(i => i.identifier == element.content_type)[0].component } { element } />
  </div>
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

  .full-width {
    max-width: 100%;
  }
</style>
