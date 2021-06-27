<script>
  import { theme } from "@stores/theme"
  import { fonts } from "@stores/fonts"

  export let key

  let custom = false

  function setKey() {
    const value = event.target.value

    if (value == "custom") {
      custom = true
    } else {
      custom = false
      $theme[key] = event.target.value ? JSON.parse(event.target.value) : ""
    }
  }
</script>



<div class="select-group mt-1/8">
  <div class="form-label"><slot></slot></div>

  <select class="form-input" on:change={ setKey }>
    <option value="">Default</option>
    <option value="custom">Custom...</option>

    { #each Object.entries($fonts) as [label, value] }
      <option value={ JSON.stringify(value) }>{ label }</option>
    { /each }
  </select>
</div>

{ #if custom }
  Custom
{ /if }



<style lang="scss">

</style>
