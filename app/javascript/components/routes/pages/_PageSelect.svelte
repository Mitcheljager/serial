<script>  
  import { link } from "svelte-spa-router"

  import { pages, page } from "../../../stores/data.js"

  import Dropdown from "../../shared/Dropdown.svelte"
  import Page from "./_Page.svelte"
</script>


<span>
  <div class="page-select">
    <Dropdown>
      <div class="page-title" slot="label">
        { $page.title }
      </div>
    
      { #each $pages as page }
        <Page { page } />
      { /each }
    </Dropdown>
  </div>

  <a href="/new/page" class="button button--dark" use:link><strong>+</strong></a>
</span>



<style lang="scss">
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: .275rem;
    border-radius: 2rem;
    background: var(--border-color);
  }

  .page-select {
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:hover,
    &:active {
      color: white;
    }
  }

  .page-title {
    padding: 0 .75rem;
    font-weight: bold;
  }

  .button {
    padding: .25rem .5rem;
    line-height: 1rem;
    font-size: 14px;
  }
</style>
