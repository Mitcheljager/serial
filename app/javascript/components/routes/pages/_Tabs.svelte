<script>
  import { currentTab } from "../../../stores/data.js"

  let tabsElement
  let tabsIndicatorLeft = 0
  let tabsIndicatorWidth = 0
  
  $: if (tabsElement) setTimeout(() => { positionTabsIndicator($currentTab) })

  function setTab(tab) {
    $currentTab = tab || event.detail.tab
  }

  function positionTabsIndicator() {
    const activeTab = tabsElement.querySelector(".active")
    
    tabsIndicatorLeft = activeTab.offsetLeft
    tabsIndicatorWidth = activeTab.offsetWidth
  }
</script>



<div class="tabs button-group" bind:this={ tabsElement }>
  <div class="tabs__indicator" style="left: { tabsIndicatorLeft }px; width: { tabsIndicatorWidth }px"></div>

  <button on:click={ () => setTab("theme") } class="button button--light" class:active={ $currentTab == "theme" }>Theme</button>
  <button on:click={ () => setTab("sections") } class="button button--light" class:active={ $currentTab == "sections" }>Sections</button>

  { #if $currentTab == "section" }
    <button class="button button--light active">Edit</button>
  { /if }

  { #if $currentTab == "navigation" }
    <button class="button button--light active">Nav</button>
  { /if }
</div>



<style lang="scss">
  .tabs {
    position: relative;
    grid-column: 1 / span 2;
    margin-bottom: 0;
    background: var(--border-color);
    box-shadow: var(--shadow-medium);

    .button {
      padding-left: 1rem;
      padding-right: 1rem;
      border: 0;
      background: transparent;
    }
  }

  .tabs__indicator {
    position: absolute;
    left: 0;
    top: .25rem;
    width: 100%;
    height: calc(100% - .5rem);
    border-radius: 99px;
    background: var(--content-bg);
    transition: left 150ms, width 150ms;
  }
</style>
