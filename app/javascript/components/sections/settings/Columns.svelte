<script>
  import Range from "./partials/Range.svelte"

  export let element
  export let index
  export let sectionIndex
</script>

<Range { element } { index } { sectionIndex }
  label="Number of columns"
  key="column_count"
  min=1 max=10 step=1 defaultValue=3 />

<Range { element } { index } { sectionIndex }
  label="Size of columns"
  key="column_size"
  min=150 max=500 step=50 defaultValue=250>
  The size of the columns depends on your screen size. They scale automatically as your resolution changes.
</Range>

<Range { element } { index } { sectionIndex }
  label="Gap between columns"
  key="column_gap"
  min=0 max=6 step=1 defaultValue=2>
  Adjusting this may also affect the "Size of columns" setting.
</Range>
