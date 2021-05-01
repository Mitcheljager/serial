<script>
  import EditableText from "../shared/EditableText.svelte"
  import EditableButton from "../shared/EditableButton.svelte"

  export let element

  $: enableBackground = element.properties.enable_background || false
  $: enableButtons = element.properties.enable_buttons || false
  $: columnCount = { length: element.properties.column_count || 3 }
  $: columnSize = element.properties.column_size || 250
  $: columnGap = element.properties.column_gap || 2
</script>



<div class="columns" class:with-background={ enableBackground } style="--column-size: { columnSize }px; --column-gap: { columnGap * 0.5 }rem">
  { #each columnCount as _, i }
    <div class="column">
      <h3><EditableText { element } key="title_{ i }" defaultValue="Title" /></h3>

      <div class="mb-1/2">
        <EditableText { element } key="content_{ i }" defaultValue="Column content" />
      </div>

      { #if enableButtons }
        <EditableButton { element } key="button_{ i }" />
      { /if }
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
    .columns.with-background & {
      padding: clamp(1rem, calc(1vw * var(--margin-multiplier)), calc(var(--margin-multiplier) * .5rem));
      background: var(--palette-dark);
      border-radius: var(--border-radius);
      color: var(--palette-font);
    }
  }

  h3 {
    margin: 0 0 .75rem;

    .columns.with-background & {
      color: var(--palette-font-light);
    }
  }
</style>
