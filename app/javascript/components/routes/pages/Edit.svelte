<script>
  import { link, push } from "svelte-spa-router"

  import RailsFetch from "../../../shared/railsFetch"
  import { page } from "../../../stores/data"
  import { project } from "../../../stores/project"

  function save() {
    new RailsFetch("/page/save", {
      page: { project_id: $project.id, title, uuid: id }
    }).post()
    .then(() => {
      push(`/pages/${ id }`)
    })
  }
</script>



<div class="wrapper">
  { #if $page }
    <a use:link href="/pages/{ $page.uuid }" class="button">Return</a>

    <h1>Edit "{ $page?.title }" page</h1>

    <input class="form-input form-input--large" bind:value={ $page.title } placeholder="Title" />

    <button
      class="button button--primary button--large mt-1/2"
      on:click={ save }>
      
      Save
    </button>
  { :else }
    Loading page
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
