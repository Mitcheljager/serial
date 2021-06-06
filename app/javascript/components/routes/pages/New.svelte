<script>
  import RailsFetch from "../../../shared/railsFetch"
  import { project } from "../../../stores/project"

  let title

  function save() {
    new RailsFetch("/page/create", {
      page: { project_id: $project.id, title }
    }).post()
    .then(data => console.log(data))
  }
</script>

<h1>New page</h1>

<input bind:value={ title } placeholder="Title" />

<button on:click={ save }>Save</button>

<style lang="scss">
  
</style>
