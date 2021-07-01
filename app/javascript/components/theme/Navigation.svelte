<script>
  import { link } from "svelte-spa-router"

  import { getPageByUUID } from "@shared/pages"
  import { currentTab } from "@stores/data"
  import { theme } from "@stores/theme"
  import { editMode } from "@stores/user"

  import EditableButton from "@components/shared/EditableButton.svelte"
  import EditableImage from "@components/shared/EditableImage.svelte"

  let element
  
  $: navigation = $theme.navigation || {}
</script>



{ #if navigation.style == "floating" }
  <div class="push"></div>
{ /if }

<nav
  bind:this={ element }
  class="navigation navigation--{ navigation.style } navigation--{ navigation.background }"
  class:navigation--with-shadow={ navigation.shadow && $theme.navigation.background != "transparent" }
  class:navigation--full-width={ navigation.full_width }
  on:click={ () => { if ($editMode) $currentTab = "navigation" } }> 

  <div class:wrapper={ !navigation.full_width } class="container">
    <div class="logo" style="--width: { $theme.logo.variant.attachment.variation.resize_to_limit }">
      <EditableImage key="logo" width="150" height="60" />
    </div>

    <div class="navigation__content">
      { #if navigation.pages && navigation.pages.length }
        { #each navigation.pages as page }
          { #if $editMode }
            <a href="/pages/{ page }" use:link class="navigation__item">{ getPageByUUID(page).title }</a>
          { :else }
            <a href="/1/pages/{ page }" class="navigation__item">{ getPageByUUID(page).title }</a>
          { /if }
        { /each }
      { /if }
    </div>

    <div class="navigation__button">
      <EditableButton key="navigation_button" />
    </div>
  </div>
</nav>



<style lang="scss">
  .navigation {
    padding: calc(.25rem + (.25rem * var(--margin-multiplier))) 0;
    background: var(--palette-content);
    color: var(--palette-font);
    z-index: 10;

    &--floating {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: var(--max-width);
      margin: 1.5rem auto;
      border-radius: var(--border-radius);
    }

    &--full-width {
      width: 100%;
      max-width: 100%;
      padding-left: 1.5rem;
      padding-right: 1.5rem;

      &.navigation--floating {
        max-width: calc(100% - 3rem);
        left: 1.5rem;
        transform: none;
      }
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
      margin-top: 0;

      &.navigation--floating {
        padding-left: 0;
        padding-right: 0;
      }
    }

    &--with-shadow {
      box-shadow: var(--shadow-type);
    }
  }

  .logo {
    margin-right: 3rem;
    text-decoration: none;
    height: 60px;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .navigation__content {
    display: flex;
    padding: calc(.25rem + (.15rem * var(--margin-multiplier))) 0;
  }

  .navigation__item {
    display: block;
    margin: 0 1.5rem 0 0;
    color: currentColor;
    text-decoration: none;
    font-weight: bold;
    white-space: nowrap;

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
