<script>
  import { onMount } from "svelte"

  import EditorJS from "@editorjs/editorjs"
  import Attaches from "@editorjs/attaches"
  import Checklist from "@editorjs/checklist"
  import Code from "@editorjs/code"
  import Delimiter from "@editorjs/delimiter"
  import Header from "@editorjs/header"
  import Image from "@editorjs/image"
  import InlineCode from "@editorjs/inline-code"
  import List from "@editorjs/list"
  import Marker from "@editorjs/marker"
  import Quote from "@editorjs/quote"

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
