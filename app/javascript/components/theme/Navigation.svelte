<script>
  import { link } from "svelte-spa-router"
  import { flip } from "svelte/animate"

  import { getPageByUUID } from "@shared/pages"
  import { currentTab } from "@stores/data"
  import { theme } from "@stores/theme"
  import { editMode } from "@stores/user"

  import IconYoutube from "@components/icons/Youtube.svelte"
  import IconTwitter from "@components/icons/Twitter.svelte"
  import IconDiscord from "@components/icons/Discord.svelte"
  import EditableButton from "@components/shared/EditableButton.svelte"
  import EditableImage from "@components/shared/EditableImage.svelte"

  let element
  let active = false
  
  $: navigation = $theme.navigation || []
</script>



{ #if navigation.style == "floating" }
  <div class="push"></div>
{ /if }

<nav
  bind:this={ element }
  class="navigation navigation--{ navigation.style } navigation--{ navigation.background }"
  class:navigation--with-shadow={ navigation.shadow && $theme.navigation.background != "transparent" }
  class:navigation--full-width={ navigation.full_width }
  class:navigation--in-editor={ $editMode }
  on:click={ () => { if ($editMode) $currentTab = "navigation" } }> 

  <div
    class="navigation__container"
    class:navigation__container--active={ active }
    class:navigation__container--logo-centered={ navigation.layout == "logo-centered" }
    class:wrapper={ !navigation.full_width }>

    <div class="navigation__logo" style="--width: { $theme.logo?.variant.attachment.variation.resize_to_limit }">
      <EditableImage key="logo" width="140" height="60" />
    </div>

    <div class="navigation__content">
      { #if navigation.pages && navigation.pages.length }
        { #each navigation.pages as page (page.uuid) }
          <span animate:flip={{ duration: 200 }}>
            { #if page.type == "internal" }
              <a href="{ $editMode ? "" : "/1" }/pages/{ page.uuid }" use:link class="navigation__item">{ getPageByUUID(page.uuid).title }</a>
            { :else if page.type == "external" }
              <a href={ page.url || "/" } target="_blank" class="navigation__item">{ page.title }</a>
            { /if }
          </span>
        { /each }
      { /if }
    </div>

    <div class="navigation__actions">
      { #if navigation.include_socials }
        <div class="navigation__socials">
          { #if navigation.twitter }<a href={ navigation.twitter } target="_blank"><IconTwitter /></a>{ /if }
          { #if navigation.youtube }<a href={ navigation.youtube } target="_blank"><IconYoutube /></a>{ /if }
          { #if navigation.discord }<a href={ navigation.discord } target="_blank"><IconDiscord /></a>{ /if }
        </div>
      { /if }

      { #if navigation.include_button == undefined ? true : navigation.include_button }
        <EditableButton key="navigation_button" />
      { /if }
    </div>
  </div>

  <div class="navigation__mobile-trigger" on:click={ () => { if (!$editMode) active = !active } }>☰</div>
</nav>



<style lang="scss">
  @mixin media-query {
    .navigation--in-editor &,
    &.navigation--in-editor {
      // 1200px + 3rem
      @media (min-width: 1248px) {
        @content;
      }
    }

    .navigation:not(.navigation--in-editor) &,
    &[class*="navigation--"]:not(.navigation--in-editor) {
      @media (min-width: 900px) {
        @content;
      }
    }
  }

  .navigation {
    position: relative;
    background: var(--palette-content);
    color: var(--palette-font);
    z-index: 10;

    @include media-query {
      padding: calc(.15rem + (.15rem * var(--margin-multiplier))) 0;
    }

    :global(.button) {
      margin-left: 1rem;
    }

    &--floating {
      margin: 1.5rem auto;
      
      @include media-query {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: var(--max-width);
        border-radius: var(--border-radius);
      }
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

    &--body {
      background: var(--palette-body);
    }

    &--light {
      background: var(--palette-border);
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

    &--in-editor {
      &:hover::after {
        content: "";
        display: block;
        position: absolute;
        top: .25rem;
        left: .25rem;
        width: calc(100% - .5rem);
        height: calc(100% - .5rem);
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.15);
        border-radius: .5rem;
        pointer-events: none;
        z-index: 10;
      }
    }
  }

  @keyframes show-navigation {
    from {
      transform: scale(1.25);
      opacity: 0;
    }
  }

  .navigation__container {
    display: none;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    overflow-y: auto;
    background: var(--palette-content);
    z-index: 100;
    animation: show-navigation 100ms;

    @include media-query {
      position: initial;
      display: grid;
      grid-template: "logo content actions";
      grid-auto-columns: min-content max-content auto;
      grid-gap: 3rem;
      justify-content: initial;
      background: transparent;
      align-items: center;
      height: auto;
      animation: none;
    }

    &--active {
      display: flex;

      @include media-query {
        display: grid;
      }
    }

    &--logo-centered {
      @include media-query {
        grid-template: "content logo actions";
        grid-auto-columns: calc(50% - 70px - 3rem) 140px calc(50% - 70px - 3rem);
      }
    }
  }

  .navigation__content {
    grid-area: content;
    display: block;
    margin-top: 1.5rem;

    @include media-query {
      display: flex;
      width: 100%;
      margin-top: 0;
    }
  }

  .navigation__item {
    display: block;
    margin: .25rem 0;
    text-align: center;
    color: currentColor;
    text-decoration: none;
    font-weight: bold;
    white-space: nowrap;
    font-size: 1.15rem;

    &:hover,
    &:active {
      filter: brightness(1.2);
      box-shadow: 0 2px 0 currentColor;
    }

    @include media-query {
      margin: 0 1.5rem 0 0;
      text-align: left;
      font-size: 1rem;
    }
  }

  .navigation__actions {
    grid-area: actions;
    margin-top: 1.5rem;

    @include media-query {
      display: flex;
      align-items: center;
      margin-top: 0;
      margin-left: auto;
    }

    :global(a) {
      white-space: nowrap;
    }
  }

  .navigation__logo {
    grid-area: logo;
    text-decoration: none;
    height: 60px;

    :global(img) {
      max-height: 60px;
      width: auto;
    }

    .navigation__container--logo-centered & {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .navigation__mobile-trigger {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    z-index: 100;
    cursor: pointer;

    @include media-query {
      display: none;
    }

    .navigation--in-editor & {
      position: absolute;
      top: 1rem;
      right: 0;
    }
  }

  .navigation__socials {
    display: flex;
    justify-content: center;
    margin-bottom: .75rem;

    @include media-query {
      margin-bottom: 0;
    }

    :global(a) {
      display: block;
      margin-right: .75rem;
      color: currentColor;

      &:hover,
      &:active {
        box-shadow: 0 2px 0 currentColor;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    :global(svg) {
      display: block;
      height: 1.25rem;
      width: auto;
    }
  }

  .push {
    height: .1px;
  }
</style>
