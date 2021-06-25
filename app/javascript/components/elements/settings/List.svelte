<script>
  import Sortable from "sortablejs"
  import { onMount } from "svelte"

  import { currentElement, hoveringElement, page } from "../../../stores/data.js"
  import { indexOfSection } from "../../../shared/key.js"

  import TrashIcon from "../../icons/Trash.svelte"
  import AddElement from "./Add.svelte"

  import Heading from "./Heading.svelte"
  import Columns from "./Columns.svelte"
  import Offset from "./Offset.svelte"
  import CallToAction from "./CallToAction.svelte"
  import Image from "./Image.svelte"
  import Sponsors from "./Sponsors.svelte"

  export let section

  const components = [
    { component: Heading, identifier: "heading" },
    { component: Columns, identifier: "columns" },
    { component: Offset, identifier: "offset" },
    { component: CallToAction, identifier: "call_to_action" },
    { component: Image, identifier: "image" },
    { component: Sponsors, identifier: "sponsors" }
  ]

  let listElement
  let sortable

  onMount(createSortable)

  function createSortable() {
    sortable = new Sortable(listElement, {
      handle: ".section__header",
      animation: 100,
      store: {
        set: updateOrder
      }
    })
  }

  function updateOrder() {
    const listItems = listElement.querySelectorAll("[data-index]")
    const order = Array.from(listItems).map(item => parseInt(item.dataset.index))
    const sortableOrder = sortable.toArray()
    
    const elementsList = section.elements
    const orderedList = order.map(index => elementsList[index])
    
    orderedList.map((item, index) => item.position = index)
    $page.sections[indexOfSection(section)].elements = orderedList

    setTimeout(() => sortable.sort(sortableOrder, false))
  }

  function setCurrentElement(uuid) {
    $currentElement = $currentElement == uuid ? null : uuid
  }

  function removeElement(uuid) {
    event.stopPropagation()

    const filteredElements = section.elements.filter(s => s.uuid != uuid)
    if (confirm("You sure?")) $page.sections[indexOfSection(section)].elements = filteredElements
  }
</script>



<div bind:this={ listElement }>
  { #each section.elements || {} as element, index (element.uuid) }
    <div
      data-id={ element.uuid }
      data-index={ index }
      class="section"
      class:active={ $currentElement == element.uuid }
      class:hovering={ $hoveringElement == element.uuid }
      on:mouseenter={ () => $hoveringElement = element.uuid }
      on:mouseleave={ () => $hoveringElement = null }>

      <div class="section__header" on:click={ () => setCurrentElement(element.uuid) }>
        <h4>{ element.content_type.replaceAll("_", " ") }</h4>

        <div class="actions">
          <div class="actions__item delete" on:click={ () => removeElement(element.uuid) }>
            <TrashIcon />
          </div>

          <div class="actions__item">
            { $currentElement == element.uuid ? "-" : "+" }
          </div>
        </div>
      </div>

      { #if $currentElement == element.uuid }
        <div class="section__content">
          <svelte:component this={ components.filter(i => i.identifier == element.content_type)[0].component } { element } { index } />
        </div>
      { /if }
    </div>
  { /each }
</div>

<AddElement />



<style lang="scss">
  .section {
    margin-bottom: .25rem;
    border-radius: .5rem;
    background: var(--content-bg);
    overflow: hidden;

    &.hovering {
      box-shadow: 0 0 0 2px var(--primary);
    }
  }

  .section__header {
    display: flex;
    justify-content: space-between;
    padding: .5rem 1rem;
    background: var(--bg-dark);
    cursor: pointer;

    h4 {
      margin: 0;

      &:first-letter {
        text-transform: capitalize;
      }
    }

    .active & {
      color: var(--text-color-light);
    }
  }

  .section__content {
    padding: 1rem;
    border-top: 0;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .actions__item {
    margin-left: .5rem;
    width: 1rem;
    text-align: center;
  }
</style>
