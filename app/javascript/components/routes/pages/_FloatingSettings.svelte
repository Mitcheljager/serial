<script>
  import { onMount, onDestroy } from "svelte"
  import { fly } from "svelte/transition"

  import { currentEditableButton } from "../../../stores/data"

  import EditableButtonSettings from "./_EditableButtonSettings.svelte"

  $: active = $currentEditableButton
  $: { if (active) getWidth() }

  let element
  let width = 0

  onMount(() => document.addEventListener("click", clickOutside))
  onDestroy(() => document.removeEventListener("click", clickOutside))

  function getWidth() {
    const container = document.querySelector("[data-role='theme-container']")
    width = container.offsetWidth
  }
  
  function clickOutside(event) {
    if (!active) return
    if (event.target.closest(".floating-settings")) return
    if (event.target.closest("[data-editable-button]")) return

    $currentEditableButton = null
  }
</script>



{ #if active }
  <div
    bind:this={ element }
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
    margin-left: 1.5rem;
    display: flex;
    width: 100%;
    min-height: 4rem;
    max-width: calc(var(--width) - 3rem);
    z-index: 100;

    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 4rem;
      bottom: 1rem;
      height: 10px;
      width: calc(100% - 8rem);
      border-radius: 2rem;
      z-index: -1;
      opacity: .5;
      background: black;
      box-shadow: 0 0 2rem 2rem black;
    }
  }
</style>
