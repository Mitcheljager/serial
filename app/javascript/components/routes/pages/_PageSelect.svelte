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
        { #if $page }
          { $page.title }
        { :else }
          Loading...
        { /if }
      </div>
    
      <a href="/new/page" class="button button--dark" use:link><strong>+ New page</strong></a>

      <hr />

      { #each $pages as page }
        <Page { page } />
      { /each }
    </Dropdown>
  </div>
  
  { #if $page }
    <a href="/edit/page/{ $page.uuid }" class="button button--dark" use:link><strong>⚙</strong></a>
  { /if }
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

  hr {
    margin: .75rem -.75rem;
    height: 1px;
    border: 0;
    background: var(--text-color-dark);
  }

  .page-select {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .page-title {
    padding: 0 .75rem;
    max-width: 9rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover,
    &:active {
      color: white;
    }
  }

  .button {
    padding: .25rem .4rem;
    line-height: 1rem;
    font-size: 14px;
  }
</style>
