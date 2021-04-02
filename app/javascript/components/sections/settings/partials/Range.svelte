<script>
  import { page } from "../../../../stores/data.js"

  export let element
  export let index
  export let sectionIndex
  export let label
  export let key
  export let defaultValue
  export let min
  export let max
  export let step = 1

  let value = element[key] || defaultValue

  function setValue(key) {
    element.properties[key] = value

    $page.sections[sectionIndex].elements[index] = element
  }
</script>

<div class="range">
  <label>{ label }</label>

  <div class="range-input">
    <input type="range" { min } { max } { step } bind:value on:input={ () => setValue(key) } />
    <input type="text" { min } { max } bind:value class="range-input__number" />
  </div>

  <div class="help">
    <slot></slot>
  </div>
</div>

<style lang="scss">
  label {
    display: block;
  }

  input {
    width: 100%;
  }

  .range {
    margin-bottom: 1rem;
  }

  .range-input {
    display: flex;
    align-items: center;
  }

  .range-input__number {
    appearance: none;
    width: 3rem;
    padding: .25rem .5rem;
    border: 0;
    border-radius: .5rem;
    margin-left: .5rem;
    background: var(--content-bg);
    color: var(--text-color);
    text-align: right;
    font-size: 1rem;
  }

  .help {
    font-size: .85rem;
    font-style: italic;
    opacity: .75;
  }
</style>
