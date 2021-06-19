<script>
  import { getTypeKey, setTypeKey } from "../../../shared/key.js"
  import Uploader from "../../../shared/uploader.js"
  import RailsFetch from "../../../shared/railsFetch.js"
  import { currentEditable } from "../../../stores/data"
  import { project } from "../../../stores/project"
  import { theme } from "../../../stores/theme"

  import FloatingSettings from "./_FloatingSettings.svelte"
  import Switch from "../../shared/Switch.svelte"
  import Range from "../../shared/Range.svelte"

  $: image = getTypeKey($currentEditable?.keyType, $currentEditable?.[$currentEditable?.keyType], $currentEditable?.key) || {}

  let uploadInProgress = false
  let progress = 0

  function setImage() {
    const file = event.target.files[0]

    if (file) checkFile(file)
  }

  function checkFile(file) {
    if (
      file.type == "image/png" ||
      file.type == "image/jpg" ||
      file.type == "image/jpeg"
    ) {
      uploadImage(file)
    } else {
      alert("Wrong file type. Only png and jpeg are accepted.")
    }
  }

  function uploadImage(file) {
    uploadInProgress = true
    const uploader = new Uploader(file)

    console.log(file)

    uploader.upload().then(() => {
      const interval = setInterval(() => {
        if (uploader.blob == "") return

        clearInterval(interval)

        progress = uploader.progress

        if (progress == 100) {
          new RailsFetch(
            `/active_storage_blob_variant_url/${ uploader.blob.key }?width=${ $currentEditable.width }&height=${ $currentEditable.height }&project_id=${ $project.id }`
          )
            .get()
            .then((data) => {
              setKey("src", data)
            })
            .catch((error) => alert(error))
            .finally(() => (uploadInProgress = false))
        }
      }, 100);
    });
  }

  function setKey(key, value) {
    image[key] = value

    setTypeKey($currentEditable.keyType, $currentEditable[$currentEditable.keyType], $currentEditable.key, image)
  }
</script>



{ #if $currentEditable?.type == "image" && image }
  <FloatingSettings>
    <div class="grid">
      <div class="grid__item">
        {#if !uploadInProgress}
          <label>
            Label
            <input type="file" on:change={ setImage } />
          </label>
        {:else}
          <div class="progress">
            <div class="progress__label">Uploading...</div>
            <div class="progress__bar" style="--progress: { progress }%" />
          </div>
        {/if}
      </div>

      <div class="grid__item">
        { #if $theme.shadow_type }
          <Switch
            emit=true
            key="shadow"
            defaultValue={ image.shadow || false }
            on:change={ event => setKey("shadow", event.detail.checked) }>
            Include shadow
          </Switch>
        { /if }

        <Switch
          emit=true
          key="overlay"
          defaultValue={ image.overlay || false }
          on:change={ event => setKey("overlay", event.detail.checked) }>
          Include overlay
        </Switch>

        { #if image.overlay }
          <Range
            emit=true
            key="overlay_opacity"
            responsive=true
            min=20 max=80 step=10 defaultValue={ image.overlay_opacity || 50 }
            on:change={ event => setKey("overlay_opacity", event.detail.value) }>
            Overlay opacity
          </Range>
        { /if }
      </div>
    </div>
  </FloatingSettings>
{ /if }



<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0.5rem 1.5rem hsla(0, 0, 0, 0.25);
  }

  .grid__item {
    padding: 0.75rem;
    background: var(--border-color);
    border-right: 1px solid var(--content-bg);

    &:last-child {
      border-right: 0;
    }
  }

  input {
    background: var(--content-bg);
    height: 2rem;
  }

  .progress {
    position: relative;
    background: var(--bg-dark);
    width: 100%;
    max-width: 20rem;
    height: 2rem;
    padding: 0.25rem;
    border-radius: 99px;
  }

  .progress__label {
    position: relative;
    padding-left: 0.5rem;
    font-size: 0.85rem;
    line-height: 1.5rem;
    color: white;
    z-index: 1;
  }

  .progress__bar {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    height: calc(100% - 0.5rem);
    width: calc(var(--progress) - 0.5rem);
    border-radius: 99px;
    background: var(--primary);
    transition: width 200ms;
  }
</style>
