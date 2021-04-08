<script>
  import Range from "../../shared/Range.svelte"
  import Switch from "../../shared/Switch.svelte"

  export let element
  export let index
</script>



<Switch { element } { index }
  key="enable_background">
  Include background
</Switch>

<Range { element } { index }
  key="column_count"
  min=1 max=10 step=1 defaultValue=3>
  Number of columns
</Range>

<Range { element } { index }
  key="column_size"
  responsive=true
  min=150 max=500 step=50 defaultValue=250>
  Size of columns
</Range>

<Range { element } { index }
  key="column_gap"
  min=0 max=6 step=1 defaultValue=2>
  Gap between columns
  <span slot="help">Adjusting this may also affect the "Size of columns" setting.</span>
</Range>
