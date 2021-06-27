<script>
  import { setSectionKey } from "@shared/key"
  import { shapes } from "@shared/shapes"

  import Dropdown from "@components/shared/Dropdown.svelte"
  import Range from "@components/shared/Range.svelte"
  import Switch from "@components/shared/Switch.svelte"

  export let section
  export let key
  export let flipped = false
  
  $: type = section.properties[key] || ""

  function setKey(value) {
    setSectionKey(section, key, value)
  }
</script>



<Dropdown direction="up">
  <div class="select-group mb-1/8" slot="label">
    <div class="form-label"><slot></slot></div>

    <div
      class="clickable-label label"
      class:label--reverse={ section.properties[`${ key }_reverse`] }
      class:label--flipped={ flipped }>
      { #if type }
        <svelte:component this={ shapes.filter(i => i.identifier == type)[0].component } />
      { :else }
        None
      { /if }
    </div>
  </div>

  <Range
    { section }
    key="{ key }_size"
    min=50 max=500 step=10 defaultValue=100>
    Size
  </Range>

  <Switch
    { section }
    key="{ key }_subtractive">
    Subtractive
  </Switch>

  <Switch
    { section }
    key="{ key }_reverse">
    Reverse
  </Switch>

  <div>
    <div 
      class="item"
      class:item--active={ !type }
      on:click={ () => setKey("") }>

      None
    </div>

    { #each shapes as shape }
      <div
        class="item"
        class:item--active={ type == shape.identifier }
        class:item--reverse={ section.properties[`${ key }_reverse`] }
        class:item--flipped={ flipped }
        on:click={ () => setKey(shape.identifier) }>

        <svelte:component this={ shape.component } />
      </div>
    { /each }
  </div>
</Dropdown>



<style lang="scss">
  .form-label {
    color: var(--text-color);
  }

  .label,
  .item {
    :global(svg) {
      width: 100%;
      height: 40px;
      background: var(--text-color-dark);
      transform: scale(var(--scale-x, 1), var(--scale-y, 1));

      :global(path),
      :global(rect:not([fill*=gradient])) {
        fill: var(--bg-dark);
        color: var(--bg-dark);
      }
    }

    &--reverse {
      :global(svg) {
        --scale-x: -1
      }
    }

    &--flipped {
      :global(svg) {
        --scale-y: -1
      }
    }
  }

  .item {
    cursor: pointer;
    padding: .5rem;
    margin-bottom: .25rem;
    border: 2px solid var(--text-color-dark);

    :global(svg) {
      :global(path),
      :global(rect:not([fill*=gradient])) {
        fill: var(--border-color);
        color: var(--border-color);
      }
    }

    &:hover,
    &:active,
    &--active {
      border-color: var(--text-color);
      color: var(--text-color-light);

      :global(svg) {
        background: var(--text-color);
      }
    }
  }
</style>
