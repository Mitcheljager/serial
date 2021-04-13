<script>
  import { v4 as uuid } from "uuid"

  import { page, currentSectionIndex } from "../../../stores/data.js"

  let active = false

  function addElement(type) {
    const newElement = { uuid: uuid(), type: type, properties: {} }
    $page.sections[$currentSectionIndex].elements = [...$page.sections[$currentSectionIndex].elements || [], newElement]

    active = false
  }
</script>



<div style="position: relative">
  <button class="button button--light button--small w-100" on:click={ () => active = !active }>
    <span>Add element</span>
  </button>

  { #if active }
    <div class="popup">
      <span class="popup__item" on:click={ () => addElement("heading") }>Heading</span>
      <span class="popup__item" on:click={ () => addElement("columns") }>Columns</span>
    </div>
  { /if }
</div>



<style lang="scss">
  .button {
    position: relative;
    margin-top: 1.5rem;
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
