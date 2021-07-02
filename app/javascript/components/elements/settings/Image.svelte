<script>
  import Button from "@components/shared/Button.svelte"

  export let element
</script>



<div class="form-label mb-1/4">Max size</div>

<div class="button-group mb-1/8">
  <Button { element } key="size" value="0.25">Tiny</Button>
  <Button { element } key="size" value="0.5">Small</Button>
  <Button { element } key="size" value="0.75">Medium</Button>
  <Button { element } key="size" value="">Full</Button>
</div>

<span class="help">Note: You may need to re-upload images after resizing</span>


