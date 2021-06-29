<script>
  import { v4 as uuid } from "uuid"

  import { currentSectionIndex, currentElement } from "@stores/data.js"
  import { page } from "@stores/pages"

  import Dropdown from "@components/shared/Dropdown.svelte"

  function addElement(type) {
    const listLength = $page.sections[$currentSectionIndex].elements.length
    const newElement = { uuid: uuid(), content_type: type, position: listLength, properties: {} }
    
    $page.sections[$currentSectionIndex].elements = [...$page.sections[$currentSectionIndex].elements || [], newElement]

    $currentElement = newElement.uuid
  }
</script>



<Dropdown direction="up">
  <button class="button button--light button--small w-100 mt-1/4" slot="label">
    <span>Add element</span>
  </button>

  <span class="dropdown__item" on:click={ () => addElement("heading") }>Heading</span>
  <span class="dropdown__item" on:click={ () => addElement("paragraph") }>Paragraph</span>
  <span class="dropdown__item" on:click={ () => addElement("columns") }>Columns</span>
  <span class="dropdown__item" on:click={ () => addElement("offset") }>Offset</span>
  <span class="dropdown__item" on:click={ () => addElement("call_to_action") }>Call to action</span>
  <span class="dropdown__item" on:click={ () => addElement("image") }>Image</span>
  <span class="dropdown__item" on:click={ () => addElement("sponsors") }>Sponsors</span>
  <span class="dropdown__item" on:click={ () => addElement("custom_html") }>Custom HTML</span>
</Dropdown>



<style lang="scss">
  .button {
    position: relative;
  }

  .dropdown__item {
    display: block;
    padding: .5rem .75rem;
    margin: 0 -.75rem;
    cursor: pointer;

    &:hover,
    &:active {
      background: var(--content-bg-light);
      color: white;
    }
  }
</style>
