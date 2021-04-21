<script>
  import { onMount } from "svelte"
  import { fly } from "svelte/transition"

  import { currentEditableButton } from "../../../stores/data"

  import EditableButtonSettings from "./_EditableButtonSettings.svelte"

  let width = 0

  onMount(getWidth)

  function getWidth() {
    const container = document.querySelector("[data-role='theme-container']")
    width = container.offsetWidth
  }
</script>



{ #if $currentEditableButton }
  <div
    class="floating-settings"
    style="--width: { width }px"
    transition:fly={{ y: 100, duration: 150 }}>

    <EditableButtonSettings />
  </div>
{ /if }



<style lang="scss">
  .floating-settings {
    position: fixed;
    bottom: 1.5rem;
    display: flex;
    width: 100%;
    min-height: 4rem;
    max-width: calc(var(--width) - 3rem);
    margin-left: 1.5rem;
    border-radius: 1rem;
    background: var(--border-color);
    box-shadow: 0 0 0 2px var(--secondary);
    z-index: 100;
  }
</style>
