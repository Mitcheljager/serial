<script>
  import Slant from "./shapes/Slant.svelte"
  import Layered from "./shapes/Layered.svelte"
  import Wavy from "./shapes/Wavy.svelte"

  export let position
  export let section
  export let index

  const components = [
    { component: Slant, identifier: "slant" },
    { component: Layered, identifier: "layered" },
    { component: Wavy, identifier: "wavy" }
  ]

  $: type = section.properties?.[`shape_${ position }`]
  $: subtractive = section.properties?.[`shape_${ position }_subtractive`]
  $: size = section.properties?.[`shape_${ position }_size`] || 100
</script>



{ #if type }
  <div
    class="shape { `shape--${ position }` }"
    class:shape--absolute={ subtractive }
    style="--size: { size }px">

    <svelte:component this={ components.filter(i => i.identifier == type)[0].component } { position } />
  </div>
{ /if }



<style lang="scss">
  .shape {
    &--absolute {
      position: absolute;
      width: 100%;
      top: 0;

      &.shape--bottom {
        top: auto;
        bottom: 0;
      }
    }

    :global(svg) {
      height: var(--size);
      width: calc(100% + 1px);
      margin-left: -1px;
    }
  }
</style>
