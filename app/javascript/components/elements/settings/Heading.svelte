<script>
  import Range from "@components/shared/Range.svelte"
  import Button from "@components/shared/Button.svelte"

  export let element
</script>



<Range { element }
  key="size"
  responsive=true
  min=1 max=6 step=1 defaultValue=3>
  Text size
</Range>

<div class="form-label mb-1/4">Text alignment</div>

<div class="button-group">
  <Button { element } key="alignment" value="">Left</Button>
  <Button { element } key="alignment" value="center">Center</Button>
</div>
