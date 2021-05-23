<script>
  import { currentEditable, currentSectionIndex } from "../../../stores/data"
  import { getElementKey, setElementKey } from "../../../shared/key.js"

  import FloatingSettings from "./_FloatingSettings.svelte"

  $: button = getElementKey($currentSectionIndex, $currentEditable?.element, $currentEditable?.key) || {}

  function setKey(key) {
    button[key] = event.target.value

    setElementKey($currentSectionIndex, $currentEditable.element, $currentEditable.key, button)
  }
</script>



<FloatingSettings>
  <div class="grid">
    <div class="grid__item">
      <label for="button-label" class="form-label">Label</label>

      <input
        type="text"
        class="form-input mt-1/8"
        value={ button?.label || "Link" }
        on:input={ () => setKey("label") } />
    </div>

    <div class="grid__item">
      <label for="button-label" class="form-label">Link to</label>

      <input
        placeholder="https://example.com/"
        type="text"
        class="form-input mt-1/8"
        value={ button?.link || "" }
        on:input={ () => setKey("link") } />
    </div>

    <div class="grid__item">
      <label for="button-label" class="form-label">Style</label>

      <select class="form-input mt-1/8" value={ button?.style || "" } on:change={ () => setKey("style") }>
        <option value="">Default</option>
        <option value="primary">Primary</option>
        <option value="secondary">Secondary</option>
        <option value="gradient">Gradient</option>
        <option value="border">Border</option>
        <option value="link">Link</option>
      </select>
    </div>

    <div class="grid__item">
      <label for="button-label" class="form-label">Size</label>

      <select class="form-input mt-1/8" value={ button?.size || "" } on:change={ () => setKey("size") }>
        <option value="">Default</option>
        <option value="large">Large</option>
        <option value="full-width">Full width</option>
        <option value="pill">Pill</option>
      </select>
    </div>
  </div>
</FloatingSettings>



<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 .5rem 1.5rem hsla(0, 0, 0, .25);
  }

  .grid__item {
    padding: .75rem;
    background: var(--border-color);
    border-right: 1px solid var(--content-bg);

    &:last-child {
      border-right: 0;
    }
  }

  input,
  select {
    background: var(--content-bg);
  }
</style>
