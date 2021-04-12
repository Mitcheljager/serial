<script>
  import Dropdown from "./shared/Dropdown.svelte"
</script>

<Dropdown>
  <div href="://" slot="label">
    Project name
  </div>

  { #each [0] as project }
    <a href="://" class="project">Other project name</a>
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
