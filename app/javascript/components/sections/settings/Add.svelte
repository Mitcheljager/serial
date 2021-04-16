<script>
  import { v4 as uuid } from "uuid"

  import { page } from "../../../stores/data.js"

  function addSection() {
    const newElement = { uuid: uuid(), name: "Unnamed section", properties: {} }
    $page.sections = [...$page.sections || [], newElement]
  }
</script>



<button class="button button--light button--small w-100 mt-1/4" on:click={ addSection }>
  <span>Add section</span>
</button>



<style lang="scss">
</style>
