<script>
  import Range from "../../shared/Range.svelte"

  export let element
</script>



<Range { element }
  key="size"
  responsive=true
  min=1 max=6 step=1 defaultValue=3>
  Text size
</Range>
