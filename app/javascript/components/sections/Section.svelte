<script>
  import { flip } from "svelte/animate"
  
  import { currentSectionIndex, currentTab } from "../../stores/data.js"
  import { theme } from "../../stores/theme.js"
  
  import Shape from "./Shape.svelte"
  import EditableImage from "../shared/EditableImage.svelte"
  import Element from "../elements/_Base.svelte"

  export let section
  export let index

  $: backgroundType = section.properties?.background_type
  $: backgroundColor = backgroundType == "color" ? section.properties?.background_color || "palette-content" : null
  $: backgroundImage = backgroundType == "image" ? section.properties?.background_image : null
  $: backgroundAlignment = backgroundType == "image" ? section.properties?.background_alignment || ["center", "center"] : null
</script>



<div
  on:click={ () => { $currentTab = "section"; $currentSectionIndex = index } } 
  class="section"
  class:text-primary-color-offset={ ["primary-color", "gradient"].includes(backgroundColor) || backgroundType == "image"  }
  class:text-secondary-color-offset={ backgroundColor == "secondary-color" }
  style="
  --spacing: { section.properties?.spacing || 0 };
  background: var(--{ backgroundImage ? "palette-content" : backgroundColor });">

  { #if backgroundType == "image" }
    <div class="background-image" style="--position: { backgroundAlignment[0] } { backgroundAlignment[1] }">
      <EditableImage { section } key="background_image" width="1920" height="800" clickable={ false } />
    </div>
  { /if }

  { #if backgroundType }
    <Shape position="top" { section } { index } />
  { /if }

  { #if $theme["navigation"] == "floating" && index == 0 }
    <div class="navigation-offset"></div>
  { /if }

  <div class="wrapper">
    { #if section.elements }
      { #each section.elements || {} as element (element.uuid) }
        <div animate:flip="{{ duration: 200 }}">
          <Element { element } />
        </div>
      { /each }
    { /if }
  </div>

  { #if backgroundType }
    <Shape position="bottom" { section } />
  { /if }
</div>



<style lang="scss">
  .section {
    position: relative;
    min-height: 100px;
    background-size: cover;
    background-position: center;
  }

  .wrapper {
    position: relative;
    padding: calc(1px + (var(--margin) * .5 * var(--spacing))) 1.5rem;
    z-index: 1;
  }

  .navigation-offset {
    // Calculation of the navigation height, based on the font size, padding, and margin
    height: calc(((.5rem + (.4rem * var(--margin-multiplier))) * 2) + (var(--font-size-body) * 1.35));
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 0;

    :global(img),
    :global(svg) {
      object-fit: cover;
      object-position: var(--position);
      height: 100%;
      width: 100%;
    }

    :global(div) {
      height: 100%;
    }
  }
</style>
