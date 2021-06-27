<script>
  import { getTypeKey, setTypeKey } from "@shared/key"

  export let type = "element"
  export let element = null
  export let section = null
  export let key
  export let values = []

  $: value = getTypeKey(type, section || element, key)

  function setKey(event) {
    setTypeKey(type, section || element, key, event.target.value)
  }
</script>



<div class="select-group mt-1/8">
  <div class="form-label"><slot></slot></div>

  <select class="form-input" on:change={ setKey } { value }>
    { #each Object.entries(values) as [label, val] }
      <option value={ val }>{ label }</option>
    { /each }
  </select>
</div>



<style lang="scss">
</style>
