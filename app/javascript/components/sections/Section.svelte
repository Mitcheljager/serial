<script>
  export let section

  import Paragraph from "./elements/Paragraph.svelte"
  import Heading from "./elements/Heading.svelte"
  import Columns from "./elements/Columns.svelte"

  const components = [
    { component: Paragraph, identifier: "paragraph" },
    { component: Heading, identifier: "heading" },
    { component: Columns, identifier: "columns" }
  ]
</script>

<div style="background-color: { section.backgroundColor }">
  { #each section.elements as element }
    <div class="wrapper">
      <svelte:component this={ components.filter(i =>  i.identifier == element.type)[0].component } { element } />
    </div>
  { /each }
</div>
