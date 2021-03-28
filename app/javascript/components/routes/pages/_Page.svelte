<script>
  import { link } from "svelte-spa-router"
  export let page
  export let active
</script>

<a href="/pages/{ page.id }" class="page { active ? "page--active" : "" }" use:link>
  <div>
    <div class="page__title">
      { page.title }
    </div>

    <div class="page__content">
      Test description
    </div>
  </div>
</a>

<style lang="scss">
  .page {
    display: flex;
    margin: 0 -1.5rem 0;
    padding: .5rem 1.5rem;
    color: var(--text-color);
    text-decoration: none;

    &:hover,
    &:active,
    &--active {
      background: var(--bg-dark);
      color: white;
    }
  }

  .page__title {
    margin-bottom: .25rem;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.1rem;
  }

  .page__content {
    font-size: .75rem;
  }
</style>
