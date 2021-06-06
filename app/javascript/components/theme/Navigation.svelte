<script>
  import { currentTab } from "../../stores/data.js"
  import { theme } from "../../stores/theme.js"
  import { getThemeKey } from "../../shared/key.js"

  import EditableButton from "../shared/EditableButton.svelte"

  $: navigation = getThemeKey("navigation", $theme) || "default"
  $: background = getThemeKey("navigation_background", $theme) || "default"
</script>

{ #if navigation == "floating" }
  <div class="push"></div>
{ /if }

<nav
  class="navigation navigation--{ navigation } navigation--{ background }"
  on:click={ () => { $currentTab = "navigation" } }>

  <div class="wrapper">
    <a href="/" class="logo">Navigation</a>

    <div class="navigation__content">
      { #each ["Home", "Test", "Whatever"] as item }
        <a href="://" class="navigation__item">{ item }</a>
      { /each }
    </div>

    <div class="navigation__button">
      <EditableButton element={ { properties: "" } } />
    </div>
  </div>
</nav>



<style lang="scss">
  .navigation {
    padding: calc(.25rem + (.25rem * var(--margin-multiplier))) 0;
    background: var(--palette-content);
    color: var(--palette-font);

    &--floating {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: var(--max-width);
      margin: calc(.25rem + (.25rem * var(--margin-multiplier))) auto;
      border-radius: var(--border-radius);
      z-index: 10;
    }

    &--primary {
      background: var(--primary-color);
      color: var(--primary-color-text-offset);
    }

    &--secondary {
      background: var(--secondary-color);
      color: var(--secondary-color-text-offset);
    }

    &--gradient {
      background: var(--gradient);
      color: var(--primary-color-text-offset);
    }

    &--transparent {
      background: transparent;
      color: var(--primary-color-text-offset);
    }
  }

  .logo {
    margin-right: 1.5rem;
    color: var(--palette-font-heading);
    text-decoration: none;
    font-weight: bold;
  }

  .wrapper {
    display: flex;
    align-items: center;
  }

  .navigation__content {
    display: flex;
    padding: calc(.25rem + (.15rem * var(--margin-multiplier))) 0;
  }

  .navigation__item {
    display: block;
    margin: 0 1rem 0 0;
    color: currentColor;
    text-decoration: none;
    font-weight: bold;

    &:hover,
    &:active {
      filter: brightness(1.2);
      box-shadow: 0 2px 0 currentColor;
    }
  }

  .navigation__button {
    margin-left: auto;
  }

  .push {
    height: .1px;
  }
</style>
