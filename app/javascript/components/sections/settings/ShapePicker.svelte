<script>
  import { setSectionKey } from "../../../shared/key"

  import Dropdown from "../../shared/Dropdown.svelte"
  import Range from "../../shared/Range.svelte"
  import Switch from "../../shared/Switch.svelte"

  import Slant from "../shapes/Slant.svelte"
  import Layered from "../shapes/Layered.svelte"
  import Wavy from "../shapes/Wavy.svelte"
  import Wavy2 from "../shapes/Wavy2.svelte"
  import Wavy3 from "../shapes/Wavy3.svelte"
  import Wavy4 from "../shapes/Wavy4.svelte"
  import WavyLayered from "../shapes/WavyLayered.svelte"
  import WavyLayered2 from "../shapes/WavyLayered2.svelte"
  import WavyLayered3 from "../shapes/WavyLayered3.svelte"
  import Blocky from "../shapes/Blocky.svelte"
  import Blocky2 from "../shapes/Blocky2.svelte"
  import Blocky3 from "../shapes/Blocky3.svelte"
  import Round from "../shapes/Round.svelte"
  import RoundInverse from "../shapes/RoundInverse.svelte"
  import Straight from "../shapes/Straight.svelte"
  import Gradient from "../shapes/Gradient.svelte"

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

  export let section
  export let key
  export let flipped = false
  
  $: type = section.properties[key] || ""

  function setKey(value) {
    setSectionKey(section, key, value)
  }
</script>



<Dropdown direction="up">
  <div class="select-group mb-1/8" slot="label">
    <div class="form-label"><slot></slot></div>

    <div
      class="clickable-label label"
      class:label--reverse={ section.properties[`${ key }_reverse`] }
      class:label--flipped={ flipped }>
      { #if type }
        <svelte:component this={ components.filter(i => i.identifier == type)[0].component } />
      { :else }
        None
      { /if }
    </div>
  </div>

  <Range
    { section }
    key="{ key }_size"
    min=50 max=500 step=10 defaultValue=100>
    Size
  </Range>

  <Switch
    { section }
    key="{ key }_subtractive">
    Subtractive
  </Switch>

  <Switch
    { section }
    key="{ key }_reverse">
    Reverse
  </Switch>

  <div>
    <div 
      class="item"
      class:item--active={ !type }
      on:click={ () => setKey("") }>

      None
    </div>

    { #each components as component }
      <div
        class="item"
        class:item--active={ type == component.identifier }
        class:item--reverse={ section.properties[`${ key }_reverse`] }
        class:item--flipped={ flipped }
        on:click={ () => setKey(component.identifier) }>

        <svelte:component this={ component.component } />
      </div>
    { /each }
  </div>
</Dropdown>



<style lang="scss">
  .form-label {
    color: var(--text-color);
  }

  .label,
  .item {
    :global(svg) {
      width: 100%;
      height: 40px;
      background: var(--text-color-dark);
      transform: scale(var(--scale-x, 1), var(--scale-y, 1))

      :global(path),
      :global(rect:not([fill*=gradient])) {
        fill: var(--bg-dark);
        color: var(--bg-dark);
      }
    }

    &--reverse {
      :global(svg) {
        --scale-x: -1
      }
    }

    &--flipped {
      :global(svg) {
        --scale-y: -1
      }
    }
  }

  .item {
    cursor: pointer;
    padding: .5rem;
    margin-bottom: .25rem;
    border: 2px solid var(--text-color-dark);

    :global(svg) {
      :global(path),
      :global(rect:not([fill*=gradient])) {
        fill: var(--border-color);
        color: var(--border-color);
      }
    }

    &:hover,
    &:active,
    &--active {
      border-color: var(--text-color);
      color: var(--text-color-light);

      :global(svg) {
        background: var(--text-color);
      }
    }
  }
</style>
