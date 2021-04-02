<script>
  let active = false
</script>

<div class="dropdown" class:dropdown--active={ active }>
  <div class="dropdown__action" on:click={ () => active = !active }>
    <slot name="label"></slot>
  </div>

  <div class="dropdown__content">
    <slot></slot>
  </div>
</div>

<style lang="scss">
  .dropdown {
    position: relative;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    z-index: 10;
  }

  .dropdown__action {
    position: relative;
    padding: .25rem .75rem;
    z-index: 1;

    &:hover,
    &:active {
      color: white;
    }
  }

  .dropdown__content {
    position: absolute;
    top: 0;
    left: 0;
    height: auto;
    max-height: 100%;
    width: 100%;
    padding-top: 1.5rem;
    border: 2px solid var(--border-color);
    border-radius: 1rem;
    background: var(--body-bg);
    overflow: hidden;
    transition: box-shadow 100ms, max-height 200ms, width 200ms;

    .dropdown--active & {
      width: 250px;
      max-height: 500px;
      box-shadow: 0 3px 6px #00000050;
      overflow-y: auto;
    }
  }

  .dropdown__item {
    display: block;
    padding: .25rem .75rem;
    white-space: nowrap;

    &:hover,
    &:active {
      background: var(--content-bg);
    }
  }
</style>
