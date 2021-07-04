<script>
  import Sortable from "sortablejs"
  import { onMount } from "svelte"

  import { pages } from "@stores/pages"
  import { theme } from "@stores/theme"
  import { getPageByUUID } from "@shared/pages"

  import Dropdown from "@components/shared/Dropdown.svelte"
  import Switch from "@components/shared/Switch.svelte"
  import Select from "@components/shared/Select.svelte"
  import Button from "@components/shared/Button.svelte"

  $: navigation = $theme.navigation || []

  let listElement
  let sortable

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
    
    setKey("pages", order)

    console.log(navigation.pages)

    setTimeout(() => sortable.sort(sortableOrder, false))
  }

  function setKey(key, value) {
    navigation[key] = value

    $theme.navigation = navigation
  }

  function addPage(type, uuid) {
    setKey("pages", [...navigation.pages || [], { type, uuid }])

    createSortable(listElement)
  }

  function removePage(uuid) {
    setKey("pages", navigation.pages.filter(p => p.uuid != uuid))
  }
</script>



<h2>Navigation Settings</h2>

<Select
  on:change={ event => setKey("style", event.detail.value) }
  key="background_color"
  emit=true
  defaultValue={ navigation.style }
  values={{
    "Default": "",
    "Floating": "floating"
  }}>
  Style
</Select>

<Select
  on:change={ event => setKey("background", event.detail.value) }
  key="background_color"
  emit=true
  defaultValue={ navigation.background }
  values={{
    "Default": "",
    "Transparent": "transparent",
    "Primary": "primary",
    "Secondary": "secondary",
    "Gradient": "gradient"
  }}>
  Background
</Select>

<div class="form-label mt-1/4 mb-1/4">Logo position</div>

<div class="button-group">
  <Button
    key="layout"
    value=""
    emit="true"
    valueForEmit={ navigation.layout }
    on:change={ event => setKey("layout", event.detail.value) }>  
    Left
  </Button>

  <Button
    key="layout"
    value="logo-centered"
    emit="true"
    valueForEmit={ navigation.layout }
    on:change={ event => setKey("layout", event.detail.value) }>
    Center
  </Button>
</div>

{ #if $theme.shadow_type > 0 && $theme.navigation.background != "transparent" }
  <Switch
    emit=true
    key="shadow"
    defaultValue={ navigation.shadow || false }
    on:change={ event => setKey("shadow", event.detail.checked) }>
    Include shadow
  </Switch>
{ /if }

<Switch
  emit=true
  key="full_width"
  defaultValue={ navigation.full_width || false }
  on:change={ event => setKey("full_width", event.detail.checked) }>
  Full width
</Switch>

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
          { getPageByUUID(page.uuid).title }

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

<Dropdown direction=up closeOnClick={ true }>
  <button class="button button--dark w-100 mt-1/4" slot="label">+ Add page to navigation</button>

  { #if navigation.pages.length > 4 }
    <div class="warning"><strong>Heads up! You've already added 5 main pages to your navigation.</strong> You can add more if you like, but you should try to keep it simple and compact. Try to use Dropdowns where possible.</div>
  { /if }

  <em>Select a page to add to the main navigation. You can re-position it later.</em>

  <!-- Filter pages already in the navigation -->
  { #each $pages.filter(p => !navigation.pages.some(n => n.uuid == p.uuid)) as page }
    <div class="dropdown__item" on:click={ () => addPage("internal", page.uuid) }>{ page.title }</div>
  { /each }
</Dropdown>



<style lang="scss">
  em {
    display: block;
    font-size: .85rem;
    margin-bottom: .5rem;
  }

  .dropdown__item {
    display: block;
    margin: 0 -.75rem;
    padding: .5rem .75rem;
    cursor: pointer;

    &:hover,
    &:active {
      background: var(--bg-dark);
      color: white;
    }
  }

  .list {
    counter-reset: pages-list;
  }

  .page {
    position: relative;
    padding: .5rem .75rem;
    margin-bottom: 4px;
    border-radius: .5rem;
    background: var(--content-bg);
    box-shadow: 0 0 0 4px var(--body-bg);
    counter-increment: pages-list;
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
