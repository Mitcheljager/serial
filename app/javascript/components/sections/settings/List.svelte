<script>
  import Sortable from "sortablejs"
  import { onMount } from "svelte"

  import { page, currentSectionIndex, currentTab } from "../../../stores/data.js"

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
    
    $page.sections = orderedList

    setTimeout(() => sortable.sort(sortableOrder, false))
  }
</script>



<h2>Sections</h2>

<div bind:this={ listElement }>
  { #each $page.sections as section, index (section.uuid) }
    <div
      data-id={ section.id }
      data-index={ index }
      on:click={ () => { $currentTab = "section"; $currentSectionIndex = index } }
      class="section">

      <h4>{ section.name }</h4>
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

    h4 {
      margin: 0;
    }
  }
</style>
