<script>
  import Slant from "./shapes/Slant.svelte"
  import Layered from "./shapes/Layered.svelte"
  import Wavy from "./shapes/Wavy.svelte"
  import Wavy2 from "./shapes/Wavy2.svelte"
  import Wavy3 from "./shapes/Wavy3.svelte"
  import Wavy4 from "./shapes/Wavy4.svelte"
  import WavyLayered from "./shapes/WavyLayered.svelte"
  import WavyLayered2 from "./shapes/WavyLayered2.svelte"
  import WavyLayered3 from "./shapes/WavyLayered3.svelte"
  import Blocky from "./shapes/Blocky.svelte"
  import Blocky2 from "./shapes/Blocky2.svelte"
  import Blocky3 from "./shapes/Blocky3.svelte"
  import Round from "./shapes/Round.svelte"
  import RoundInverse from "./shapes/RoundInverse.svelte"
  import Straight from "./shapes/Straight.svelte"
  import Gradient from "./shapes/Gradient.svelte"

  export let position
  export let section

  const components = [
    { component: Slant, identifier: "slant" },
    { component: Layered, identifier: "layered" },
    { component: Wavy, identifier: "wavy" },
    { component: Wavy2, identifier: "wavy_2" },
    { component: Wavy3, identifier: "wavy_3" },
    { component: Wavy4, identifier: "wavy_4" },
    { component: WavyLayered, identifier: "wavy_layered" },
    { component: WavyLayered2, identifier: "wavy_layered_2" },
    { component: WavyLayered3, identifier: "wavy_layered_3" },
    { component: Blocky, identifier: "blocky" },
    { component: Blocky2, identifier: "blocky_2" },
    { component: Blocky3, identifier: "blocky_3" },
    { component: Round, identifier: "round" },
    { component: RoundInverse, identifier: "round_inverse" },
    { component: Straight, identifier: "straight" },
    { component: Gradient, identifier: "gradient" }
  ]

  $: type = section.properties?.[`shape_${ position }`]
  $: subtractive = section.properties?.[`shape_${ position }_subtractive`]
  $: size = section.properties?.[`shape_${ position }_size`] || 100
  $: reverse = section.properties?.[`shape_${ position }_reverse`]
</script>



{ #if type }
  <div
    class="shape { `shape--${ position }` }"
    class:shape--absolute={ subtractive }
    style="
      --size: { size };
      transform: scale({ reverse ? -1 : 1 }, { position == "top" ? 1 : -1 })">

    <svelte:component this={ components.filter(i => i.identifier == type)[0].component } />
  </div>
{ /if }



<style lang="scss">
  .shape {
    &--absolute {
      position: absolute;
      width: 100%;
      top: -2px;

      &.shape--bottom {
        top: auto;
        bottom: -2px;
      }
    }

    :global(svg) {
      display: block;
      height: clamp(calc(var(--size) / 4 * 1px), calc(var(--size) * .065vw), calc(var(--size) * 1px));
      width: calc(100% + 2px);
      margin-left: -1px;
    }
  }
</style>
