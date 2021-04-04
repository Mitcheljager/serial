<script>
  import Range from "../../shared/Range.svelte"

  export let element
  export let index
  export let sectionIndex
</script>

<Range { element } { index } { sectionIndex }
  label="Text size"
  key="size"
  responsive=true
  min=1 max=6 step=1 defaultValue=3 />
