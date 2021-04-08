<script>
  import { page } from "../../../stores/data.js"

  import Section from "../../sections/Section.svelte"
  import Navigation from "../../theme/Navigation.svelte"
</script>

<Navigation />

{ #each $page.sections as section }
  <div>
    <Section section={ section } />
  </div>
{ /each }

<style lang="scss">
  div {
    position: relative;
    padding: .1px 0;
  }
</style>
