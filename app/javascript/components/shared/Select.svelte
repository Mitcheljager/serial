<script>
  import { theme } from "../../stores/theme.js"

  export let key
  export let array
  export let defaultValue

  console.log(array)

  function setKey() {
    $theme[key] = event.target.value
  }
</script>



<div class="form-label"><slot></slot></div>

<select class="form-input mt-1/8">
  { #each array as label, value }
    <option { value }>{ label }</option>
  { /each }
</select>



<style lang="scss">
  
</style>
