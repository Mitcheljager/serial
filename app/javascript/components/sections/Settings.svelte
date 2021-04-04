<script>
  import { page, currentSectionId, hoveringElement } from "../../stores/data.js"
  
  import Heading from "./settings/Heading.svelte"
  import Columns from "./settings/Columns.svelte"
  import Button from "../shared/Button.svelte"

  const components = [
    { component: Heading, identifier: "heading" },
    { component: Columns, identifier: "columns" }
  ]

  $: sectionIndex = $page.sections.findIndex(section => section.id == $currentSectionId)
</script>

<h3>Section</h3>

<div class="section">
  <div class="section__header">
    <h4>Background</h4>
  </div>

  <div class="section__content">
    <div class="button-group">
      <Button { sectionIndex } key="background_color" value="">None</Button>
      <Button { sectionIndex } key="background_color" value="red">Red</Button>
      <Button { sectionIndex } key="background_color" value="blue">Blue</Button>
    </div>
  </div>
</div>

<h3>Elements</h3>

{ #each $page.sections[sectionIndex].elements as element, index }
  <div class="section" class:active={ $hoveringElement == element.id } on:mouseenter={ () => $hoveringElement = element.id } on:mouseleave={ () => $hoveringElement = null }>
    <div class="section__header">
      <h4>{ element.type }</h4>
    </div>

    <div class="section__content">
      <svelte:component this={ components.filter(i => i.identifier == element.type)[0].component } { element } { sectionIndex } { index } />
    </div>
  </div>
{ /each }

<style lang="scss">
  .section {
    margin-bottom: 1.5rem;
    border-radius: .5rem;
    background: var(--content-bg);
    overflow: hidden;

    &.active {
      box-shadow: 0 0 0 2px var(--primary);
    }
  }

  .section__header {
    padding: .5rem 1rem;
    background: var(--bg-dark);

    h4 {
      text-transform: capitalize;
      margin: 0;
    }
  }

  .section__content {
    padding: 1rem 1rem 0;
  }
</style>
