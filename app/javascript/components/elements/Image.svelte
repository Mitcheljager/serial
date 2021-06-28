<script>
  import EditableImage from "@components/shared/EditableImage.svelte"

  export let element

  $: size = element.properties.size || 1
</script>



<div class="image" style="--size: { size };">
  <EditableImage { element } key="image" width="1200" height="900" />
</div>



<style lang="scss">
  .image {
    display: flex;
    justify-content: center;

    :global(svg),
    :global(img) {
      width: calc((600px + (var(--max-width-modifier) * 150px)) * var(--size));
      max-width: 100%;
    }
  }
</style>
