<script>
  import { getTypeKey, setTypeKey } from "../../shared/key"

  export let element = null
  export let section = null
  export let key

  const alignment = [
    ["top", "left"],
    ["top", "center"],
    ["top", "right"],

    ["center", "left"],
    ["center", "center"],
    ["center", "right"],

    ["bottom", "left"],
    ["bottom", "center"],
    ["bottom", "right"]
  ]

  let type = element ? "element" : section ? "section" : "theme"
  $: value = getTypeKey(type, section || element, key) || ["center", "center"]

  function setKey(index) {
    setTypeKey(type, section || element, key, alignment[index])
  }
</script>



<div class="select-group mt-1/8">
  <div class="form-label"><slot></slot></div>

  <div class="alignment">
    { #each alignment as item, index }
      <div
        class="item"
        class:item--active={ alignment[index].toString() == value.toString() }
        on:click={ () => setKey(index) } />
    { /each }
  </div>
</div>



<style lang="scss">
  .alignment {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: .5rem;
    width: 100%;
  }

  .item {
    height: .75rem;
    border-radius: 1rem;
    background: var(--bg-dark);
    cursor: pointer;
    transition: box-shadow 150ms, background-color 150ms;

    &:hover,
    &:active {
      background: var(--text-color-dark);
      box-shadow: inset 0 0 0 1px var(--text-color-dark), inset 0 0 0 5px var(--bg-dark);
      transition: background-color 150ms;
    }

    &--active,
    &--active:hover,
    &--active:active {
      background: var(--text-color);
      box-shadow: inset 0 0 0 1px var(--text-color-dark), inset 0 0 0 5px var(--bg-dark);
      transition: background-color 150ms;
    }
  }

  .select-group {
    align-items: flex-start
  }
</style>
