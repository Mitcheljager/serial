<script>
  import Slant from "./shapes/Slant.svelte"
  import Layered from "./shapes/Layered.svelte"
  import Wavy from "./shapes/Wavy.svelte"
  import Wavy2 from "./shapes/Wavy2.svelte"
  import Wavy3 from "./shapes/Wavy3.svelte"
  import Round from "./shapes/Round.svelte"
  import RoundInverse from "./shapes/RoundInverse.svelte"

  export let position
  export let section

  const components = [
    { component: Slant, identifier: "slant" },
    { component: Layered, identifier: "layered" },
    { component: Wavy, identifier: "wavy" },
    { component: Wavy2, identifier: "wavy_2" },
    { component: Wavy3, identifier: "wavy_3" },
    { component: Round, identifier: "round" },
    { component: RoundInverse, identifier: "round_inverse" },
  ]

  $: backgroundColor = section.properties?.background_color
  $: type = section.properties?.[`shape_${ position }`]
  $: subtractive = section.properties?.[`shape_${ position }_subtractive`]
  $: size = section.properties?.[`shape_${ position }_size`] || 100
  $: reverse = section.properties?.[`shape_${ position }_reverse`]
</script>



{ #if type && backgroundColor }
  <div
    class="shape { `shape--${ position }` }"
    class:shape--absolute={ subtractive }
    style="
      --size: { size }px;
      transform: scale({ reverse ? -1 : 1 }, { position == "top" ? 1 : -1 })">

    <svelte:component this={ components.filter(i => i.identifier == type)[0].component } />
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
      display: block;
      height: var(--size);
      width: calc(100% + 2px);
      margin-left: -1px;
    }
  }
</style>
