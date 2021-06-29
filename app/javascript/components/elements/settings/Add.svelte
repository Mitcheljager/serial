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

  <h4>General</h4>
  <span class="dropdown__item" on:click={ () => addElement("heading") }>Heading</span>
  <span class="dropdown__item" on:click={ () => addElement("paragraph") }>Paragraph</span>
  <span class="dropdown__item" on:click={ () => addElement("image") }>Image</span>
  <span class="dropdown__item" on:click={ () => addElement("buttons") }>Buttons</span>
  <span class="dropdown__item" on:click={ () => addElement("offset") }>Offset</span>

  <hr />
  <h4>Marketing</h4>
  <span class="dropdown__item" on:click={ () => addElement("columns") }>Columns</span>
  <span class="dropdown__item" on:click={ () => addElement("call_to_action") }>Call to action</span>
  <span class="dropdown__item" on:click={ () => addElement("sponsors") }>Sponsors</span>

  <hr />
  <h4>Advanced</h4>
  <span class="dropdown__item" on:click={ () => addElement("custom_html") }>Custom HTML</span>
</Dropdown>



<style lang="scss">
  h4 {
    margin: 0 0 .5rem;
    color: var(--text-color-light);
  }

  hr {
    margin: .75rem -.75rem 1.5rem;
    width: calc(100% + 1.5rem);
    height: 1px;
    border: 0;
    background: var(--body-bg);
  }

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
