<script>
  import Sortable from "sortablejs"
  import { v4 as uuid } from "uuid"
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"

  import { pages } from "@stores/pages"
  import { theme } from "@stores/theme"
  import { getPageByUUID } from "@shared/pages"

  import Dropdown from "@components/shared/Dropdown.svelte"

  let listElement
  let sortable
  let addPageType = ""
  let externalTitleInput
  let externalUrlInput

  $: navigation = $theme.navigation || []
  $: availablePages = $pages.filter(p => !navigation.pages.some(n => n.uuid == p.uuid))

  onMount(() => createSortable(listElement))

  function createSortable(element) {
    sortable = new Sortable(element, {
      handle: ".page",
      animation: 100,
      store: {
        set: updateOrder
      }
    })
  }

  function updateOrder() {
    const listItems = listElement.querySelectorAll("[data-uuid]")
    const sortableOrder = sortable.toArray()
    const order = Array.from(listItems).map(element => {
      return navigation.pages.filter(i => i.uuid == element.dataset.uuid)[0]
    })
    
    $theme.navigation.pages = order

    console.log(navigation.pages)

    setTimeout(() => sortable.sort(sortableOrder, false))
  }

  function addPage(type, id = uuid()) {
    $theme.navigation.pages = [...navigation.pages || [], {
      type,
      uuid: id,
      title: externalTitleInput.value || null,
      url: externalUrlInput.value || null
    }]
    
    createSortable(listElement)
    addPageType = ""
  }

  function removePage(uuid) {
    $theme.navigation.pages = navigation.pages.filter(p => p.uuid != uuid)
  }

  function titleForPage(page) {
    return page.type == "internal" ? getPageByUUID(page.uuid).title : page.title
  }
</script>



<h3 class="mt-1/1">Pages in navigation</h3>

{ #if navigation.pages?.length > 1}
  <div class="mb-1/4 text-dark">
    <em>Reorder pages by dragging them</em>
  </div>
{ /if }

<div class="list" bind:this={ listElement }>
  { #if navigation.pages }
    { #each navigation.pages as page (page.uuid) }
      <div class="page">
        <div class="page__content" data-uuid={ page.uuid }>
          { titleForPage(page) }

          <div class="page__actions">
            <span on:click={ removePage(page.uuid) }>-</span>
          </div>
        </div>

        <div class="page__children" data-sortable></div>
      </div>
    { /each }
  { :else }
    <em>You have not yet added any pages to your navigation</em>
  { /if }
</div>

<Dropdown direction="up">
  <button class="button button--dark w-100 mt-1/4" slot="label" on:click={ () => addPageType = "" }>+ Add page to navigation</button>
  
  { #if !addPageType }
    { #if navigation.pages.length > 4 }
      <div class="warning"><strong>Heads up! You've already added 5 main pages to your navigation.</strong> You can add more if you like, but you should try to keep it simple and compact. Try to use Dropdowns where possible.</div>
    { /if }

    <em>Select a type of page to add.</em>

    <!-- This transition exists to make sure the Dropdown does not close on click since the button no longer exists the moment it's clicked -->
    <div out:fade={{ duration: 0 }}>
      <div class="button mb-1/8" on:click={ () => addPageType = "internal" }>Page</div>
      <div class="button" on:click={ () => addPageType = "external" }>External link</div>
    </div>
  { :else if addPageType == "internal" }
    <em>Select a page to add to the navigation.</em>

    { #each availablePages as page }
      <div class="dropdown__item" on:click={ () => addPage("internal", page.uuid) }>{ page.title }</div>
    { /each }

    { #if !availablePages.length }<em>You have added all your pages.</em>{ /if }
  { :else if addPageType == "external" }
    <em>Enter the title and URL for the website you wish to link to.</em>

    <div class="select-group">
      <label class="form-label" for="url">Title in nav</label>
      <input bind:this={ externalTitleInput } type="text" class="form-input" placeholder="Title" />
    </div>

    <div class="select-group mt-1/8">
      <label class="form-label" for="url">Url to page</label>
      <input bind:this={ externalUrlInput } type="text" id="url" class="form-input" placeholder="https://example.com/" />
    </div>

    <div class="button mt-1/4" on:click={ () => addPage("external") }>Add</div>
  { /if }
</Dropdown>



<style lang="scss">
  em {
    display: block;
    font-size: .85rem;
    margin-bottom: .5rem;
  }

  .form-label {
    display: block;
  }

  .dropdown__item {
    display: block;
    margin: 0 -.75rem;
    padding: .5rem .75rem;
    cursor: pointer;

    &:hover,
    &:active {
      background: var(--content-bg-light);
      color: white;
    }
  }

  .list {
    counter-reset: pages-list;
  }

  .page {
    counter-increment: pages-list;
    position: relative;
    padding: .5rem .75rem;
    margin-bottom: 4px;
    border-radius: .5rem;
    background: var(--content-bg);
    box-shadow: 0 0 0 4px var(--body-bg);
    cursor: pointer;

    &:hover,
    &:active {
      box-shadow: 0 0 0 2px var(--border-color), 0 0 0 4px var(--body-bg);
      color: var(--text-color-light);
      z-index: 2;
    }    
  }

  .page__content {
    display: flex;
    align-items: center;

    &::before {
      content: counter(pages-list) ". ";
      margin-right: .5rem;
      color: var(--text-color-dark);
    }
  }

  .page__children {
    padding-left: 1rem;
    border-left: 4px solid var(--body-bg);
    counter-reset: pages-list;

    &:not(:empty) {
      margin-top: .5rem;
    }

    .dragging & {
      min-height: 2rem;
      margin-top: .5rem;
    }

    :global(.page__children) {
      display: none;
    }
  }

  .page__actions {
    margin-left: auto;
    font-size: 1.15rem;
    font-weight: bold;
  }

  .warning {
    font-size: .85rem;
    background: var(--body-bg);
    padding: .5rem;
    margin-bottom: .5rem;
    border-radius: .5rem;

    strong {
      color: orange;
      font-weight: normal;
    }
  }
</style>
