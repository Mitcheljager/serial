<script>

</script>



<footer class="footer">
  <div class="footer__content wrapper">
    <span class="footer__name">Website Name <small>&copy 2021</small></span>

    <nav class="footer__navigation">
      { #each ["Link", "In", "Footer"] as item }
        <a href="://" class="footer__item">{ item }</a>
      { /each }
    </nav>
  </div>
</footer>



<style lang="scss">
  .footer {
    padding: calc(.5rem + (.5rem * var(--margin-multiplier))) 0;
  }

  .footer__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--palette-font-alt);
  }

  .footer__navigation {
    display: flex;
  }

  .footer__item {
    display: block;
    margin: 0 0 0 1rem;
    color: var(--palette-font);
    text-decoration: none;
  }
</style>
