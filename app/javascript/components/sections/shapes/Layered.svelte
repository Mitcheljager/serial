<script>
  export let position
</script>



<svg preserveAspectRatio="none" width="1440px" height="194px" viewBox="0 0 1440 194">
  { #if position == "top" }
    <g transform="translate(0.000000, -90.000000)" fill="var(--palette-body)">
      <g transform="translate(-1.000000, 90.000000)">
        <path d="M1442,75 L1,164.969993 L1,0 L1442,0 L1442,75 Z" opacity="0.25"></path>
        <path d="M1441.62682,165 L1441.54673,40 L170.208814,165 L1,165 L1,0 L1442,0 L1442,165 L1441.62682,165 Z" opacity="0.5"></path>
        <path d="M1441.6438,165.008646 L1441.54673,9 L0.523610547,193.670537 L0.519031504,199.987402 L0,200 L1,3.63797881e-12 L1442,3.63797881e-12 L1442,165 L1441.6438,165.008646 Z"></path>
      </g>
    </g>
  { /if }
  
  { #if position == "bottom" }
    <g transform="translate(0.000000, -761.000000)" fill="var(--palette-body)">
      <g transform="translate(720.500000, 858.000000) scale(-1, -1) translate(-720.500000, -858.000000) translate(0.000000, 761.000000)">
        <path d="M1441,75 L0,164.969993 L0,-3.63797881e-12 L1441,-3.63797881e-12 L1441,75 Z" opacity="0.25"></path>
        <path d="M1440.62682,165 L1440.54673,40 L169.208814,165 L0,165 L0,-3.63797881e-12 L1441,-3.63797881e-12 L1441,165 L1440.62682,165 Z" opacity="0.5"></path>
        <path d="M1440.6438,165.007168 L1440.54673,9 L-3.49720253e-15,193.609486 L0,9.09494702e-12 L1441,9.09494702e-12 L1441,165 L1440.6438,165.007168 Z"></path>
      </g>
    </g>
  { /if }
</svg>



<style lang="scss">
  svg {
    display: block;
    width: 100%;
  }
</style>
