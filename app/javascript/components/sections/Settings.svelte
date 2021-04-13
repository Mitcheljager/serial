<script>  
  import { page, currentSectionIndex } from "../../stores/data.js"

  import Button from "../shared/Button.svelte"
  import Range from "../shared/Range.svelte"
  import ElementsList from "../elements/settings/List.svelte"

  $: section = $page.sections[$currentSectionIndex]
</script>



<h3>Section - { section.name }</h3>

<Range
  key="spacing"
  min=0 max=4 defaultValue=0>
  Section Spacing
</Range>

<div>Background</div>

<div class="button-group">
  <Button key="background_color" value="">None</Button>
  <Button key="background_color" value="red">Red</Button>
  <Button key="background_color" value="blue">Blue</Button>
</div>

<h3>Elements</h3>

<ElementsList />



<style lang="scss">
  
</style>
