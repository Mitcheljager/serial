<script>  
  import { page, currentSectionIndex } from "../../stores/data.js"

  import Button from "../shared/Button.svelte"
  import Range from "../shared/Range.svelte"
  import ElementsList from "../elements/settings/List.svelte"
  import ShapePicker from "../shared/ShapePicker.svelte"
  import EditableImage from "../shared/EditableImage.svelte"
  import Select from "../shared/Select.svelte"

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
  <Button key="background_type" value="">None</Button>
  <Button key="background_type" value="color">Color</Button>
  <Button key="background_type" value="image">Image</Button>
</div>

{ #if section.properties.background_type == "color" }
  <Select
    type="section"
    key="background_color"
    values={{
      "Default": "palette-content",
      "Primary": "primary-color",
      "Secondary": "secondary-color"
    }}>
    Color
  </Select>
{ /if }

{ #if section.properties.background_type == "image" }
  <div class="clickable-label mt-1/8 mb-1/4">
    <EditableImage { section } key="background_image" width="1920" height="800" />
  </div>
{ /if }

{ #if section.properties.background_type }
  <div class="form-label mt-1/8">Shape</div>

  <ShapePicker key="shape_top">Top</ShapePicker>
  <ShapePicker key="shape_bottom" flipped=true>Bottom</ShapePicker>
{ /if }

<h3 class="mt-1/1">Elements</h3>

<ElementsList />



<style lang="scss">

</style>
