<script>
  import EditableText from "./EditableText.svelte"

  export let element
</script>

<h2 contenteditable><EditableText { element } key="content" defaultValue="Default" } /></h2>

<style>
  h2 {
    margin: 0;
    padding: 2rem 0 1rem;
  }
</style>
