<script>
  import Range from "@components/shared/Range.svelte"
  import ColorPicker from "@components/shared/ColorPicker.svelte"
  import PalettePicker from "@components/shared/PalettePicker.svelte"
  import FontPicker from "@components/shared/FontPicker.svelte"
</script>



<h2>Theme Settings</h2>

<ColorPicker
  key="primary_color"
  defaultValue={{ h: 281, s: 72, l: 54 }}>
  Primary color
  <span slot="help">This color is used the most throughout your website. This should be the primary color of your brand.</span>
</ColorPicker>

<ColorPicker
  key="secondary_color"
  defaultValue={{ h: 32, s: 90, l: 49 }}>
  Secondary color
  <span slot="help">This color is used to accent the primary color and create contrast.</span>
</ColorPicker>

<PalettePicker key="palette" />

<hr />

<FontPicker key="font_heading">
  Title font
</FontPicker>

<FontPicker key="font_body">
  Body font
</FontPicker>

<hr />

<Range
  key="font_size_body"
  min=15 max=18 step=1 defaultValue=16>
  Body font size
  <span slot="help">The size of text of most of regular content. Font size in pixels</span>
</Range>

<Range
  key="max_width"
  min=1 max=4 step=1 defaultValue=2>
  Page width
  <span slot="help">The maximum width of your website, mostly relevant on larger screens.</span>
</Range>

<Range
  key="margin"
  min=1 max=4 step=1 defaultValue=2>
  Spacing
  <span slot="help">The size of spacing around almost all elements. A larger margin will make the website feel more open, but without sufficient content it might make it feel empty.</span>
</Range>

<Range
  key="border_radius"
  min=0 max=4 step=1 defaultValue=1>
  Roundness
  <span slot="help">This value determines how "round" several elements on your page are. Round elements appear more friendly.</span>
</Range>

<Range
  key="shadow_type"
  min=0 max=5 step=1 defaultValue=0>
  Shadow type
  <span slot="help">Add a shadow to certain elements.</span>
</Range>



<style lang="scss">
  hr {
    display: block;
    height: 1px;
    margin: 1.5rem 0;
    border: 0;
  }
</style>
