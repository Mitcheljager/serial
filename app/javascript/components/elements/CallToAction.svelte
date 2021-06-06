<script>
  import EditableText from "../shared/EditableText.svelte"
  import EditableButton from "../shared/EditableButton.svelte"
  import EditableImage from "../shared/EditableImage.svelte"

  export let element

  $: buttonsCount = element.properties.buttons_count || 2
</script>



<div class="columns">
  <div>
    <h2>
      <EditableText { element } key="content" defaultValue="Large heading that tries to get attention" />
    </h2>

    <big>
      <EditableText { element } key="content" defaultValue="A little bit of content to further entice a click." />
    </big>

    { #if buttonsCount }
      <div class="buttons">
        { #each { length: buttonsCount } as _, i }
          <EditableButton { element } key="button_{ i }" />
        { /each }
      </div>
    { /if }
  </div>

  <div class="image">
    <EditableImage { element } key="image" width="600" height="400" />
  </div>
</div>



<style lang="scss">
  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: var(--margin);
    align-items: center;
  }

  h2 {
    margin: 0 0 var(--margin);
  }

  .image {
    :global([data-editable-image] img) {
      border-radius: var(--border-radius);
      overflow: hidden;
    }
  }

  .buttons {
    margin-top: calc(var(--margin) - 1rem);

    :global(a) {
      margin: 1rem 1rem 0 0;
    }
  }
</style>
