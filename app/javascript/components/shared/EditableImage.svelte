<script>
  import { currentEditable, imageUrl } from "@stores/data"
  import { theme } from "@stores/theme"
  import { editMode } from "@stores/user"

  export let section = null
  export let element = null
  export let key
  export let width = 400
  export let height = 300
  export let clickable = true

  $: keyType = element ? "element" : section ? "section" : "theme"
  $: image = (element?.properties[key] || section?.properties[key] || $theme[key] ) || {}

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
      { #if image.variant }
        <img
          style="filter: blur({ image.blur || 0 }px) grayscale({ image.grayscale ? 100 : 0 }%) brightness({ image.brightness || 100 }%)"
          src={ $imageUrl + image.variant.key } { height } { width }
          alt={ image.alt }
          loading=lazy />
      { :else }
        <svg { height } { width }>
          <line x1=0 y1=0 x2=100% y2=100% stroke="var(--palette-font-alt, var(--border-color))" />
          <line x1=100% y1=0 x2=0 y2=100% stroke="var(--palette-font-alt, var(--border-color))" />
          <rect x="25%" y="35%" width="50%" height="30%" fill="var(--palette-content, var(--content-bg)" />
          <text x=50% y=50% fill="var(--palette-font-alt, white)" font-size=".85rem">no image</text>
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
    min-height: 20px;
  }

  svg {
    box-shadow: inset 0 0 0 1px var(--palette-font-alt, var(--border-color));
    background: var(--palette-content, var(--content-bg));
    
    text {
      dominant-baseline: middle;
      text-anchor: middle;
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
