<script>  
  import Button from "../shared/Button.svelte"
  import Range from "../shared/Range.svelte"
  import AddElement from "./settings/AddElement.svelte"
  import ElementsList from "./settings/ElementsList.svelte"
</script>



<div class="section">
  <div class="section__header">
    <h4>Section layout</h4>
  </div>

  <div class="section__content">
    <Range
      key="spacing"
      min=0 max=4 defaultValue=0>
      Section Spacing
    </Range>
      
    <div class="button-group">
      <Button key="background_color" value="">None</Button>
      <Button key="background_color" value="red">Red</Button>
      <Button key="background_color" value="blue">Blue</Button>
    </div>
  </div>
</div>

<h3>Elements</h3>

<ElementsList />
<AddElement />



<style lang="scss">
  
</style>
