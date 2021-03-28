<script>
  import { pages } from "../../../stores/data.js"

  import Page from "./_Page.svelte"

  export let params = {}

  $: current_page = $pages.filter(page => page.id == params.id)[0]
</script>

<div class="board">
  <aside class="sidebar">
    <h1>Pages</h1>

    { #each $pages as page }
      <Page page={ page } active={ current_page && page.id == current_page.id } />
    { /each }
  </aside>

  <div class="content">
    { #if !current_page }
      <em>Select a page to start editing...</em>
    { :else }
      <div class="block">
        { current_page.title }
      </div>
    { /if }
  </div>
</div>

<style lang="scss">
  .board {
    display: grid;
    grid-template-columns: 300px auto;
    margin-top: 1.5rem;
  }

  .sidebar {
    h1 {
      padding-top: 0;
    }
  }

  .content {
    .block {
      padding: 0;
      min-height: 600px;
    }
  }
</style>
