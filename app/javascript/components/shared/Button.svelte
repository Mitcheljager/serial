<script>
  import { getTypeKey, setTypeKey } from "@shared/key"

  export let element = null
  export let section = null
  export let key
  export let value

  let type = element ? "element" : section ? "section" : "theme"
  $: keyValue = getTypeKey(type, section || element, key)

  function setKey(key, value) {
    setTypeKey(type, section || element, key, value)
  }
</script>



<button
  class="button button--dark button--small"
  class:active={ keyValue == value || (value == "" && keyValue == undefined) }
  on:click={ () => setKey(key, value) }>
  <slot></slot>
</button>
