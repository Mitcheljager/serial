<script>
  import EditableButton from "@components/shared/EditableButton.svelte"

  export let element

  $: buttonCount = { length: element.properties.button_count || 2 }
  $: alignment = element.properties.alignment || "left"
</script>



<div
  class="buttons"
  class:buttons--center={ alignment == "center" }>

  { #each buttonCount as _, i }
    <EditableButton { element } key="button_{ i }" />
  { /each }
</div>



<style lang="scss">
  .buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &--center {
      justify-content: center;
    }

    :global(.button) {
      margin: .25rem .75rem;
    }
  }
</style>
