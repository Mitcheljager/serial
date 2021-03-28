<script>
  export let active = false
</script>

<svg class:active viewBox="0 0 512.18 512.18">
	<circle r="35" cx="40" cy="115" />
  <circle r="35" cx="40" cy="260" />
  <circle r="35" cx="40" cy="405" />

  <rect class="line-1" x="120" y="70" width="340" height="70" rx="35" />
  <rect class="line-2" x="120" y="215" width="380" height="70" rx="35" />
  <rect class="line-3" x="120" y="365" width="260" height="70" rx="35" />
</svg>

<style lang="scss">
  @keyframes line-1 {
    0% { width: 340px }
    33% { width: 100px }
    66% { width: 400px }
    100% { width: 340px }
  }

  @keyframes line-2 {
    0% { width: 380px }
    33% { width: 200px }
    66% { width: 400px }
    100% { width: 380px }
  }

  @keyframes line-3 {
    0% { width: 260px }
    33% { width: 50px }
    66% { width: 300px }
    100% { width: 260px }
  }

  .active {
    .line-1 {
      animation: line-1 500ms;
    }

    .line-2 {
      animation: line-2 500ms 100ms;
    }

    .line-3 {
      animation: line-3 500ms 200ms;
    }
  }

  svg {
    rect,
    circle {
      fill: currentColor;
    }
  }
</style>
