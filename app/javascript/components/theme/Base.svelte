<script>
  import { theme } from "../../stores/theme.js"
  import { palettes } from "../../stores/palettes.js"

  $: console.log($theme)

  $: fontBody = $theme.font_body || ""
  $: fontHeading = $theme.font_heading || ""
  $: fontSizeBody = $theme.font_size_body || 16
  $: margin = $theme.margin || 2
  $: borderRadius = $theme.border_radius != undefined ? $theme.border_radius : 2
  $: primaryColor = $theme.primary_color || { h: 281, s: 72, l: 54 }
  $: secondaryColor = $theme.secondary_color || { h: 32, s: 90, l: 49 }
  $: palette = $theme.palette || $palettes[0]
</script>



{ #if fontBody }
  <link href="https://fonts.googleapis.com/css2?family={ fontBody.name }:wght@400;700&display=swap" rel="stylesheet">
{ /if }
{ #if fontHeading }
  <link href="https://fonts.googleapis.com/css2?family={ fontHeading.name }:wght@400;700&display=swap" rel="stylesheet">
{ /if }

<div
  class="theme"
  style="
    --font-body: { fontBody.property || "" };
    --font-heading: { fontHeading.property || "" };
    --font-size-body: { fontSizeBody }px;
    --margin-multiplier: { margin };
    --border-radius-multiplier: { borderRadius };
    --primary-color: hsl({ primaryColor.h }, { primaryColor.s }%, { primaryColor.l }%);
    --primary-color-text-offset: { primaryColor.l > 65 ? "black" : "white" };
    --secondary-color: hsl({ secondaryColor.h }, { secondaryColor.s }%, { secondaryColor.l }%);
    --secondary-color-text-offset: { secondaryColor.l > 65 ? "black" : "white" };
    --palette-normal: { palette.colors.normal };
    --palette-dark: { palette.colors.dark };
    --palette-light: { palette.colors.light };
    --palette-font: { palette.colors.font };
    --palette-font-dark: { palette.colors.font_dark };
    --palette-font-light: { palette.colors.font_light };">
  <slot></slot>
</div>



<style lang="scss">
  .theme {
    background: var(--palette-normal);
    font-size: var(--font-size-body);
    color: var(--palette-font);
  }
</style>
