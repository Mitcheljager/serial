<script>

</script>

<nav>
  <div class="wrapper">
    <a href="/" class="logo">Navigation</a>

    <div class="navigation">
      { #each ["Home", "Test", "Whatever"] as item }
        <a href="://" class="navigation__item">{ item }</a>
      { /each }
    </div>
  </div>
</nav>

<style lang="scss">
  nav {
    padding: calc(.5rem + (.5rem * var(--margin-multiplier))) 0;
    background: var(--bg-dark);
  }

  .logo {
    margin-right: 1.5rem;
    color: var(--text-color-light);
    text-decoration: none;
    font-weight: bold;
  }

  .wrapper {
    display: flex;
  }

  .navigation {
    display: flex;
  }

  .navigation__item {
    display: block;
    margin: 0 1rem 0 0;
    color: var(--text-color);
    text-decoration: none;
  }
</style>
