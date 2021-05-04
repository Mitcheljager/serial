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
  
  $: type = getSectionKey($currentSectionIndex, key, $page) || ""

  function setKey(value) {
    setSectionKey($currentSectionIndex, key, value)
  }
</script>



<div class="form-label mt-1/4"><slot></slot></div>

<SettingsDropdown>
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

  <div class="label" slot="label">
    { #if type }
      <svelte:component this={ components.filter(i => i.identifier == type)[0].component } />
    { :else }
      None
    { /if }
  </div>

  <div>
    <div class="item" class:item--active={ !type } on:click={ () => setKey("") }>
      None
    </div>

    { #each components as component }
      <div class="item" class:item--active={ type == component.identifier } on:click={ () => setKey(component.identifier) }>
        <svelte:component this={ component.component } />
      </div>
    { /each }
  </div>
</SettingsDropdown>



<style lang="scss">
  .label,
  .item {
    width: 100%;

    :global(svg) {
      width: 100%;
      height: 50px;

      :global(path),
      :global(rect) {
        fill: var(--text-color-dark);
        color: var(--text-color-dark);
      }
    }
  }

  .item {
    cursor: pointer;
    padding: .5rem;
    margin-bottom: .25rem;
    border: 1px solid var(--text-color-dark);

    &:hover,
    &:active,
    &--active {
      border-color: var(--text-color);
      color: var(--text-color-light);

      :global(svg) {
        :global(path),
        :global(rect) {
          fill: var(--text-color);
        }
      }
    }
  }
</style>
