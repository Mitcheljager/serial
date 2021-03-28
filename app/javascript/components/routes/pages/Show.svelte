<script>
  import { page } from "../../../stores/data.js"

  import Paragraph from "../../blocks/Paragraph.svelte"
  import Heading from "../../blocks/Heading.svelte"

  const components = [
    { component: Paragraph, identifier: "paragraph" },
    { component: Heading, identifier: "header" }
  ]
</script>

<div class="title">
  <h4><a href="#/posts">← Back to posts</a></h4>
  <h1>Project name</h1>
</div>

<article class="block">
  { #each $page.blocks as block }
    <svelte:component this={ components.filter(i =>  i.identifier == block.type)[0].component } text={ block.data.text } config={ { level: block.data.level } } />
  { /each }
</article>

<style lang="scss">
  :global(.block *:first-child) {
    margin-top: 0;
    padding-top: 0;
  }

  :global(.blocl *:last-child) {
    margin-bottom: 0;
    padding-bottom: 0;
  }
</style>
