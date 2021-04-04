<script>
  import { theme } from "../../stores/theme.js"

  import Range from "../shared/Range.svelte"

  function setKey(key, value) {
    $theme[key] = value
  }
</script>

<h3>Theme</h3>

<Range setTheme=true
  label="Margin"
  key="margin"
  min=1 max=4 step=1 defaultValue=1>
  The size of spacing around almost all elements. A larger margin will make the website feel more open, but without sufficient content it might make it feel empty.
</Range>
