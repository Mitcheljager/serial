<script>
  import Range from "@components/shared/Range.svelte"
  import Switch from "@components/shared/Switch.svelte"

  export let element
</script>



<Switch { element }
  key="enable_background">
  Include background
</Switch>

<Switch { element }
  key="enable_buttons">
  Include buttons
</Switch>

<Switch { element }
  key="enable_images">
  Include images
</Switch>

<Range { element }
  key="column_count"
  min=1 max=10 step=1 defaultValue=3>
  Number of columns
</Range>

<Range { element }
  key="column_size"
  responsive=true
  min=150 max=400 step=25 defaultValue=250>
  Size of columns
</Range>

<Range { element }
  key="column_gap"
  min=0 max=6 step=1 defaultValue=2>
  Gap between columns
  <span slot="help">Adjusting this may also affect the "Size of columns" setting.</span>
</Range>
