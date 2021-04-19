<script>
  import RailsFetch from "../../../shared/railsFetch.js"
  import { theme } from "../../../stores/theme.js"
  import { page } from "../../../stores/data.js"
  import { globalError } from "../../../stores/error.js"

  let saving = false
  let success = false
  let error = false

  function save() {
    saving = true

    Promise.all([
      new Promise((resolve, reject) => savePage(resolve, reject)),
      new Promise((resolve, reject) => saveTheme(resolve, reject))
    ])
    .then(() => setTimeout(() => success = true, 500))
    .catch(() => setTimeout(() => {
      error = true
      $globalError = "Something went wrong when saving, please try again."
    }, 500))
    .finally(() => setTimeout(() => {
      saving = false
      error = false
      success = false
    }, 2000))
  }

  function savePage(resolve, reject) {
    new RailsFetch("/page/save", {
      project_id: 1,
      data: $page
    }).post()
    .then(() => resolve())
    .catch(() => reject())
  }

  function saveTheme(resolve, reject) {
    new RailsFetch("/project/save", {
      project_id: 1,
      properties: $theme
    }).post()
    .then(() => resolve())
    .catch(() => reject())
  }
</script>



<button
  disabled={ saving }
  on:click={ save }
  class:button--primary={ !saving }
  class:button--light={ saving }
  class:button--success={ success && saving }
  class:button--error={ error && saving }
  class="ml-auto button button--primary button--small save">

  { #if success }
    ✔
  { :else if error }
    !
  { :else if !success && !error }
    { saving ? "..." : "Save" }
  { /if }
</button>



<style lang="scss">
  .save {
    font-weight: bold;
  }

  .button {
    width: 100%;
    max-width: 5rem;
    transition: max-width 100ms, background-color 250ms, color 250ms;

    &:not(.button--primary) {
      max-width: 2rem;
    }
  }

  .button--light {
    color: var(--text-color-dark);
  }

  .button--success {
    background: var(--green);
    color: white;
  }

  .button--error {
    background: var(--red);
    color: white;
  }
</style>
