<script>
  import { createEventDispatcher } from "svelte"

  import { getTypeKey, setTypeKey } from "@shared/key"

  export let element = null
  export let section = null
  export let key
  export let values = []
  export let defaultValue = ""
  export let emit = false
  export let custom

  const dispatch = createEventDispatcher()

  $: type = element ? "element" : section ? "section" : "theme"
  $: value = getTypeKey(type, section || element, key) || defaultValue

  function setKey(event) {
    if (emit) dispatch("change", { value: event.target.value })
    if (!emit) setTypeKey(type, section || element, key, event.target.value)
  }
</script>



<div class="select-group mt-1/8">
  <div class="form-label"><slot></slot></div>

  <!-- svelte-ignore a11y-no-onchange -->
  <select class="form-input" on:change={ setKey } { value }>
    { #each Object.entries(values) as [label, val] }
      <option value={ val }>{ label }</option>
    { /each }
  </select>
</div>

{ #if custom }
  <slot name="custom"></slot>
{ /if }



<style lang="scss">
</style>
