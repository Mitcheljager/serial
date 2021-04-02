<script>
  import { page } from "../../../stores/data.js"

  import Section from "../../sections/Section.svelte"
</script>

{ #each $page.sections as section }
  <Section section={ section } />
{ /each }

<style lang="scss">

</style>
