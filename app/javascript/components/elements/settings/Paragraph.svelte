<script>
  import Range from "@components/shared/Range.svelte"
  import Button from "@components/shared/Button.svelte"

  export let element
</script>



<div class="form-label mb-1/4">Size</div>

<div class="button-group">
  <Button { element } key="size" value="0.5">Small</Button>
  <Button { element } key="size" value="0.75">Medium</Button>
  <Button { element } key="size" value="">Full</Button>
</div>

<div class="form-label mb-1/4">Text size</div>

<div class="button-group">
  <Button { element } key="text_size" value="0.85">Small</Button>
  <Button { element } key="text_size" value="">Regular</Button>
  <Button { element } key="text_size" value="1.15">Large</Button>
</div>

<div class="form-label mb-1/4">Text alignment</div>

<div class="button-group">
  <Button { element } key="alignment" value="">Left</Button>
  <Button { element } key="alignment" value="center">Center</Button>
</div>
