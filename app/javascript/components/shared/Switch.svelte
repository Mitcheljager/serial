<script>
  import { createEventDispatcher } from "svelte"
  
  import { getTypeKey, setTypeKey } from "@shared/key"

  export let section = null
  export let element = null
  export let key = null
  export let defaultValue = false
  export let emit = false

  let randomId = Math.random().toString(16).substr(2, 8)
  
  const dispatch = createEventDispatcher()

  $: type = element ? "element" : section ? "section" : "theme"
  $: checked = emit ? defaultValue : (getTypeKey(type, section || element, key) || defaultValue)


  function setKey(event) {
    if (emit) dispatch("change", { checked: event.target.checked })
    if (!emit) setTypeKey(type, section || element, key, event.target.checked)
  }
</script>



<div class="switch">
  <input class="switch__input" type="checkbox" id="{ randomId }-{ key }" bind:checked on:input={ setKey }>
  <label class="switch__label form-label" for="{ randomId }-{ key }"><slot></slot></label>
</div>



<style lang="scss">
  .switch {
    position: relative;
    margin: .75rem 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .switch__input {
    -webkit-appearance: none;
    appearance: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
  }

  .switch__label {
    display: block;
    padding-right: 3rem;
    text-align: left;
    cursor: pointer;

    &:hover {
      &::before {
        background: var(--text-color);
      }

      &::after {
        border-color: var(--text-color);
      }
    }
    
    &::before {
      display: block;
      content: "";
      position: absolute;
      top: 6px;
      right: calc(1rem + 2px);
      height: calc(1rem - 8px);
      width: calc(2rem - 8px);
      border-radius: 99px;
      background: var(--text-color-dark);
      z-index: 0;
      pointer-events: none;
      transition: right 100ms;

      .switch__input:checked + & {
        right: 6px;
        background: var(--text-color);
      }
    }

    &::after {
      display: block;
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      height: 1rem;
      width: calc(3rem - 4px);
      border-radius: 99px;
      border: 2px solid var(--text-color-dark);
      z-index: 0;
      pointer-events: none;

      .switch__input:checked + & {
        border-color: var(--text-color);
      }
    }
  }
</style>
