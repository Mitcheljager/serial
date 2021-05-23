<script>
  import { currentEditable, currentSectionIndex } from "../../../stores/data"
  import { getElementKey, getSectionKey, setElementKey, setSectionKey } from "../../../shared/key.js"
  import Uploader from "../../../shared/uploader.js"
  import RailsFetch from "../../../shared/railsFetch.js"
  import { project } from "../../../stores/project"

  import FloatingSettings from "./_FloatingSettings.svelte"

  $: src = getSrc($currentEditable)

  let uploadInProgress = false
  let progress = 0

  function getSrc() {
    if ($currentEditable?.element) return getElementKey($currentSectionIndex, $currentEditable?.element, $currentEditable?.key)
    if ($currentEditable?.section) return getSectionKey($currentSectionIndex, $currentEditable?.key)
  }

  function setImage() {
    const file = event.target.files[0]
    
    if (file) checkFile(file)
  }

  function checkFile(file) {
    if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg") {
      uploadImage(file)
    } else {
      alert("Wrong file type. Only png and jpeg are accepted.")
    }
  }

  function uploadImage(image) {
    uploadInProgress = true
    const uploader = new Uploader(image)

    console.log(image)

    uploader.upload().then(() => {
      const interval = setInterval(() => {
        if (uploader.blob == "") return

        clearInterval(interval)

        progress = uploader.progress

        if (progress == 100) {
          new RailsFetch(`/active_storage_blob_variant_url/${ uploader.blob.key }?width=${ $currentEditable.width }&height=${ $currentEditable.height }&project_id=${ $project.id }`)
          .get()
          .then(data => {
            if ($currentEditable.element) setElementKey($currentSectionIndex, $currentEditable.element, $currentEditable.key, data)
            if ($currentEditable.section) setSectionKey($currentSectionIndex, $currentEditable.key, data)
          })
          .catch(error => alert(error))
          .finally(() => uploadInProgress = false)
        }
      }, 20)
    })
  }
</script>



<FloatingSettings>
  <div class="grid">
    <div class="grid__item">
      { #if !uploadInProgress }
        <label>
          Label
          <input type="file" on:change={ setImage } />
        </label>
      { :else }
        <div class="progress">
          <div class="progress__label">Uploading...</div>
          <div class="progress__bar" style="--progress: { progress }%" />
        </div>
      { /if }
    </div>
  </div>
</FloatingSettings>



<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 .5rem 1.5rem hsla(0, 0, 0, .25);
  }

  .grid__item {
    padding: .75rem;
    background: var(--border-color);
    border-right: 1px solid var(--content-bg);

    &:last-child {
      border-right: 0;
    }
  }

  input,
  select {
    background: var(--content-bg);
    height: 2rem;
  }

  .progress {
    position: relative;
    background: var(--bg-dark);
    width: 100%;
    max-width: 20rem;
    height: 2rem;
    padding: .25rem;
    border-radius: 99px;
  }

  .progress__label {
    position: relative;
    padding-left: .5rem;
    font-size: .85rem;
    line-height: 1.5rem;
    color: white;
    z-index: 1;
  }

  .progress__bar {
    position: absolute;
    top: .25rem;
    left: .25rem;
    height: calc(100% - .5rem);
    width: calc(var(--progress) - .5rem);
    border-radius: 99px;
    background: var(--primary);
    transition: width 200ms;
  }
</style>
