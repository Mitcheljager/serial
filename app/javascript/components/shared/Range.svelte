<script>
  import { page, currentSectionIndex } from "../../stores/data.js"
  import { theme } from "../../stores/theme.js"

  export let element = null
  export let index = null
  export let setTheme = false
  export let key
  export let defaultValue
  export let min
  export let max
  export let step = 1
  export let responsive = false

  $: value = setInitialValue($currentSectionIndex)

  function setInitialValue() {
    if (element && element.properties?.[key]) return element.properties[key]
    if (element == null && $page.sections[$currentSectionIndex].properties?.[key]) return $page.sections[$currentSectionIndex].properties[key]
    if (setTheme && $theme[key]) return $theme[key]

    return defaultValue
  }

  function setValue() {
    if (element) element.properties[key] = value
    if (index != null) $page.sections[$currentSectionIndex].elements[index] = element
    if (element == null && !setTheme) $page.sections[$currentSectionIndex].properties[key] = value
    if (setTheme) $theme[key] = value
  }
</script>



<div class="range">
  <label for="range">
    <slot></slot>

    { #if responsive }
      <div class="marker">
        Responsive

        <div class="marker__content">
          This setting is responsive, meaning it will change depending on the size of your screen. The position and size of this component and others around it might change as you change the size of your browser.
        </div>
      </div>
    { /if }
  </label>

  <div class="range-input">
    <input type="range" { min } { max } { step } bind:value on:input={ setValue } class="range-input__range" />
    <input type="text" { min } { max } bind:value on:input={ setValue } class="range-input__number" />
  </div>

  <div class="help">
    <slot name="help"></slot>
  </div>
</div>



<style lang="scss">
  label {
    display: flex;
    align-items: flex-start;
    line-height: 1em;
  }

  input {
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  .range {
    margin-bottom: 1rem;
  }

  .range-input {
    display: flex;
    align-items: center;
    margin: .25rem 0;
  }

  .range-input__range {
    background: transparent;

    &::-moz-range-thumb {
      background: var(--text-color);
      border: 0;
      cursor: pointer;

      &:hover {
        background: white;
      }
    }

    &::-moz-range-track {
      background: var(--text-color-dark);
    }

    &::-moz-range-progress {
      background: var(--secondary);
    }
  }

  .range-input__number {
    appearance: none;
    width: 3rem;
    padding: .25rem .5rem;
    border: 0;
    border-radius: .5rem;
    margin-left: .5rem;
    background: var(--bg-dark);
    color: var(--text-color);
    text-align: right;
    font-size: 1rem;
  }

  .help {
    font-size: .85rem;
    font-style: italic;
    opacity: .75;
  }

  .marker {
    display: inline-block;
    margin-left: .5rem;
    font-size: .75rem;
    color: var(--text-color-dark);
  }

  .marker__content {
    display: none;
    position: absolute;
    max-width: 220px;
    padding: .5rem;
    border-radius: .5rem;
    background: var(--bg-dark);
    z-index: 20;
    pointer-events: none;

    .marker:hover & {
      display: block;
    }
  }
</style>
