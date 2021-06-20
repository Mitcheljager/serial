<script>
  import Button from "../../shared/Button.svelte"

  export let element
</script>


<div class="form-label mb-1/4">Background</div>

<div class="button-group">
  <Button { element } key="size" value="0.5">Small</Button>
  <Button { element } key="size" value="0.75">Medium</Button>
  <Button { element } key="size" value="">Full</Button>
</div>
