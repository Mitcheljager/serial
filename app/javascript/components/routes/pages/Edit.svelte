<script>
  import { link, push } from "svelte-spa-router"

  import RailsFetch from "@shared/railsFetch"
  import { fetchPage, fetchPages, page } from "@stores/pages"
  import { project } from "@stores/project"

  export let params = {}

  const [loading, error, get] = fetchPage()

  $: if (!params.page) get(params.project_id || $project.id, params.uuid)

  function save() {
    new RailsFetch("/page/save", {
      project_id: $project.id,
      data: { title: $page.title, uuid: $page.uuid }
    }).post()
    .then(() => {
      fetchPages()

      push(`/pages/${ $page.uuid }`)
    })
  }
</script>



<div class="wrapper">
  { #if $loading }
    Loading page
  { :else if $error}
    An error occured
  { :else }
    <a use:link href="/pages/{ $page.uuid }" class="button">Return</a>

    <h1>Edit "{ $page?.title }" page</h1>

    <input class="form-input form-input--large" bind:value={ $page.title } placeholder="Title" />

    <button
      class="button button--primary button--large mt-1/2"
      on:click={ save }>
      
      Save
    </button>
  { /if }
</div>



<style lang="scss">
  .wrapper {
    max-width: 640px;
    margin: 0 auto;
  }

  h1 {
    padding-bottom: 1.5rem;
  }
</style>
