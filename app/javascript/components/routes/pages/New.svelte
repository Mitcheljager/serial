<script>
  import { onMount } from "svelte"


  const editor = new EditorJS({
    autofocus: true,
    placeholder: "Start writing...",
    tools: {
      attaches: {
        class: Attaches
      },
      checklist: {
        class: Checklist
      },
      code: {
        class: Code
      },
      delimiter: {
        class: Delimiter
      },
      header: {
        class: Header
      },
      image: {
        class: Image
      },
      "Inline code": {
        class: InlineCode
      },
      List: {
        class: List
      },
      marker: {
        class: Marker
      },
      quote: {
        class: Quote
      }
    }
  })

  function save() {
    editor.save().then((outputData) => {
      console.log("Article data: ", outputData)
    }).catch((error) => {
      console.log("Saving failed: ", error)
    })
  }
</script>

<h1>Posts</h1>

<div class="block">
  <div id="editorjs"></div>
</div>

<button on:click={ save }>Save</button>

<style lang="scss">
  :global(.codex-editor--narrow .codex-editor__redactor) {
    margin-right: 0;
  }
</style>
