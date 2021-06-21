<script>
  import EditableText from "../shared/EditableText.svelte"
  import EditableButton from "../shared/EditableButton.svelte"
  import EditableImage from "../shared/EditableImage.svelte"

  export let element

  $: enableBackground = element.properties.enable_background || false
  $: enableButtons = element.properties.enable_buttons || false
  $: enableImages = element.properties.enable_images || false
  $: columnCount = { length: element.properties.column_count || 3 }
  $: columnSize = element.properties.column_size || 250
  $: columnGap = element.properties.column_gap == undefined ? 2 : element.properties.column_gap
</script>



<div class="columns" class:with-background={ enableBackground } style="--column-size: { columnSize }px; --column-gap: { columnGap * 0.5 }rem">
  { #each columnCount as _, i }
    <div class="column">
      { #if enableImages }
        <EditableImage { element } key="image_{ i }" width="400" height="300" />
      { /if }

      <h3><EditableText { element } key="title_{ i }" defaultValue="Title" /></h3>
      <EditableText { element } key="content_{ i }" defaultValue="Column content" />

      { #if enableButtons }
        <div class="pt-1/2 mt-auto w-100">
          <EditableButton { element } key="button_{ i }" />
        </div>
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .columns.with-background & {
      padding: clamp(1rem, calc(1vw * var(--margin-multiplier)), calc(var(--margin-multiplier) * .5rem));
      background: var(--palette-content);
      border-radius: var(--border-radius);
      color: var(--palette-font);
      box-shadow: var(--shadow-type);
    }

    :global([data-editable-image]) {
      text-align: center;
    }

    :global(h3) {
      margin-top: calc(var(--margin) / 2);

      &:first-child {
        margin-top: 0;
      }
    }
  }

  h3 {
    margin-bottom: calc(var(--margin) / 2 - .15rem);

    .columns.with-background & {
      color: var(--palette-font-heading);
    }
  }
</style>
