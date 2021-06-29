<script>
  import { setTypeKey } from "@shared/key"

  export let element

  let content = element.properties.content

  function setKey(event) {
    content = event.target.value
    setTypeKey("element", element, "content", content)
  }
</script>



<p>
  Custom HTML allows you to add any and all HTML you wish.
  <strong><em>Use this at your own risk.</em></strong>
  If you don't know what you're doing it might be best to stay away from this Element.
</p>

<textarea on:change={ setKey } value={ content } />



<style lang="scss">
  p {
    margin-top: 0;
    font-size: .85rem;
    color: var(--text-color-dark);
  }

  textarea {
    width: 100%;
    min-height: 10rem;
    padding: .5rem;
    border: 0;
    border-radius: .5rem;
    background: var(--bg-dark);
    color: var(--text-color);
    resize: vertical;
  }
</style>
