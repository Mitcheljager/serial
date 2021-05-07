<script>
  import Offset from "../../shared/Range.svelte"

  export let element
  export let index
</script>

<Offset { element } { index }
  key="size"
  responsive=true
  min=1 max=6 step=1 defaultValue=3>
  Text size
</Offset>
