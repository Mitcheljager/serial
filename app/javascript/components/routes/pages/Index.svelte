<script>
  import { link } from "svelte-spa-router"

  import { pages, currentTab } from "../../../stores/data.js"

  import Dropdown from "../../shared/Dropdown.svelte"
  import Page from "./_Page.svelte"
  import ShowPage from "./Show.svelte"
  import SectionsList from "../../sections/settings/SectionsList.svelte"
  import SectionSettings from "../../sections/Settings.svelte"
  import ThemeSettings from "../../theme/Settings.svelte"
  import Theme from "../../theme/Base.svelte"

  export let params = {}

  $: currentPage = $pages.filter(page => page.id == params.id)[0] || $pages[0]

  function setTab(tab) {
    $currentTab = tab || event.detail.tab
  }
</script>



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
      Page:

      <div class="page-select">
        <Dropdown>
          <div slot="label">
            { currentPage.title }
          </div>
        
          { #each $pages as page }
            <Page { page } />
          { /each }
        </Dropdown>
      </div>

      <a href="/new/page" class="button button--primary button--small" use:link>+</a>
    </div>

    { #if !currentPage }
      <em>Select a page to start editing...</em>
    { :else }
      <div class="overflow">
        <div class="block">
          <Theme>
            <ShowPage />
          </Theme>
        </div>
      </div>
    { /if }
  </div>
</div>



<style lang="scss">
  .board {
    display: grid;
    grid-template-columns: 300px auto;
    grid-gap: 1.5rem;
    margin-top: 1.5rem;
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
    padding-bottom: 5rem;
    border-radius: 1rem;
  }

  .page-select {
    margin: 0 .75rem;
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
