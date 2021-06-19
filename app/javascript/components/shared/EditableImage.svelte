<script>
  import { currentEditable } from "../../stores/data"

  export let section = null
  export let element = null
  export let key
  export let width = 400
  export let height = 300

  $: image = getKey(element, section) || {}
  $: keyType = element ? "element" : "section"

  function getKey() {
    if (element) return element.properties[key]
    if (section) return section.properties[key]
  }

  function toggleSettings() {
    event.preventDefault()

    console.log(element)

    const settingsKey = { type: "image", keyType, key, width, height, element, section }
    $currentEditable = settingsKey
  }
</script>



<div
  data-editable-image
  class="image-wrapper"
  class:active={ $currentEditable?.key == key && $currentEditable?.element == element }
  class:with-shadow={ image.shadow }
  on:click={ toggleSettings }>

  { #if image.overlay }
    <div class="overlay" style="opacity: { image.overlay_opacity / 100 || .5 }"></div>
  { /if }

  { #if image.src }
    <img
      src={ image.src } { height } { width }
      loading=lazy />
  { :else }
    <svg { height } { width }>
      <text x=50% y=50%>no image</text> 
    </svg>
  { /if }
</div>



<style lang="scss">
  .image-wrapper {
    position: relative;
    overflow: hidden;

    &.with-shadow {
      box-shadow: var(--shadow-type);
    }
  }

  img,
  svg {
    display: block;
    width: 100%;
    height: auto;
    background: var(--palette-border);
  }

  svg {
    text {
      dominant-baseline: middle;
      text-anchor: middle;
      fill: var(--palette-font-alt, white);
    }
  }

  .active {
    position: relative;

    &::before {
      display: block;
      content: "";
      position: absolute;
      top: -.5rem;
      right: -.5rem;
      bottom: -.5rem;
      left: -.5rem;
      border: dashed 2px var(--palette-font-alt);
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: black;
    opacity: .5;
  }
</style>
