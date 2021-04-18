<script>
  import { onMount } from "svelte"

  import RailsFetch from "../../../shared/railsFetch.js"
  import { pages, page, currentTab } from "../../../stores/data.js"

  import ShowPage from "./Show.svelte"
  import PageSelect from "./_PageSelect.svelte"
  import SaveButton from "./_SaveButton.svelte"
  import SectionsList from "../../sections/settings/List.svelte"
  import SectionSettings from "../../sections/Settings.svelte"
  import ThemeSettings from "../../theme/Settings.svelte"
  import Theme from "../../theme/Base.svelte"

  export let params = {}

  onMount(getPages)

  $: getCurrentPage(params.uuid)
  $: console.log($page)

  function setTab(tab) {
    $currentTab = tab || event.detail.tab
  }

  function getPages() {
    new RailsFetch("/pages", {
      project_id: 1
    }).post()
    .then(data => $pages = JSON.parse(data))
    .then(() => getCurrentPage())
  }

  function getCurrentPage() {
    new RailsFetch("/page", {
      project_id: 1,
      uuid: params.uuid
    }).post()
    .then(data => $page = JSON.parse(data))
  }
</script>



{ #if $page }
  <div class="board">
    <aside class="sidebar">
      <div class="tabs button-group" class:tabs--three={ $currentTab == "section" }>
        <button on:click={ () => setTab("theme") } class="button button--light" class:active={ $currentTab == "theme" }>Theme</button>
        <button on:click={ () => setTab("sections") } class="button button--light" class:active={ $currentTab == "sections" }>Sections</button>

        { #if $currentTab == "section" }
          <button on:click={ () => setTab("section") } class="button button--light" class:active={ $currentTab == "section" }>Edit</button>
        { /if }
      </div>

      { #if $currentTab == "theme" }
        <ThemeSettings />
      { :else if $currentTab == "sections" }
        <SectionsList on:setTab={ setTab } />
      { :else if $currentTab == "section" }
        <SectionSettings />
      { /if }
    </aside>

    <div class="content">
      <div class="content__actions">
        <PageSelect />

        <SaveButton />
      </div>

      <div class="overflow">
        <div class="block">
          <Theme>
            <ShowPage />
          </Theme>
        </div>
      </div>
    </div>
  </div>
{ :else }
  <em>Loading pages</em>
{ /if }



<style lang="scss">
  .board {
    display: grid;
    grid-template-columns: 300px auto;
    grid-gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .sidebar {
    :global(h2) {
      margin-top: 0;
    }
  }

  .content {
    .block {
      padding: 0;
      min-height: 600px;
    }
  }

  .content__actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: .75rem;
  }

  .overflow {
    overflow: hidden;
    border-radius: 1rem;
  }

  .tabs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: .15rem;
    margin-bottom: 1.5rem;

    &--three {
      grid-template-columns: repeat(3, 1fr);
    }

    .button {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>
