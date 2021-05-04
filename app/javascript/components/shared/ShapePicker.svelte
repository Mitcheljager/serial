<script>
  import { getSectionKey, setSectionKey } from "../../shared/key"
  import { page, currentSectionIndex } from "../../stores/data.js"

  import SettingsDropdown from "./SettingsDropdown.svelte"
  import Range from "./Range.svelte"
  import Switch from "./Switch.svelte"

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

  <div class="label" slot="label">
    { type || "None" }
  </div>

  <div>
    <div class="item" on:click={ () => setKey("") }>None</div>
    <div class="item" on:click={ () => setKey("slant") }>Slant</div>
    <div class="item" on:click={ () => setKey("layered") }>Layered</div>
    <div class="item" on:click={ () => setKey("wavy") }>Wavy</div>
  </div>
</SettingsDropdown>



<style lang="scss">
  .item {
    cursor: pointer;
  }
</style>
