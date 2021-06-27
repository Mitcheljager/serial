<script>
  import { theme } from "@stores/theme"

  import EditableImage from "@components/shared/EditableImage.svelte"

  export let element

  $: size = element.properties.size || 1
  $: width = (600 + (($theme.max_width || 2) * 150)) * size
  $: height = Math.ceil(width / 16 * 10)
</script>



<div class="image" style="--width: { width }px;">
  <EditableImage { element } key="image" width="1200" height="900" />
</div>



<style lang="scss">
  .image {
    display: flex;
    justify-content: center;

    :global(svg),
    :global(img) {
      width: var(--width);
      max-width: 100%;
    }
  }
</style>
