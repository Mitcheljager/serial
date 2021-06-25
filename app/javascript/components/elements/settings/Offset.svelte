<script>
  import Range from "../../shared/Range.svelte"

  export let element
</script>



<Range { element }
  key="size"
  min=1 max=10 step=1 defaultValue=1>
  Size
</Range>
