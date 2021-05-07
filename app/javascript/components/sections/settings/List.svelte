<script>
  import Sortable from "sortablejs"
  import { onMount } from "svelte"
  import { flip } from "svelte/animate"

  import { page, currentSectionIndex, currentTab } from "../../../stores/data.js"

  import TrashIcon from "../../icons/Trash.svelte"
  import AddSection from "./Add.svelte"

  let listElement
  let sortable

  onMount(createSortable)

  function createSortable() {
    sortable = new Sortable(listElement, {
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
    
    const elementsList = $page.sections
    const orderedList = order.map(index => elementsList[index])

    orderedList.map((item, index) => item.position = index)
    $page.sections = orderedList

    setTimeout(() => sortable.sort(sortableOrder, false))
  }

  function removeSection(uuid) {
    event.stopPropagation()

    if (confirm("You sure?")) $page.sections = $page.sections.filter(s => s.uuid != uuid)
  }
</script>



<h2>Sections</h2>

<div bind:this={ listElement }>
  { #each $page.sections as section, index (section.uuid) }
    <div
      data-id={ section.uuid }
      data-index={ index }
      on:click={ () => { $currentTab = "section"; $currentSectionIndex = index } }
      animate:flip={{ duration: 200 }}
      class="section">

      <h4>{ section.name }</h4>

      <div class="actions">
        <div class="delete" on:click={ () => removeSection(section.uuid) }>
          <TrashIcon />
        </div>
      </div>
    </div>
  { /each }
</div>

<AddSection />



<style lang="scss">
  .section {
    display: flex;
    justify-content: space-between;
    margin-bottom: .25rem;
    border-radius: .5rem;
    padding: .5rem 1rem;
    background: var(--bg-dark);
    cursor: pointer;
    overflow: hidden;

    &:hover,
    &:active {
      h4 {
        color: var(--text-color-light);
      }
    }

    h4 {
      margin: 0;
    }
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .delete {
    :global(svg) {
      height: 1rem;
      width: 1rem;
    }

    &:hover,
    &:active {
      :global(svg path) {
        fill: red;
      }
    }
  }
</style>
