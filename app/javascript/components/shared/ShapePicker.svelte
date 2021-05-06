<script>
  import { getSectionKey, setSectionKey } from "../../shared/key"
  import { page, currentSectionIndex } from "../../stores/data.js"

  import SettingsDropdown from "./SettingsDropdown.svelte"
  import Range from "./Range.svelte"
  import Switch from "./Switch.svelte"

  import Slant from "../sections/shapes/Slant.svelte"
  import Layered from "../sections/shapes/Layered.svelte"
  import StraightLayered from "../sections/shapes/StraightLayered.svelte"
  import Wavy from "../sections/shapes/Wavy.svelte"
  import Wavy2 from "../sections/shapes/Wavy2.svelte"
  import Wavy3 from "../sections/shapes/Wavy3.svelte"

  const components = [
    { component: StraightLayered, identifier: "straight_layered" },
    { component: Slant, identifier: "slant" },
    { component: Layered, identifier: "layered" },
    { component: Wavy, identifier: "wavy" },
    { component: Wavy2, identifier: "wavy_2" },
    { component: Wavy3, identifier: "wavy_3" }
  ]

  export let key
  export let flipped = false
  
  $: type = getSectionKey($currentSectionIndex, key, $page) || ""

  function setKey(value) {
    setSectionKey($currentSectionIndex, key, value)
  }
</script>



<SettingsDropdown>
  <div class="group" slot="label">
    <div class="form-label"><slot></slot></div>

    <div
      class="clickable-label label"
      class:label--reverse={ getSectionKey($currentSectionIndex, `${ key }_reverse`, $page) }
      class:item--flipped={ flipped }>
      { #if type }
        <svelte:component this={ components.filter(i => i.identifier == type)[0].component } />
      { :else }
        None
      { /if }
    </div>
  </div>

  <Range
    key="{ key }_size"
    min=50 max=300 step=10 defaultValue=100>
    Size
  </Range>

  <Switch
    type="section"
    key="{ key }_subtractive">
    Subtractive
  </Switch>

  <Switch
    type="section"
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
        class:item--reverse={ getSectionKey($currentSectionIndex, `${ key }_reverse`, $page) }
        class:item--flipped={ flipped }
        on:click={ () => setKey(component.identifier) }>

        <svelte:component this={ component.component } />
      </div>
    { /each }
  </div>
</SettingsDropdown>



<style lang="scss">
  .group {
    display: flex;
    align-items: center;
  }

  .form-label {
    width: 7.5rem;
    margin-right: .75rem;
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
      :global(rect) {
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
      :global(rect) {
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
