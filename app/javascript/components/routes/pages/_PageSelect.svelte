<script>  
  import { link } from "svelte-spa-router"

  import { pages, page } from "../../../stores/data.js"

  import Dropdown from "../../shared/Dropdown.svelte"
  import Page from "./_Page.svelte"
</script>


Page:

<div class="page-select">
  <Dropdown>
    <div slot="label">
      { $page.title }
    </div>
  
    { #each $pages as page }
      <Page { page } />
    { /each }
  </Dropdown>
</div>

<a href="/new/page" class="button button--light button--small" use:link>+</a>



<style lang="scss">
  .page-select {
    margin: 0 .75rem;
  }
</style>
