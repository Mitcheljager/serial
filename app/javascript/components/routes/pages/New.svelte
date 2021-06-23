<script>
  import { push } from "svelte-spa-router"
  import { v4 as uuid } from "uuid"

  import RailsFetch from "../../../shared/railsFetch"
  import { project } from "../../../stores/project"

  let title

  function save() {
    const id = uuid()

    new RailsFetch("/page/create", {
      page: { project_id: $project.id, title, uuid: id }
    }).post()
    .then(() => {
      push(`/pages/${ id }`)
    })
  }
</script>



<div class="wrapper">
  <h1>Create new page</h1>

  <input class="form-input form-input--large" bind:value={ title } placeholder="Title" />

  <button
    class="button button--primary button--large mt-1/2"
    on:click={ save }>
    
    Save
  </button>
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
