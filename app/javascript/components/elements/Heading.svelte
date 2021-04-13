<script>
  import EditableText from "../shared/EditableText.svelte"

  export let element

  $: size = element.properties.size || 3
</script>

<h2 style="--size: { 1 + (size * .5) }rem">
  <EditableText { element } key="content" defaultValue="Heading" />
</h2>

<style>
  h2 {
    --size: 2.5rem;
    margin: 0;
    padding: 0;
    font-size: clamp(calc(var(--size) / 1.5), 5vw, var(--size));
  }
</style>
