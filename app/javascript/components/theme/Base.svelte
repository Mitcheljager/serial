<script>
  import { theme } from "@stores/theme"
  import { palettes } from "@stores/palettes"

  $: console.log($theme)

  $: fontBody = $theme.font_body || ""
  $: fontHeading = $theme.font_heading || ""
  $: fontSizeBody = $theme.font_size_body || 16
  $: margin = $theme.margin || 2
  $: maxWidth = $theme.max_width || 2
  $: borderRadius = $theme.border_radius != undefined ? $theme.border_radius : 2
  $: shadowType = $theme.shadow_type || 0
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
    --max-width-modifier: { maxWidth };
    --max-width: { 600 + (maxWidth * 150) }px;
    --border-radius-multiplier: { borderRadius };
    --shadow-type: var(--shadow-{ shadowType });
    --primary-color: hsl({ primaryColor.h }, { primaryColor.s }%, { primaryColor.l }%);
    --primary-color-text-offset: { primaryColor.l > 65 ? "black" : "white" };
    --secondary-color: hsl({ secondaryColor.h }, { secondaryColor.s }%, { secondaryColor.l }%);
    --secondary-color-text-offset: { secondaryColor.l > 65 ? "black" : "white" };
    --palette-body: { palette.colors.body };
    --palette-content: { palette.colors.content };
    --palette-border: { palette.colors.border };
    --palette-font: { palette.colors.font };
    --palette-font-alt: { palette.colors.font_alt };
    --palette-font-heading: { palette.colors.font_heading };">
  <slot></slot>
</div>



<style lang="scss">
  .theme {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--palette-body);
    font-size: var(--font-size-body);
    font-family: var(--font-body, var(--font-family));
    color: var(--palette-font);

    :global(.board &) {
      min-height: 600px;
    }

    :global(footer) {
      margin-top: auto;
    }
  }
</style>
