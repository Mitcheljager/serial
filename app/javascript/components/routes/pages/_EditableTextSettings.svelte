<script>
  import { currentEditable } from "../../../stores/data"
  import FloatingSettings from "./_FloatingSettings.svelte"

  function action(command) {
    document.execCommand(command, false, null)
  }
</script>



{ #if $currentEditable?.type == "text" }
  <FloatingSettings>
    <div class="toolbar">
      <button class="button" on:click={ () => document.execCommand("italic", false, null) }>Italic</button>
      <button class="button" on:click={ () => document.execCommand("createLink", false, "https") }>Link</button>
      <button class="button" on:click={ () => document.execCommand("unlink", false, null) }>Unlink</button>
    </div>
  </FloatingSettings>
{ /if }



<style lang="scss">
  .toolbar {
    display: flex;
    align-items: center;
    width: 100%;
    padding: .75rem;
    border-radius: 1rem;
    background: var(--border-color);
    box-shadow: 0 .5rem 1.5rem hsla(0, 0, 0, .25);
  }
</style>
