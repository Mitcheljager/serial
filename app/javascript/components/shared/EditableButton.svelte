<script>
  import { currentEditableButton } from "../../stores/data"

  export let element
  export let key
  export let defaultValue = { label: "Link" }

  $: button = element.properties?.[key] || defaultValue

  function openSettings() {
    event.preventDefault()

    const settingsKey = { key: key, element: element }
    if ($currentEditableButton?.key == settingsKey.key && $currentEditableButton?.element == settingsKey.element) {
      $currentEditableButton = null
    } else {
      $currentEditableButton = settingsKey
    }
  }
</script>



<a 
  class="button"
  class:active={ $currentEditableButton?.key == key && $currentEditableButton?.element == element }
  href="{ button.link }"
  on:click={ openSettings }>

  { button.label }
</a>



<style lang="scss">
  .active {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -.25rem;
      right: -.25rem;
      top: -.25rem;
      bottom: -.25rem;
      border-radius: calc(var(--border-radius) / 2);
      box-shadow: 0 0 0 2px var(--secondary);
    }
  }
</style>
