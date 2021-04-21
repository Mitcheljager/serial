<script>
  import { theme } from "../../stores/theme.js"

  $: fontSizeBody = $theme.font_size_body || 16
  $: margin = $theme.margin || 2
  $: borderRadius = $theme.border_radius != undefined ? $theme.border_radius : 2
  $: primaryColor = $theme.primary_color || { h: 281, s: 72, l: 54 }
  $: secondaryColor = $theme.secondary_color || { h: 32, s: 90, l: 49 }
</script>



<div
  class="theme"
  style="
    --font-size-body: { fontSizeBody }px;
    --margin-multiplier: { margin };
    --border-radius-multiplier: { borderRadius };
    --primary-color: hsl({ primaryColor.h }, { primaryColor.s }%, { primaryColor.l }%);
    --primary-color-text-offset: { primaryColor.l > 65 ? "black" : "white" };
    --secondary-color: hsl({ secondaryColor.h }, { secondaryColor.s }%, { secondaryColor.l }%);
    --secondary-color-text-offset: { secondaryColor.l > 65 ? "black" : "white" }">
  <slot></slot>
</div>



<style lang="scss">
  .theme {
    font-size: var(--font-size-body);
  }
</style>
