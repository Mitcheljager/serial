<script>
  export let key
  export let value

  import { page, currentSectionIndex } from "../../stores/data.js"

  $: keyValue = $page.sections[$currentSectionIndex].properties?.[key]

  function setKey(key, value) {
    $page.sections[$currentSectionIndex].properties[key] = value
  }
</script>



<button
  class="button button--light button--small"
  class:active={ keyValue == value || (value == "" && keyValue == undefined) }
  on:click={ () => setKey(key, value) }>
  <slot></slot>
</button>
