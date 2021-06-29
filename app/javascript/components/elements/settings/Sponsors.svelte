<script>
  import { getSectionOfElement } from "@shared/key"
  
  import Range from "@components/shared/Range.svelte"
  import Switch from "@components/shared/Switch.svelte"

  export let element

  $: section = getSectionOfElement(element)
</script>


{ #if !(section?.properties?.background_type && section?.properties?.background_block) }
  <Switch { element }
    key="full_width">
    Full page width
  </Switch>
{ /if }

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
