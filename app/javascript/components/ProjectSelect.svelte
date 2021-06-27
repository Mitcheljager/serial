<script>
  import { projects, project } from "@stores/project.js"
  
  import Dropdown from "./shared/Dropdown.svelte"
</script>



<Dropdown>
  <div href="://" slot="label">
    { $project.name }
  </div>

  { #each $projects as _project }
    <a href="://" class="project">{ _project.name }</a>
  { /each }
</Dropdown>



<style lang="scss">
  .project {
    display: block;
    padding: .25rem .75rem;
    white-space: nowrap;

    &:hover,
    &:active {
      background: var(--content-bg);
    }
  }
</style>
