<script>
  import { shapes } from "@shared/shapes"

  export let position
  export let section  

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
      transform: scale({ reverse ? -1 : 1 }, { position == "top" ? 1 : -1 }) translateY({ position == "top" ? 0 : -1 }px)">

    <svelte:component this={ shapes.filter(i => i.identifier == type)[0].component } />
  </div>
{ /if }



<style lang="scss">
  .shape {
    display: flex;
    justify-content: center;
    box-shadow: inset 0 2px 0 var(--palette-body);

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
      height: clamp(calc(var(--size) / 4 * 1px), calc(var(--size) * .065vw), calc(var(--size) * 1px));
      width: calc(100% + 2px);
      min-width: 600px;
      margin-left: -1px;
    }
  }
</style>
