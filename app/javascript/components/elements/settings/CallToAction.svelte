<script>
  import Range from "../../shared/Range.svelte"
  import Switch from "../../shared/Switch.svelte"

  export let element
  export let index
</script>



<Range { element } { index }
  key="buttons_count"
  min=1 max=3 step=1 defaultValue=2>
  Number of buttons
</Range>
