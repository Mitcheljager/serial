<script>
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"
  import { location } from "svelte-spa-router"

  import RailsFetch from "../../../shared/railsFetch.js"
  import { page, currentTab, currentEditable, currentSectionIndex } from "../../../stores/data.js"
  import { project } from "../../../stores/project.js"

  import ShowPage from "./Show.svelte"
  import PageSelect from "./_PageSelect.svelte"
  import SaveButton from "./_SaveButton.svelte"
  import Tabs from "./_Tabs.svelte"
  import SectionsList from "../../sections/settings/List.svelte"
  import SectionSettings from "../../sections/settings/Settings.svelte"
  import ThemeSettings from "../../theme/settings/Theme.svelte"
  import Theme from "../../theme/Base.svelte"
  import NavigationSettings from "../../theme/settings/Navigation.svelte"

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

  $: getCurrentPage(params.uuid)
  $: console.log($page)
  
  onMount(getCurrentPage)  

  function getCurrentPage() {
    new RailsFetch("/page", {
      project_id: $project.id,
      uuid: params.uuid
    }).post()
    .then(data => {
      $currentSectionIndex = 0
      $page = JSON.parse(data)
    })
  }

  const flyIf = (node, args) => $location.includes("/pages/") ? fly(node, args) : null
</script>



{ #if $page }
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
            <div in:fly={{ x: -150, duration: 200 }} out:flyIf={{ x: 150, duration: 200 }}>
              <svelte:component this={ item.component } />
            </div>
          { /if }
        { /each }
      </div>
    </aside>

    <div class="content">
      <div class="block-scroll" data-role="theme-container">
        <div class="block">
          <div class="overflow">
            <Theme>
              <ShowPage />
            </Theme>

            { #if $currentEditable }
              <svelte:component this={ components.filter(i => i.identifier == $currentEditable.type)[0].component } />
            { /if }
          </div>
        </div>
      </div>
    </div>
  </div>
{ :else }
  <em>Loading pages</em>
{ /if }



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
    padding: 1.5rem 1.5rem 0;
    overflow-y: auto;
    scrollbar-width: none;

    > div {
      grid-area: 1/1;
    }
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
    display: grid;
    grid-gap: .75rem;
    height: calc(100vh - 60px);
    padding: 1.5rem 1.5rem 0 0;

    .block-scroll {
      height: 100%;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      overflow: auto;
      scrollbar-width: none;
      box-shadow: 0 .5rem 1.5rem hsla(0, 0, 0, .25);
    }

    .block {
      min-height: 600px;
      padding: 0;
      margin-bottom: 3rem;
      box-shadow: var(--shadow-big);
    }
  }

  .overflow {
    overflow: hidden;
    border-radius: 1rem;
  }
</style>
