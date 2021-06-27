<script>
  import Range from "@components/shared/Range.svelte"

  export let element
</script>



<Range { element }
  key="buttons_count"
  min=1 max=3 step=1 defaultValue=2>
  Number of buttons
</Range>
