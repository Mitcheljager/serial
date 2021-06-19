<script>
  export let section = null
  export let key
  export let value

  import { getSectionKey, setSectionKey } from "../../shared/key"
  import { page } from "../../stores/data.js"

  $: keyValue = getSectionKey(section, key, $page)

  function setKey(key, value) {
    setSectionKey(section, key, value)
  }
</script>



<button
  class="button button--dark button--small"
  class:active={ keyValue == value || (value == "" && keyValue == undefined) }
  on:click={ () => setKey(key, value) }>
  <slot></slot>
</button>
