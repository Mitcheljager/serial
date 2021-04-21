<script>
  import { v4 as uuid } from "uuid"

  import { page } from "../../../stores/data.js"

  function addSection() {
    const listLength = $page.sections.length
    const newElement = { uuid: uuid(), name: "Unnamed section", position: listLength, properties: {} }

    $page.sections = [...$page.sections || [], newElement]
  }
</script>



<button class="button button--light button--small w-100 mt-1/4" on:click={ addSection }>
  <span>Add section</span>
</button>



<style lang="scss">
</style>
