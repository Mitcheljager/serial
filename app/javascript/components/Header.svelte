<script>
  import active from "svelte-spa-router/active"
  import { link, location } from "svelte-spa-router"

  import ProjectSelect from "./ProjectSelect.svelte"
  import IconBell from "./icons/Bell.svelte"
  import IconList from "./icons/List.svelte"
  import IconHome from "./icons/Home.svelte"
</script>

<header class="header">
  <ProjectSelect />

  <div class="header__navigation">
    <a class="header__item" use:active={{ path: "/", className: "header__item--active" }} href="/" use:link>
      <IconHome active={ $location == "/" } />
      <span>Home</span>
    </a>

    <a class="header__item" use:active={{ className: "header__item--active" }} href="/pages" use:link>
      <IconList active={ $location == "/pages" } />
      <span>Pages</span>
    </a>
  </div>

  <a class="header__notifications" href="#/notifications">
    <IconBell active={ $location == "/notifications" } />
    <div class="bubble">2</div>
  </a>
</header>


<style lang="scss">
  .header {
    position: fixed;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    top: 0;
    left: 50%;
    width: 100%;
    height: 60px;
    padding: 0 1.5rem;
    background: var(--content-bg);
    transform: translateX(-50%);
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

  .bubble {
    position: absolute;
    top: -.5em;
    right: -.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 1.5em;
    width: 1.5em;
    padding: .25rem;
    margin-left: auto;
    background: linear-gradient(105deg, var(--secondary) 0%, var(--primary) 100%);
    box-shadow: 0 0 0 3px var(--content-bg);
    color: white;
    line-height: 1em;
    font-size: 11px;
    text-decoration: none;
    font-weight: bold;
    z-index: 5;
    transition: transform 100ms;

    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(105deg, var(--secondary) 0%, var(--primary) 100%);
      filter: blur(10px);
      opacity: 1;
      z-index: -1;
    }
  }

  .header__notifications {
    position: relative;
    margin-left: auto;

    &:hover,
    &:active {
      .bubble {
        transform: translateY(-3px);
      }
    }
  }
</style>
