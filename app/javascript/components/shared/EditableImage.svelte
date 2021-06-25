<script>
  import { currentEditable } from "../../stores/data"
  import { editMode } from "../../stores/user"

  export let section = null
  export let element = null
  export let key
  export let width = 400
  export let height = 300
  export let clickable = true

  $: image = getKey(element, section) || {}
  $: keyType = element ? "element" : "section"

  function getKey() {
    if (element) return element.properties[key]
    if (section) return section.properties[key]
  }

  function toggleSettings() {
    if (!$editMode) return
    if (!clickable) return

    event.preventDefault()

    const settingsKey = { type: "image", keyType, key, width, height, element, section }
    $currentEditable = settingsKey
  }
</script>



<div class:active={ $currentEditable?.key == key && $currentEditable?.element == element }>
  <div
    data-editable-image
    class="image-wrapper"
    class:with-shadow={ image.shadow }
    class:rounded={ image.rounded }
    on:click={ toggleSettings }>

    <a href={ image.include_link && image.link ? image.link : null }>
      { #if image.src }
        <img
          style="filter: blur({ image.blur || 0 }px) grayscale({ image.grayscale ? 100 : 0 }%) brightness({ image.brightness || 100 }%)"
          src={ image.src } { height } { width }
          loading=lazy />
      { :else }
        <svg { height } { width }>
          <text x=50% y=50%>no image</text> 
        </svg>
      { /if }
    </a>
  </div>
</div>



<style lang="scss">
  .image-wrapper {
    position: relative;
    overflow: hidden;

    &.with-shadow {
      box-shadow: var(--shadow-type);
    }

    &.rounded {
      border-radius: var(--border-radius);
    }

    a[href] {
      cursor: pointer;

      &:hover,
      &:active {
        filter: brightness(1.15);
      }
    }
  }

  img,
  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  svg {
    box-shadow: inset 0 0 0 1px var(--palette-font-alt, var(--border-color));
    background: var(--palette-content, var(--content-bg));

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
      border: dashed 2px var(--palette-font-alt, var(--text-color-dark));
    }
  }
</style>
