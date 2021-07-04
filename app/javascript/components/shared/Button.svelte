<script>
  import { createEventDispatcher } from "svelte"

  import { getTypeKey, setTypeKey } from "@shared/key"
  import { theme } from "@stores/theme"

  export let element = null
  export let section = null
  export let key
  export let value
  export let valueForEmit = null
  export let emit = false

  const dispatch = createEventDispatcher()

  let type = element ? "element" : section ? "section" : "theme"
  $: keyValue = (valueForEmit != null) ? valueForEmit : getTypeKey(type, section || element, key, $theme)

  function setKey() {
    if (emit) dispatch("change", { value })
    if (!emit) setTypeKey(type, section || element, key, value)
  }
</script>



<button
  class="button button--dark button--small"
  class:active={ keyValue == value || (value == "" && keyValue == undefined) }
  on:click={ () => setKey() }>
  <slot>Button</slot>
</button>
