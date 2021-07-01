<script>
  import { currentEditable } from "@stores/data"
  import { getTypeKey, setTypeKey } from "@shared/key.js"

  import Select from "@components/shared/Select.svelte"
  import FloatingSettings from "./_FloatingSettings.svelte"

  $: button = getTypeKey($currentEditable?.keyType, $currentEditable?.[$currentEditable?.keyType], $currentEditable?.key) || {}

  function setKey(key, value = event.target.value) {
    button[key] = value

    setTypeKey($currentEditable.keyType, $currentEditable[$currentEditable.keyType], $currentEditable.key, button)
  }
</script>



{ #if $currentEditable?.type == "button" && button }
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
          type="text"
          class="form-input mt-1/8"
          value={ button?.link || "" }
          placeholder="https://example.com/"
          on:input={ () => setKey("link") } />
      </div>

      <div class="grid__item">
        <Select
          on:change={ event => setKey("style", event.detail.value) }
          emit=true
          defaultValue={ button?.style || "" }
          values={{
            "Default": "",
            "Primary": "primary",
            "Secondary": "secondary",
            "Gradient": "gradient",
            "Border": "border",
            "Link": "link"
          }}>

          Style
        </Select>
      </div>

      <div class="grid__item">
        <Select
          on:change={ event => setKey("size", event.detail.value) }
          emit=true
          defaultValue={ button?.size || "" }
          values={{
            "Default": "",
            "Large": "large",
            "Full width": "full-width",
            "Pill": "pill"
          }}>

          Size
        </Select>
      </div>
    </div>
  </FloatingSettings>
{ /if }



<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 .5rem 1.5rem hsla(0, 0, 0, .25);

    :global {
      .select-group {
        display: block;
        margin-top: 0;
      }

      input,
      select {
        margin-top: .25rem;
        background-color: var(--content-bg);
      }
    }
  }

  .grid__item {
    padding: .75rem;
    background: var(--border-color);
    border-right: 1px solid var(--content-bg);

    &:last-child {
      border-right: 0;
    }
  }
</style>
