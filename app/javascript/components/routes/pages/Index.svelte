<script>
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"
  import { location } from "svelte-spa-router"

  import { currentTab, currentEditable } from "@stores/data.js"

  import ShowPage from "./Show.svelte"
  import PageSelect from "./_PageSelect.svelte"
  import SaveButton from "./_SaveButton.svelte"
  import Tabs from "./_Tabs.svelte"
  import SectionsList from "@components/sections/settings/List.svelte"
  import SectionSettings from "@components/sections/settings/Settings.svelte"
  import ThemeSettings from "@components/theme/settings/Theme.svelte"
  import NavigationSettings from "@components/theme/settings/Navigation.svelte"

  import EditableButtonSettings from "./_EditableButtonSettings.svelte"
  import EditableTextSettings from "./_EditableTextSettings.svelte"
  import EditableImageSettings from "./_EditableImageSettings.svelte"

  const components = [
    { component: EditableButtonSettings, identifier: "button" },
    { component: EditableTextSettings, identifier: "text" },
    { component: EditableImageSettings, identifier: "image" }
  ]

  const sidebarComponents = [
    { component: ThemeSettings, identifier: "theme" },
    { component: SectionsList, identifier: "sections" },
    { component: SectionSettings, identifier: "section" },
    { component: NavigationSettings, identifier: "navigation" }
  ]

  export let params = {}

  let shadowElement, scrollElement, innerElement = null

  const flyIf = (node, args) => $location.includes("/pages/") ? fly(node, args) : null

  $: if (scrollElement) scrollElement.scroll(0, 0)

  function setShadow() {
    const bottomOffset = innerElement.getBoundingClientRect().bottom - window.innerHeight

    shadowElement.style.height = bottomOffset < 0 ? scrollElement.offsetHeight + bottomOffset + "px" : "100%"
  }
</script>



<svelte:window on:resize={ setShadow } />

<div class="board">
  <aside class="sidebar">
    <div class="sidebar__navigation">
      <PageSelect />
      <SaveButton />

      <Tabs />
    </div>

    <div class="sidebar__content">
      { #each sidebarComponents as item }
        { #if $currentTab == item.identifier }
          <div class="sidebar__tab" in:fly={{ x: -150, duration: 200 }} out:flyIf={{ x: 150, duration: 200 }}>
            <svelte:component this={ item.component } />
          </div>
        { /if }
      { /each }
    </div>
  </aside>

  <div class="content" in:fly={{ y: 100, duration: 500 }}>
    <div class="content__scroll" on:scroll={ setShadow } bind:this={ scrollElement } data-role="theme-container">        
      <div class="content__inner" bind:this={ innerElement }>
        <ShowPage { params } />
      </div>
    </div>

    <div class="content__shadow" bind:this={ shadowElement } />

    { #if $currentEditable }
      <svelte:component this={ components.filter(i => i.identifier == $currentEditable.type)[0].component } />
    { /if }
  </div>
</div>



<style lang="scss">
  .board {
    display: grid;
    grid-template-columns: calc(300px + 1.5rem) auto;
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .sidebar {
    display: grid;
    grid-template-rows: 80px auto;
    height: calc(100vh - 60px);
    padding: 1.5rem 0 0 0;

    :global(h2) {
      margin-top: 1.5rem;
    }
  }

  .sidebar__content {
    display: grid;
    padding: 1.5rem 1rem 0 1.5rem;
    margin: 0 .5rem 0 0;
    overflow-y: auto;
    overflow-y: overlay;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;

    &:hover {
      scrollbar-color: var(--border-color) transparent;

      &::-webkit-scrollbar-thumb {
        background-color: var(--border-color);
      }
    }

    &::-webkit-scrollbar {
      width: .5em;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 99px;
    }
  }

  .sidebar__tab {
    grid-area: 1/1;
    padding-bottom: 20rem;
  }

  .sidebar__navigation {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: .5rem;
    align-items: flex-start;
    height: 5rem;
    padding: 0 1.5rem 0;
    z-index: 10;
  }

  .content {
    position: relative;
    display: grid;
    grid-gap: .75rem;
    height: calc(100vh - 60px);
    padding: 1.5rem 1.5rem 0 0;
  }

  .content__scroll {
    position: relative;
    height: 100%;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    overflow: auto;
    overflow-y: overlay;
    scrollbar-width: none;
      
    // Filter is laggy, disabled for now
    // filter: drop-shadow(0 3px 2px rgba(0, 0, 0, .1))
		// 				drop-shadow(0 10px 5px rgba(0, 0, 0, .1))
		// 				drop-shadow(0 15px 10px rgba(0, 0, 0, .1))
		// 				drop-shadow(0 25px 15px rgba(0, 0, 0, .2))
		// 				drop-shadow(0 40px 30px rgba(0, 0, 0, .2));

    &:hover {
      scrollbar-color: var(--border-color) transparent;

      &::-webkit-scrollbar-thumb {
        background-color: var(--border-color);
      }
    }

    &::-webkit-scrollbar {
      width: .5em;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 99px;
    }
  }

  .content__inner {
    min-height: 100%;
    padding: 0;
    margin-bottom: 20rem;
    background: var(--bg-dark);
    border-radius: 1rem;
    overflow: hidden;

    :global(.theme) {
      min-height: calc(100vh - 60px);
    }
  }

  .content__shadow {
    position: absolute;
    top: 1.5rem;
    left: 0;
    height: 100%;
    width: calc(100% - 1.5rem);
    border-radius: 1rem;
    pointer-events: none;
    z-index: -1;
    box-shadow: 0 3px 2px rgba(0, 0, 0, .1),
                0 10px 5px rgba(0, 0, 0, .1),
                0 15px 10px rgba(0, 0, 0, .1),
                0 25px 15px rgba(0, 0, 0, .2),
                0 40px 30px rgba(0, 0, 0, .2);
  }
</style>
