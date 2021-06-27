<script>
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { flip } from "svelte/animate"
  
  import { page, pages, fetchPage } from "@stores/pages"
  import { project } from "@stores/project"
  import { theme } from "@stores/theme"
  import { globalError } from "@stores/error"

  import Theme from "@components/theme/Base.svelte"
  import Section from "@components/sections/Section.svelte"
  import Navigation from "@components/theme/Navigation.svelte"
  import Footer from "@components/theme/Footer.svelte"

  export let params = {}

  const [loading, error, get] = fetchPage()

  $: if (!params.page) get(params.project_id || $project.id, params.uuid)
  $: if ($error) $globalError = "Something went wrong when fetching this page"

  onMount(() => {
    if (params.page) $page = JSON.parse(params.page)
    if (params.pages) $pages = JSON.parse(params.pages)
    if (params.theme) $theme = JSON.parse(params.theme)
  })
</script>



{ #if $page }
  <Theme>
    <Navigation />

    { #if $page?.sections?.length }
      { #each $page.sections as section, index (section.uuid) }
        <div class="section" animate:flip="{{ duration: 200 }}">
          <Section { section } { index } />
        </div>
      { /each }
    { :else }
      <div class="section empty">
        <div class="wrapper">This page is empty</div>
      </div>
    { /if }

    <Footer />
  </Theme>

  { #if $loading }
    <div class="loading" transition:fade={{ duration: 150 }}>
      <div class="spinner"></div>
    </div>
  { /if }
{ /if }



<style lang="scss">
  .section {
    position: relative;
    min-width: 100%;
  }

  .empty {
    padding: 10rem 0;
    font-style: italic;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1rem 1rem 0 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  @keyframes spinner {
    from {
      width: 0;
      height: 0;
      opacity: 1;
      box-shadow: inset 0 0 0 .25rem white;
    }

    to {
      width: 100%;
      height: 100%;
      opacity: 0;
      box-shadow: inset 0 0 0 .75rem white;
    }
  }

  .spinner {
    position: relative;
    width: 10rem;
    height: 10rem;

    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      animation: spinner 1200ms cubic-bezier(0, .25, 0.75, 1) infinite forwards;
    }

    &::after {
      animation-delay: 600ms;
    }
  }
</style>
