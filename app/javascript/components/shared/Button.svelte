<script>
  export let key
  export let value
  export let sectionIndex

  import { page } from "../../stores/data.js"

  function setKey(key, value) {
    $page.sections[sectionIndex][key] = value
  }
</script>

<button
  class="button button--light button--small"
  class:active={ $page.sections[sectionIndex][key] == value || (value == "" && $page.sections[sectionIndex][key] == undefined) }
  on:click={ () => setKey(key, value) }>
  <slot></slot>
</button>
