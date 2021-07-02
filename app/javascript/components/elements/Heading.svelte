<script>
  import EditableText from "@components/shared/EditableText.svelte"

  export let element

  $: size = element.properties.size || 3
  $: alignment = element.properties.alignment || "left"
  $: color = element.properties.color || ""
</script>



<h2 style="
  --size: { 1 + (size * .5) }rem;
  --alignment: { alignment };"
  class={ "color-" + color  }>

  <EditableText { element } key="content" defaultValue="Heading" />
</h2>



<style lang="scss">
  h2 {
    margin: 0;
    padding: 0;
    font-size: clamp(calc(var(--size) / 1.5), 5vw, var(--size));
    text-align: var(--alignment);
    color: var(--color, var(--palette-font-heading));
  }

  $colors: (
    primary: var(--primary-color),
    secondary: var(--secondary-color),
    palette-font: var(--palette-font)
  );

  @each $color, $value in $colors {
    .color-#{ $color } {
      color: $value;
    }
  }

  .color-gradient {
    :global(span) {
      background-image: var(--gradient);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
