<script>
  import { theme } from "../../stores/theme.js"

  $: fontSizeBody = $theme.font_size_body || 16
  $: margin = $theme.margin || 2
  $: borderRadius = $theme.border_radius != undefined ? $theme.border_radius : 2
</script>



<div
  class="theme"
  style="
    --font-size-body: { fontSizeBody }px;
    --margin-multiplier: { margin };
    --border-radius-multiplier: { borderRadius };">
  <slot></slot>
</div>



<style lang="scss">
  .theme {
    font-size: var(--font-size-body);
  }
</style>
