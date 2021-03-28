<script>
  import { pages } from "../../stores/data.js"

  import Page from "./pages/_Page.svelte"
</script>

<div class="title">
  <h4>Company name</h4>
  <h1>Project name</h1>
</div>

<div class="columns">
  <div class="block">
    <div class="block__header">
      <h3>Pages</h3>

      <a href="#/posts/new" class="button button--primary button--small">+ New</a>
    </div>

    <div>
      { #each $pages as page }
        <Page { page } />
      { /each }
    </div>

    <div class="push-down"></div>

    <a href="#/pages" class="button">All pages</a>
  </div>
</div>

<style lang="scss">
  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 2rem;
  }

  .block {
    display: flex;
    flex-direction: column;
  }

  .push-down {
    padding-top: .75rem;
    margin-top: auto;
  }

  .activity-button {
    display: flex;
    justify-content: center;
    width: 20rem;
    margin-top: 4px;
  }

  h3 {
    margin: 0 0 1rem;
  }
</style>
