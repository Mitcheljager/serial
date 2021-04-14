<script>
  import { page } from "../../../stores/data.js"

  function addSection() {
    $page.sections = [...$page.sections, { id: Math.random(10000), name: "Unnamed section", properties: [] }]
  }
</script>



<button class="button button--light button--small w-100 mt-1/4" on:click={ addSection }>
  <span>Add section</span>
</button>



<style lang="scss">
</style>
