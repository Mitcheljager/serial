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
          <label class="button upload-button">
            { image?.src ? "Replace image" : "Upload image" }
            <input type="file" on:change={ setImage } />
          </label>
        {:else}
          <div class="progress">
            <div class="progress__label">Uploading...</div>
            <div class="progress__bar" style="--progress: { progress }%" />
          </div>
        {/if}

        <div class="mt-1/4">
          <label class="form-label">Alt text</label>
          <div class="help">
            Alt text helps people using accessibility tools better understand your images. It may also help with SEO.
          </div>

          <input
            class="form-input mt-1/4"
            value={ image.alt || "" }
            placeholder="Describe your image in as few words as possible"
            on:change={ event => setKey("alt", event.target.value) } />
        </div>
      </div>

      <div class="grid__item">
        <Switch
          emit=true
          key="include_link"
          defaultValue={ image.include_link || false }
          on:change={ event => setKey("include_link", event.detail.checked) }>
          Link when image is clicked
        </Switch>

        { #if image.include_link }
          <input
            class="form-input mt-1/8"
            value={ image.link || "" }
            placeholder="https://example.com/"
            on:change={ event => setKey("link", event.target.value) } />
        { /if }
      </div>

      <div class="grid__item">
        { #if $theme.shadow_type > 0 }
          <Switch
            emit=true
            key="shadow"
            defaultValue={ image.shadow || false }
            on:change={ event => setKey("shadow", event.detail.checked) }>
            Include shadow
          </Switch>
        { /if }

        { #if $theme.border_radius > 0 }
          <Switch
            emit=true
            key="rounded"
            defaultValue={ image.rounded || false }
            on:change={ event => setKey("rounded", event.detail.checked) }>
            Rounded edges
          </Switch>
        { /if }
      </div>

      <div class="grid__item">
        <Switch
          emit=true
          key="grayscale"
          defaultValue={ image.grayscale || false }
          on:change={ event => setKey("grayscale", event.detail.checked) }>
          Black and white
        </Switch>

        <Range
          emit=true
          key="blur"
          min=0 max=50 step=5 defaultValue={ image.blur || 0 }
          on:change={ event => setKey("blur", event.detail.value) }>
          Blur image
        </Range>

        <Range
          emit=true
          key="overlay"
          min=0 max=80 step=10 defaultValue={ image.overlay || 0 }
          on:change={ event => setKey("overlay", event.detail.value) }>
          Darken
        </Range>
      </div>
    </div>
  </FloatingSettings>
{ /if }



<style lang="scss">
  h3 {
    margin-top: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0.5rem 1.5rem hsla(0, 0, 0, 0.25);

    :global(.range) {
      margin: .5rem 0;
    }
  }

  .grid__item {
    padding: 0.75rem;
    background: var(--border-color);
    border-right: 1px solid var(--content-bg);

    &:last-child {
      border-right: 0;
    }
  }

  .upload-button {
    cursor: pointer;

    input {
      appearance: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
    }
  }

  .progress {
    position: relative;
    background: var(--bg-dark);
    width: 100%;
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
