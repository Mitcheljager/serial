<script>
  export let type = "element"
  export let element = null
  export let key
  export let values = []

  import { getTypeKey, setTypeKey } from "../../shared/key"
  import { currentSectionIndex } from "../../stores/data"

  let value = getTypeKey(type, [$currentSectionIndex, element], key)

  function setKey(event) {
    setTypeKey(type, [$currentSectionIndex, element], key, event.target.value)
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
