<script>
  import { onMount, onDestroy } from "svelte"
  import { fade, fly } from "svelte/transition"
  import iro from "@jaames/iro"

  import { theme } from "../../stores/theme.js"

  export let key
  export let defaultValue

  let element
  let handle
  let wrapper

  let active = false
  let h = $theme[key]?.h || defaultValue?.h || 0
  let s = $theme[key]?.s || defaultValue?.s || 0
  let l = $theme[key]?.l || defaultValue?.l || 0
  let hexString
  let picker

  $: renderPicker(active)
  $: saveKey(h, s, l)

  onMount(() => document.addEventListener("click", clickOutside))
  onDestroy(() => document.removeEventListener("click", clickOutside))

  function renderPicker() {
    if (!active) return

    setTimeout(() => {
      picker = new iro.ColorPicker(element, {
        color: { h: h, s: s, l: l },
        width: 250,
        borderWidth: 2,
        layout: [{ 
          component: iro.ui.Slider,
          options: {
            sliderType: "hue"
          }
        }, { 
          component: iro.ui.Slider,
          options: {
            sliderType: "saturation"
          }
        }, { 
          component: iro.ui.Slider,
          options: {
            sliderType: "value"
          }
        }]
      })
      
      picker.on("color:change", setColor)

      hexString = picker.color.hexString
    })
  }

  function setColor() {
    const hsl = this.color.hsl
    hexString = this.color.hexString

    h = hsl.h
    s = hsl.s
    l = hsl.l
  }

  function setColorViaInput(event) {
    picker.color.hexString = event.target.value

    console.log(picker.color.hexString)
  }

  function saveKey() {
    $theme[key] = { h: h, s: s, l: l }
  }

  function clickOutside(event) {
    if (event.target.closest(".color-picker") == wrapper) return

    active = false
  }
</script>



<div class="label">
  <div class="color-picker" bind:this={ wrapper } style="--h: { h }; --s: { s }; --l: { l }">
    <div class="color-picker__handle" on:click={ () => active = !active } bind:this={ handle }></div>

    { #if active }
      <div class="color-picker__content" in:fly={{ y: 10, duration: 150 }}>
        <div bind:this={ element }></div>

        <input class="form-input mt-1/4" on:input={ setColorViaInput } bind:value={ hexString } />

        <div class="flex mt-1/4">
          <button class="button button--small mr-1/8" on:click={ () => picker.reset() }>Reset</button>
          <button class="button button--small button--light" on:click={ () => active = false }>Close</button>
        </div>
      </div>
    { /if }
  </div>

  <div>
    <div class="form-label"><slot /></div>

    <div class="help">
      <slot name="help" />
    </div>
  </div>
</div>



<style lang="scss">
  .label {
    display: flex;
    margin-bottom: 1.5rem;
  }

  .form-label {
    margin-top: .4rem;
  }

  .color-picker {
    position: relative;
  }

  .color-picker__handle {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: .75rem;
    border-radius: 2rem;
    background: hsl(var(--h), calc(var(--s) * 1%), calc(var(--l) * 1%));
    cursor: pointer;

    &:hover,
    &:active {
      filter: brightness(1.15);
    }
  }

  .color-picker__content {
    position: absolute;
    top: 3rem;
    left: 0;
    padding: 1.5rem;
    max-width: 300px;
    background: var(--border-color);
    z-index: 10;
    border-radius: .5rem;
  }

  input {
    background: var(--content-bg);
  }
</style>
