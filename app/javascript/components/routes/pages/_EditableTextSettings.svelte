<script>
  import FloatingSettings from "./_FloatingSettings.svelte"

  function action(command) {
    console.log(command)
    document.execCommand(command, false, null)
  }
</script>



<FloatingSettings>
  <div class="toolbar">
    <button class="button" on:click={ action("italic") }>Italic</button>
  </div>
</FloatingSettings>



<style lang="scss">
  .toolbar {
    width: 100%;
    border-radius: 1rem;
    background: var(--border-color);
    box-shadow: 0 .5rem 1.5rem hsla(0, 0, 0, .25);
  }
</style>
