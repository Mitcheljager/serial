<script>
  import { flip } from "svelte/animate"
  
  import { page } from "../../../stores/data.js"

  import Section from "../../sections/Section.svelte"
  import Navigation from "../../theme/Navigation.svelte"
</script>



<Navigation />

{ #each $page.sections as section, index (section.uuid) }
  <div animate:flip="{{ duration: 200 }}">
    <Section { section } { index } />
  </div>
{ /each }



<style lang="scss">
  div {
    position: relative;
  }
</style>
