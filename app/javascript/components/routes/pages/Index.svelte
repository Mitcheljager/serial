<script>
  import { link } from "svelte-spa-router"

  import { pages, currentSectionId } from "../../../stores/data.js"
  import { theme } from "../../../stores/theme.js"

  import Dropdown from "../../Dropdown.svelte"
  import Page from "./_Page.svelte"
  import ShowPage from "./Show.svelte"
  import SectionSettings from "../../sections/Settings.svelte"
  import ThemeSettings from "../../theme/Settings.svelte"

  export let params = {}

  $: current_page = $pages.filter(page => page.id == params.id)[0] || $pages[0]
</script>

<div class="board">
  <aside class="sidebar">
    <ThemeSettings />
    <SectionSettings />
  </aside>

  <div class="content">
    <div class="content__actions">
      Page:

      <div class="page-select">
        <Dropdown>
          <div slot="label">
            { current_page.title }
          </div>
        
          { #each $pages as page }
            <Page { page } />
          { /each }
        </Dropdown>
      </div>

      <a href="/new/page" class="button button--primary button--small" use:link>+</a>
    </div>

    { #if !current_page }
      <em>Select a page to start editing...</em>
    { :else }
      <div class="block">
        <div class="theme" style="--margin-multiplier: { $theme.margin || 1 }">
          <ShowPage />
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

  .page-select {
    margin: 0 .75rem;
  }
</style>
