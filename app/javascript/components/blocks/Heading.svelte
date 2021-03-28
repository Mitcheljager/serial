<script>
  export let text
  export let config = []
</script>

{ @html `<h${ config.level }>${ text }</h${ config.level }>` }
