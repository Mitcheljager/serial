<script>
  import { currentEditable } from "../../stores/data"

  export let section = null
  export let element = null
  export let key
  export let defaultValue = { }
  export let width = 400
  export let height = 300

  $: src = getSrc(element, section)

  function getSrc() {
    if (element) return element.properties[key]
    if (section) return section.properties[key]
  }

  function toggleSettings() {
    event.preventDefault()

    const settingsKey = { type: "image", key, width, height, element: element, section: section }
    $currentEditable = settingsKey
  }
</script>


<div data-editable-image
  class:active={ $currentEditable?.key == key && $currentEditable?.element == element }
  on:click={ toggleSettings }>

  { #if src }
    <img
      { src } { height } { width }
      loading=lazy />
  { :else }
    <svg { height } { width }>
      <text x=50% y=50%>no image</text> 
    </svg>
  { /if }
</div>



<style lang="scss">
  img,
  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  svg {
    background: var(--palette-border);

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
</style>
