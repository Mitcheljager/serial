<script>
  import { currentEditable } from "@stores/data"
  import { theme } from "@stores/theme"
  import { editMode } from "@stores/user"
  import { setTypeKey } from "@shared/key"

  export let key
  export let element = null
  export let defaultValue = ""

  $: keyType = element ? "element" : "theme"
  $: content = (element ? element?.properties[key] : $theme[key]) || defaultValue

  function change() {
    setTypeKey(keyType, element, key, content)
  }

  function showSettings() {
    if (!$editMode) return

    $currentEditable = null

    const settingsKey = { type: "text", keyType, key, element }
    $currentEditable = settingsKey
  }
</script>



{ #if $editMode }
  <span
    contenteditable
    spellcheck=false
    bind:innerHTML={ content }
    on:input={ change }
    on:focus={ showSettings } />
{ :else }
  <span>{ @html content }</span>
{ /if }



<style lang="scss">
  span {
    position: relative;
    display: inline-block;
    min-height: 1em;
    min-width: 1em;

    &:empty::after {
      content: "Edit";
      display: block;
      font-style: italic;
      opacity: .5;
    }

    &:focus {
      outline: none;

      &::after {
        content: "";
        display: block;
        position: absolute;
        top: calc(-.5rem - 1px);
        left: calc(-.5rem - 1px);
        width: calc(100% + 1rem);
        height: calc(100% + 1rem);
        border: 2px dashed currentColor;
        opacity: .6;
        pointer-events: none;
        z-index: 0;
      }
    }
  }
</style>
