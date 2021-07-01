<script>
  import EditableImage from "@components/shared/EditableImage.svelte"

  export let element

  $: sponsorsCount = { length: element.properties.count || 3 }
  $: size = ((element.properties.size || 1) * 50) + 100
</script>



<div class="sponsors">
  { #each sponsorsCount as _, i }
    <div class="sponsor" style="--size: { size }px">
      <EditableImage { element } key="image_{ i }" width={ size } height={ size / 2 } />
    </div>
  { /each }
</div>



<style lang="scss">
  .sponsors {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: -.75rem;
  }

  .sponsor {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: .75rem;
    flex: var(--size) 0 1;

    :global(img),
    :global(svg) {
      width: auto;
    }

    :global(.image-wrapper) {
      display: inline-block;
    }
  }
</style>
