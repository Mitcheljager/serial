<script>
  import { page } from "../../../stores/data.js"

  import EditableText from "./EditableText.svelte"

  export let element

  $: columnCount = { length: element.properties.column_count || 3 }
  $: columnSize = element.properties.column_size || 250
  $: columnGap = element.properties.column_gap !== undefined ? element.properties.column_gap : 2
</script>

<div class="columns" style="--column-size: { columnSize }px; --column-gap: { columnGap * 0.5 }rem">
  { #each columnCount as _, i }
    <div class="column">
      <h3><EditableText { element } key="title_{ i }" defaultValue="Title" /></h3>

      <EditableText { element } key="content_{ i }" defaultValue="Column content" />
    </div>
  { /each }
</div>

<style lang="scss">
  .columns {
    --column-size: 250px;
    --column-gap: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--column-size), 1fr));
    grid-gap: var(--column-gap);
  }

  .column {
    padding: 1rem;
    background: var(--bg-dark);
  }

  h3 {
    margin: 0 0 1rem;
  }
</style>
