<script>
  import { link } from "svelte-spa-router"

  import { pages } from "@stores/pages"

  import Page from "./pages/_Page.svelte"
</script>

<main>
  <div class="title">
    <h4>Company name</h4>
    <h1>Project name</h1>
  </div>

  <div class="columns">
    <div class="block">
      <div class="block__header">
        <h3>Pages</h3>

        <a href="/new/page" class="button button--primary button--small" use:link>+ New</a>
      </div>

      <div>
        { #if $pages }
          { #each $pages as page }
            <Page { page } />
          { /each }
        { /if }
      </div>

      <div class="push-down"></div>

      <a href="/pages" class="button" use:link>All pages</a>
    </div>
  </div>
</main>

<style lang="scss">
  main {
    max-width: var(--max-width);
    padding: 0 1.5rem;
    margin: 0 auto;
  }

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
</style>
