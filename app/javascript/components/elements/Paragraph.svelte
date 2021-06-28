<script>
  import EditableText from "@components/shared/EditableText.svelte"

  export let element

  $: size = element.properties.size || 1
  $: text_size = element.properties.text_size || 1
  $: alignment = element.properties.alignment || "left"
</script>



<div style="
  --width: { size };
  font-size: { text_size }rem;
  text-align: { alignment };">

  <EditableText { element } key="content" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Verum tamen cum de rebus grandioribus dicas, ipsae res verba rapiunt; Duo Reges: constructio interrete. Audeo dicere, inquit. Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Com audissem Antiochum, Brute." />
</div>



<style lang="scss">
  div {
    max-width: calc((600px + (var(--max-width-modifier) * 150px)) * var(--width));
    margin: 0 auto;
  }
</style>
