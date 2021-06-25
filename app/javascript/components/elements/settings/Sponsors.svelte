<script>
  import Range from "../../shared/Range.svelte"
  import Switch from "../../shared/Switch.svelte"

  export let element
</script>



<Switch { element }
  key="full_width">
  Full page width
</Switch>

<Range { element }
  key="count"
  min=1 max=20 step=1 defaultValue=3>
  Number of sponsors
</Range>

<Range { element }
  key="size"
  min=1 max=4 step=1 defaultValue=1>
  Size per image

  <span slot="help">Note: You may need to re-upload images after resizing</span>
</Range>
