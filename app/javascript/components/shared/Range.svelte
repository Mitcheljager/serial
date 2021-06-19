<script>
  import { createEventDispatcher } from "svelte"

  import { getTypeKey, setTypeKey } from "../../shared/key.js"
  import { settings } from "../../stores/user"

  export let element = null
  export let section = null
  export let key
  export let defaultValue
  export let min
  export let max
  export let step = 1
  export let responsive = false
  export let emit = false

  let type = element ? "element" : section ? "section" : "theme"
  let value = emit ? defaultValue : (getTypeKey(type, section || element, key) || defaultValue)

  const dispatch = createEventDispatcher()

  function setValue() {
    if (emit) dispatch("change", { value })
    if (!emit) setTypeKey(type, section || element, key, value)
  }
</script>



<div class="range">
  <label for="range">
    <span class="form-label"><slot /></span>

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
    <input type="text" { min } { max } bind:value on:input={ setValue } class="form-input range-input__number" />
  </div>

  { #if $settings.show_help_text }
    <div class="help">
      <slot name="help" />
    </div>
  { /if }
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
    margin: 1.5rem 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
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
      background: var(--bg-dark);
    }

    &::-moz-range-progress {
      background: var(--secondary);
    }
  }

  .range-input__number {
    width: 3rem;
    padding: .25rem .5rem;
    margin-left: .5rem;
    text-align: right;
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
