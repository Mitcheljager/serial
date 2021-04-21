<script>  
  import { page, currentSectionIndex } from "../../stores/data.js"

  import Button from "../shared/Button.svelte"
  import Range from "../shared/Range.svelte"
  import ElementsList from "../elements/settings/List.svelte"

  $: section = $page.sections[$currentSectionIndex]
</script>



<h2 contenteditable spellcheck=false bind:textContent={ section.name } />

<Range
  key="spacing"
  min=0 max=4 defaultValue=0>
  Section Spacing
</Range>

<div class="form-label mb-1/4">Background</div>

<div class="button-group">
  <Button key="background_color" value="">None</Button>
  <Button key="background_color" value="var(--primary-color)">Primary</Button>
  <Button key="background_color" value="var(--secondary-color)">Secondary</Button>
</div>

<h3>Elements</h3>

<ElementsList />



<style lang="scss">
  
</style>
