<script>
  export let key
  export let value

  import { getSectionKey, setSectionKey } from "../../shared/key"
  import { page, currentSectionIndex } from "../../stores/data.js"

  $: keyValue = getSectionKey($currentSectionIndex, key, $page)

  function setKey(key, value) {
    setSectionKey($currentSectionIndex, key, value)
  }
</script>



<button
  class="button button--light button--small"
  class:active={ keyValue == value || (value == "" && keyValue == undefined) }
  on:click={ () => setKey(key, value) }>
  <slot></slot>
</button>
