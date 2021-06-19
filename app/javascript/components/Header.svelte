<script>
  import active from "svelte-spa-router/active"
  import { link, location } from "svelte-spa-router"

  import ProjectSelect from "./ProjectSelect.svelte"
  import Dropdown from "./shared/Dropdown.svelte"
  import IconList from "./icons/List.svelte"
  import IconHome from "./icons/Home.svelte"

  import { currentUser, settings } from "../stores/user.js"
</script>



<header class="header">
  <ProjectSelect />

  <nav class="header__navigation">
    <a class="header__item" use:active={{ path: "/", className: "header__item--active" }} href="/" use:link>
      <IconHome active={ $location == "/" } />
      <span>Home</span>
    </a>

    <a class="header__item" use:active={{ className: "header__item--active" }} href="/pages" use:link>
      <IconList active={ $location == "/pages" } />
      <span>Pages</span>
    </a>
  </nav>

  <div class="header__user">
    <Dropdown>
      <span slot="label">Logged in as <strong>{ $currentUser.username }</strong></span>

      <label>
        Show helper text
        <input type="checkbox" bind:checked={ $settings.show_help_text } />
      </label>
    </Dropdown>
  </div>
</header>



<style lang="scss">
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    top: 0;
    height: 60px;
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1.5rem;
    background: var(--content-bg);
    z-index: 20;
  }

  .header__item {
    display: inline-flex;
    align-items: flex-end;
    position: relative;
    padding: .5rem;
    color: white;
    line-height: 1em;
    text-decoration: none;
    font-weight: bold;
    text-transform: lowercase;

    &:hover,
    &:active {
      span::after {
        display: block;
      }
    }

    span {
      display: block;
      position: relative;

      &::after {
        content: "";
        display: none;
        position: absolute;
        left: calc(50% - .15rem);
        bottom: -.75rem;
        height: .35rem;
        width: .35rem;
        border-radius: 50%;
        background: white;
      }
    }

    :global(svg) {
      height: 1rem;
      margin-right: .5rem;

      :global(path) {
        fill: currentColor;
      }
    }
  }

  :global(.header .header__item--active) {
    span::after {
      display: block;
    }
  }

  .header__navigation {
    display: flex;
  }

  .header__user {
    position: relative;
    margin-left: auto;
  }
</style>
