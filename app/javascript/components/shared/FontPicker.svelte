<script>
  import { theme } from "@stores/theme"
  import { fonts } from "@stores/fonts"
  import { setThemeKey } from "@shared/key"

  import Select from "@components/shared/Select.svelte"

  export let key

  let values = { 
    "Default": "",
    "Custom": "custom",
    ...Object.entries($fonts).reduce((object, f) => ({...object, [f[0]]: JSON.stringify(f[1]) }), {})
  }

  function setKey(value) {
    value = value == "custom" || value == "" ? value : JSON.parse(value)
    setThemeKey(key, value)
  }
</script>



<Select
  { key } { values }
  defaultValue={ $theme[key] || "" }
  emit=true
  on:change={ event => setKey(event.detail.value) }
  custom={ $theme[key] == "custom" }>
  <slot></slot>

  <span slot="custom">
    Custom
  </span>
</Select>



<style lang="scss">

</style>
