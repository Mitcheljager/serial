<script>
  import { currentEditable } from "../../stores/data"

  export let element
  export let key
  export let defaultValue = {}

  $: button = element.properties[key] || defaultValue

  function toggleSettings() {
    event.preventDefault()

    const settingsKey = { type: "button", key, element }
    $currentEditable = settingsKey
  }
</script>



<a data-editable-button
  class="button button--{ button.style } button--{ button.size }"
  class:active={ $currentEditable?.key == key && $currentEditable?.element == element }
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
