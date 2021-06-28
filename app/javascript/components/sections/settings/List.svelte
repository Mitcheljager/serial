<script>
  import Sortable from "sortablejs"
  import { onMount } from "svelte"
  import { flip } from "svelte/animate"

  import { currentSectionIndex, currentTab, hoveringSection } from "@stores/data"
  import { page } from "@stores/pages"

  import TrashIcon from "@components/icons/Trash.svelte"
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
      class="section"
      class:hovering={ $hoveringSection == section.uuid }
      on:click={ () => { $currentTab = "section"; $currentSectionIndex = index } }
      on:mouseenter={ () => $hoveringSection = section.uuid }
      on:mouseleave={ () => $hoveringSection = null }
      animate:flip={{ duration: 200 }}>

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
    
    &.hovering {
      box-shadow: 0 0 0 2px var(--border-color);
    }

    h4 {
      margin: 0;
    }
  }

  .actions {
    display: flex;
    align-items: center;
  }
</style>
