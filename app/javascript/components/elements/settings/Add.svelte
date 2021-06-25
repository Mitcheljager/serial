<script>
  import { v4 as uuid } from "uuid"

  import { page, currentSectionIndex, currentElement } from "../../../stores/data.js"

  let active = false

  function addElement(type) {
    const listLength = $page.sections[$currentSectionIndex].elements.length
    const newElement = { uuid: uuid(), content_type: type, position: listLength, properties: {} }
    
    $page.sections[$currentSectionIndex].elements = [...$page.sections[$currentSectionIndex].elements || [], newElement]

    active = false
    $currentElement = newElement.uuid
  }
</script>



<div style="position: relative">
  <button class="button button--light button--small w-100 mt-1/4" on:click={ () => active = !active }>
    <span>Add element</span>
  </button>

  { #if active }
    <div class="popup">
      <span class="popup__item" on:click={ () => addElement("heading") }>Heading</span>
      <span class="popup__item" on:click={ () => addElement("columns") }>Columns</span>
      <span class="popup__item" on:click={ () => addElement("offset") }>Offset</span>
      <span class="popup__item" on:click={ () => addElement("call_to_action") }>Call to action</span>
      <span class="popup__item" on:click={ () => addElement("image") }>Image</span>
      <span class="popup__item" on:click={ () => addElement("sponsors") }>Sponsors</span>
    </div>
  { /if }
</div>



<style lang="scss">
  .button {
    position: relative;
  }

  .popup {
    position: absolute;
    bottom: calc(100% + .5rem);
    left: 0;
    max-height: 300px;
    width: 100%;
    background: var(--border-color);
    border-radius: 1rem;
    overflow: hidden;
    z-index: 100;
  }

  .popup__item {
    display: block;
    padding: .5rem 1rem;
    cursor: pointer;

    &:hover,
    &:active {
      background: var(--content-bg-light);
      color: white;
    }
  }
</style>
