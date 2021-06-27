<script>
  import { fade } from "svelte/transition"

  import { globalError } from "@stores/error.js"

  $: {
    if ($globalError) {
      setTimeout(remove, 10000)
    }
  }

  function remove() {
    $globalError = ""
  }
</script>



{ #if $globalError }
  <div
    class="error"
    transition:fade={{ duration: 100 }}
    on:click={ remove }>

    <div class="error__icon">!</div>

    <div class="error__content">
      { $globalError }
    </div>
  </div>
{ /if }



<style lang="scss">
  .error {
    display: flex;
    position: fixed;
    bottom: 1.5rem;
    left: 1.5rem;
    padding: 0;
    border-radius: .5rem;
    max-width: 300px;
    background: var(--red);
    cursor: pointer;
  }

  .error__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-right: 1px solid hsla(0, 0%, 100%, 0.25);
    font-weight: bold;
    font-size: 1.15rem;
    color: white;
  }

  .error__content {
    padding: .5rem 1rem;
    line-height: 1.25rem;
    font-size: .85rem;
    color: white;
  }
</style>
