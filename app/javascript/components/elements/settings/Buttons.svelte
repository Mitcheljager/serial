<script>
  import Range from "@components/shared/Range.svelte"
  import Button from "@components/shared/Button.svelte"
  import Switch from "@components/shared/Switch.svelte"

  export let element
</script>



<Range { element }
  key="button_count"
  min=1 max=3 step=1 defaultValue=2>
  Number of buttons
</Range>

<div class="button-group">
  <Button { element } key="alignment" value="">Left</Button>
  <Button { element } key="alignment" value="center">Center</Button>
</div>
