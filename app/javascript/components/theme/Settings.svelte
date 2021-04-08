<script>
  import { theme } from "../../stores/theme.js"

  import Range from "../shared/Range.svelte"

  function setKey(key, value) {
    $theme[key] = value
  }
</script>

<Range setTheme=true
  key="font_size_body"
  min=15 max=18 step=1 defaultValue=16>
  Body font size
  <span slot="help">The size of text of most of regular content. Font size in pixels</span>
</Range>

<Range setTheme=true
  key="margin"
  min=1 max=4 step=1 defaultValue=2>
  Spacing
  <span slot="help">The size of spacing around almost all elements. A larger margin will make the website feel more open, but without sufficient content it might make it feel empty.</span>
</Range>

<Range setTheme=true
  key="border_radius"
  min=0 max=3 step=1 defaultValue=2>
  Roundness
  <span slot="help">This values determines how "round" several elements on your page are. Round elements appear more friendly.</span>
</Range>
