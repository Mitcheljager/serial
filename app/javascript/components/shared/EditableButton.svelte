<script>
  import { currentEditable } from "../../stores/data"
  import { theme } from "../../stores/theme"
  import { editMode } from "../../stores/user"

  export let element = null
  export let key
  export let defaultValue = {}

  $: keyType = element ? "element" : "theme"
  $: button = (element ? element?.properties[key] : $theme[key]) || defaultValue

  function toggleSettings() {
    if (!$editMode) return
    
    event.preventDefault()

    const settingsKey = { type: "button", keyType, key, element }
    $currentEditable = settingsKey
  }
</script>



<a data-editable-button
  class="button button--{ button.style } button--{ button.size }"
  class:active={ $editMode && $currentEditable?.key == key && $currentEditable?.element == element }
  href="{ button.link }"
  on:click={ toggleSettings }>

  { button.label || "Link" }
</a>



<style lang="scss">
  .button {
    box-shadow: var(--shadow-type);
  }
  
  .active {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -.5rem;
      right: -.5rem;
      top: -.5rem;
      bottom: -.5rem;
      border-radius: calc(var(--border-radius) / 2);
      border: 2px dashed var(--palette-font-alt);
    }
  }
</style>
