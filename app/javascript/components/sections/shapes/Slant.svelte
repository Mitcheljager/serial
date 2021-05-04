<script>
  export let position
</script>



<svg preserveAspectRatio="none" width="1440px" height="100px" viewBox="0 0 1440 100">
  { #if position == "top" }
    <g transform="translate(0.000000, -130.000000)" fill="var(--palette-body)">
      <path d="M1440,141 L0,226.971327 L0,130 L1440,130 L1440,141 Z"></path>
    </g>
  { /if }
  
  { #if position == "bottom" }
    <g transform="translate(0.000000, -824.000000)" fill="var(--palette-body)">
      <path d="M1440,824.030007 L1440,924 L0,924 L0,914 L1440,824.030007 Z"></path>
    </g>
  { /if }
</svg>



<style lang="scss">
  svg {
    display: block;
    width: 100%;
  }
</style>
