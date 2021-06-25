<script>
  export let element

  $: size = element.properties.size || 1
</script>



<div style="--size: { size }"></div>



<style>
  div {
    height: calc(1px + (var(--margin) * .5 * var(--size)));
  }
</style>
