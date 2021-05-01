<script>
  import { onMount } from "svelte"

  import RailsFetch from "../../../shared/railsFetch.js"
  import { pages, page, currentTab } from "../../../stores/data.js"

  import ShowPage from "./Show.svelte"
  import PageSelect from "./_PageSelect.svelte"
  import SaveButton from "./_SaveButton.svelte"
  import FloatingSettings from "./_FloatingSettings.svelte"
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

      <div class="sidebar__content">
        <div class="mb-1/1 mt-1/4">
          { #if $currentTab == "theme" }
            <ThemeSettings />
          { :else if $currentTab == "sections" }
            <SectionsList on:setTab={ setTab } />
          { :else if $currentTab == "section" }
            <SectionSettings />
          { /if }
        </div>
      </div>
    </aside>

    <div class="content">
      <div class="content__actions">
        <PageSelect />

        <SaveButton />
      </div>

      <div class="block-scroll" data-role="theme-container">
        <div class="block">
          <div class="overflow">
            <Theme>
              <ShowPage />
            </Theme>

            <FloatingSettings />
          </div>
        </div>
      </div>
    </div>
  </div>
{ :else }
  <em>Loading pages</em>
{ /if }



<style lang="scss">
  $actions-height: 40px;

  .board {
    display: grid;
    grid-template-columns: calc(300px + 1.5rem) auto;
    grid-gap: clamp(1.5rem, 2vw, 3rem);
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .sidebar {
    display: grid;
    grid-template-rows: $actions-height auto;
    grid-gap: 1.5rem;
    height: calc(100vh - 60px);
    padding: 1.5rem 0 0 1.5rem;

    :global(h2) {
      margin-top: 0;
    }
  }

  .sidebar__content {
    padding: 0 2px;
    overflow-y: auto;
    scrollbar-width: none;
  }

  .content {
    display: grid;
    grid-template-rows: $actions-height auto;
    grid-gap: .75rem;
    height: calc(100vh - 60px);
    padding: 1.5rem 1.5rem 0 0;

    .block-scroll {
      height: 100%;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      overflow: auto;
      scrollbar-width: none;
      box-shadow: 0 .5rem 1.5rem hsla(0, 0, 0, .25);
    }

    .block {
      min-height: 600px;
      padding: 0;
      margin-bottom: 3rem;
    }
  }

  .content__actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .overflow {
    overflow: hidden;
    border-radius: 1rem;
  }

  .tabs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: .25rem;
    margin-bottom: 0;

    &--three {
      grid-template-columns: repeat(3, 1fr);
    }

    .button {
      padding-left: 1rem;
      padding-right: 1rem;
      border: 0;
    }
  }
</style>
