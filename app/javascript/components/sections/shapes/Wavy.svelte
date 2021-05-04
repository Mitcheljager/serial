<script>
  export let position
</script>



<svg preserveAspectRatio="none" width="1440px" height="218px" viewBox="0 0 1440 218">
  { #if position == "top" }
    <g fill="var(--palette-body)">
      <path d="M1440,61.563765 C1283.57482,80.715669 1075.09706,119.985026 802.033951,68.518653 C426.483063,-2.2644058 182.719651,-15.2984594 1.09139364e-11,24.179492 L1.09139364e-11,5.45696821e-12 L1440,5.45696821e-12 L1440,61.563765 Z" id="Combined-Shape"></path>
    </g>
  { /if }
  
  { #if position == "bottom" }
    <g transform="translate(0.000000, -910.000000)" fill="var(--palette-body)">
      <path d="M1439.99986,910.00006 L1439.99986,1128 L0,1128 L0,957.850525 C28.3921045,964.731197 56.2400975,971.658406 83.1169831,978.725573 C311.599014,1038.96558 469.698074,1119.28559 635.150579,1124.38052 C745.707511,1127.99674 1122.84743,1047.11303 1440,910 Z" id="Combined-Shape-Copy"></path>
    </g>
  { /if }
</svg>



<style lang="scss">
  svg {
    display: block;
    width: 100%;
  }
</style>
