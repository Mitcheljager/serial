<script>
  import { getThemeKey, setThemeKey } from "../../../shared/key.js"
</script>



<h2>Navigation Settings</h2>

<div class="select-group">
  <div class="form-label">Style</div>

  <select
    class="form-input"
    value={ getThemeKey("navigation") || "default" }
    on:change={ event => setThemeKey("navigation", event.target.value) }>

    <option value="default">Default</option>
    <option value="floating">Floating</option>
  </select>
</div>

<div class="select-group mt-1/8">
  <div class="form-label">Background</div>

  <select
    class="form-input"
    value={ getThemeKey("navigation_background") || "default" }
    on:change={ event => setThemeKey("navigation_background", event.target.value) }>

    <option value="default">Default</option>
    <option value="primary">Primary</option>
    <option value="secondary">Secondary</option>
    <option value="gradient">Gradient</option>
    <option value="transparent">Transparent</option>
  </select>
</div>



<style lang="scss">
  
</style>
