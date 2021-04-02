<script>
  import { page, currentSectionId } from "../../stores/data.js"
  
  import Heading from "./settings/Heading.svelte"
  import Columns from "./settings/Columns.svelte"

  const components = [
    { component: Heading, identifier: "heading" },
    { component: Columns, identifier: "columns" }
  ]

  $: sectionIndex = $page.sections.findIndex(section => section.id == $currentSectionId)

  function setBackgroundColor(color) {
    $page.sections[sectionIndex].backgroundColor = color
  }
</script>

<h4>Background</h4>

<div>
  <button on:click={ () => setBackgroundColor("red") }>Red</button>
  <button on:click={ () => setBackgroundColor("blue") }>Blue</button>
</div>

<h3>Sections</h3>

{ #each $page.sections[sectionIndex].elements as element, index }
  <div class="section">
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
    border: 2px solid var(--content-bg);
    border-radius: .5rem;
    overflow: hidden;
  }

  .section__header {
    padding: .5rem 1rem;
    background: var(--content-bg);

    h4 {
      text-transform: capitalize;
      margin: 0;
    }
  }

  .section__content {
    padding: 1rem;
  }
</style>
