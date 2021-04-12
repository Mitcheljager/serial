<script>
  import { flip } from "svelte/animate"
  
  import { page } from "../../../stores/data.js"

  import Section from "../../sections/Section.svelte"
  import Navigation from "../../theme/Navigation.svelte"
</script>



<Navigation />

{ #each $page.sections as section, index (section.id) }
  <div animate:flip="{{ duration: 200 }}">
    <Section { section } { index } />
  </div>
{ /each }



<style lang="scss">
  div {
    position: relative;
    padding: .1px 0;
  }
</style>
