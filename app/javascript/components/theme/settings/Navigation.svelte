<script>
  import Sortable from "sortablejs"
  import { onMount } from "svelte"

  import { pages } from "@stores/pages"
  import { theme } from "@stores/theme"
  import { getPageByUUID } from "@shared/pages"

  import Dropdown from "@components/shared/Dropdown.svelte"
  import Switch from "@components/shared/Switch.svelte"

  $: navigation = $theme.navigation || {}

  let listElement
  let sortable

  onMount(createSortable)

  function createSortable() {
    sortable = new Sortable(listElement, {
      handle: ".page",
      animation: 100,
      store: {
        set: updateOrder
      }
    })
  }

  function updateOrder() {
    const listItems = listElement.querySelectorAll("[data-uuid]")
    const order = Array.from(listItems).map(item => parseInt(item.dataset.uuid))
    const sortableOrder = sortable.toArray()
    
    console.log(listItems)

    setTimeout(() => sortable.sort(sortableOrder, false))
  }

  function setKey(key, value) {
    navigation[key] = value

    $theme.navigation = navigation
  }

  function addPage(uuid) {
    setKey("pages", [...navigation.pages || [], uuid])
    console.log(navigation.pages)
  }
</script>



<h2>Navigation Settings</h2>

<div class="select-group">
  <div class="form-label">Style</div>

  <select
    class="form-input"
    value={ navigation.style || "default" }
    on:change={ event => setKey("style", event.target.value) }>

    <option value="default">Default</option>
    <option value="floating">Floating</option>
  </select>
</div>

<div class="select-group mt-1/8">
  <div class="form-label">Background</div>

  <select
    class="form-input"
    value={ navigation.background || "default" }
    on:change={ event => setKey("background", event.target.value) }>

    <option value="default">Default</option>
    <option value="primary">Primary</option>
    <option value="secondary">Secondary</option>
    <option value="gradient">Gradient</option>
    <option value="transparent">Transparent</option>
  </select>
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

<div bind:this={ listElement }>
  { #if navigation.pages }
    { #each navigation.pages as page }
      <div class="page" data-uuid={ page }>{ getPageByUUID(page).title }</div>
    { /each }
  { :else }
    <em>You have not yet added any pages to your navigation</em>
  { /if }
</div>

<Dropdown>
  <button class="button button--dark w-100" slot="label">+ Add page to navigation</button>

  <em>Select a page to add to the main navigation. You can re-position it later.</em>

  { #each $pages as page }
    <div class="dropdown__item" on:click={ () => addPage(page.uuid) }>{ page.title }</div>
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
</style>
