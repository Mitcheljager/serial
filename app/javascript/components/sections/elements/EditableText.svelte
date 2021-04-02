<script>
  export let element
  export let key
  export let defaultValue = ""

  $: content = element.properties[key] || defaultValue

  function change() {
    element.properties[key] = content
  }
</script>

<span contenteditable bind:innerHTML={ content } on:input={ change } />

<style lang="scss">
  span {
    display: inline-block;
    min-height: 1em;
    min-width: 1em;

    &:empty::after {
      display: block;
      content: "Edit";
      font-style: italic;
      opacity: .5;
    }
  }
</style>
