<script>
  export let element

  $: content = element.properties.content || ""
</script>



{ @html content }
