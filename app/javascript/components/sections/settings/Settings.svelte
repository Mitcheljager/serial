<script>  
  import { fly } from "svelte/transition"

  import { currentSectionIndex, currentTab } from "@stores/data.js"
  import { page } from "@stores/pages"

  import ShapePicker from "./ShapePicker.svelte"
  import Button from "@components/shared/Button.svelte"
  import Range from "@components/shared/Range.svelte"
  import ElementsList from "@components/elements/settings/List.svelte"
  import EditableImage from "@components/shared/EditableImage.svelte"
  import Select from "@components/shared/Select.svelte"
  import Alignment from "@components/shared/Alignment.svelte"
  import Switch from "@components/shared/Switch.svelte"

  const flyIf = (node, args) => $currentTab == "section" ? fly(node, args) : null
</script>



<div class="list">
  { #each $page.sections as section, sectionIndex (section.uuid) }
    { #if sectionIndex == $currentSectionIndex }
      <div in:fly={{ x: -150, duration: 200 }} out:flyIf={{ x: 150, duration: 200 }}>
        <h2 contenteditable spellcheck=false bind:textContent={ section.name } />

        <div class="section">
          <Range
            { section }
            key="spacing"
            min=0 max=4 defaultValue=0>
            Section Spacing
          </Range>

          <div class="form-label mb-1/4">Background</div>

          <div class="button-group">
            <Button { section } key="background_type" value="">None</Button>
            <Button { section } key="background_type" value="color">Color</Button>
            <Button { section } key="background_type" value="image">Image</Button>
          </div>

          { #if section.properties.background_type == "color" }
            <Select
              { section }
              type="section"
              key="background_color"
              values={{
                "Default": "palette-content",
                "Primary": "primary-color",
                "Secondary": "secondary-color",
                "Gradient": "gradient"
              }}>
              Color
            </Select>
          { /if }

          { #if section.properties.background_type == "image" }
            <div class="clickable-label mt-1/8 mb-1/4">
              <EditableImage { section } key="background_image" width="1920" height="800" />
            </div>

            <Alignment { section } key="background_alignment">
              Alignment
            </Alignment>
          { /if }

          { #if section.properties.background_type }
            <div class="form-label mt-1/8">Shape</div>

            <ShapePicker { section } key="shape_top">Top</ShapePicker>
            <ShapePicker { section } key="shape_bottom" flipped=true>Bottom</ShapePicker>

            <div class="mt-1/2">
              <Switch
                { section }
                key="background_block">
                Contain by page width
              </Switch>
            </div>
          { /if }
        </div>

        <h3 class="mt-1/1">Elements</h3>

        <ElementsList { section } />
      </div>
    { /if }
  { /each }
</div>



<style lang="scss">
  .list {
    display: grid;
  }

  .list > div {
    grid-area: 1/1;
  }

  .section {
    padding: 1rem;
    border-radius: .5rem;
    background: var(--content-bg);
    box-shadow: 0 0 0 4px var(--body-bg);
  }
</style>
