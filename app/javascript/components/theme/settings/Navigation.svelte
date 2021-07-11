<script>
  import { theme } from "@stores/theme"

  import Pages from  "@components/theme/settings/navigation/Pages.svelte"
  import Switch from "@components/shared/Switch.svelte"
  import Select from "@components/shared/Select.svelte"
  import Button from "@components/shared/Button.svelte"

  $: navigation = $theme.navigation || []

  function setKey(key, value) {
    navigation[key] = value

    $theme.navigation = navigation
  }
</script>



<h2>Navigation</h2>

<Select
  on:change={ event => setKey("style", event.detail.value) }
  key="background_color"
  emit=true
  defaultValue={ navigation.style }
  values={{
    "Default": "",
    "Floating": "floating"
  }}>
  Style
</Select>

<Select
  on:change={ event => setKey("background", event.detail.value) }
  key="background_color"
  emit=true
  defaultValue={ navigation.background }
  values={{
    "Default": "",
    "Light": "light",
    "Body": "body",
    "Transparent": "transparent",
    "Primary": "primary",
    "Secondary": "secondary",
    "Gradient": "gradient",
  }}>
  Background
</Select>

<div class="form-label mt-1/4 mb-1/4">Logo position</div>

<div class="button-group">
  <Button
    key="layout"
    value=""
    emit="true"
    valueForEmit={ navigation.layout }
    on:change={ event => setKey("layout", event.detail.value) }>  
    Left
  </Button>

  <Button
    key="layout"
    value="logo-centered"
    emit="true"
    valueForEmit={ navigation.layout }
    on:change={ event => setKey("layout", event.detail.value) }>
    Center
  </Button>
</div>

{ #if $theme.shadow_type > 0 && $theme.navigation.background != "transparent" }
  <Switch
    emit=true
    key="shadow"
    defaultValue={ navigation.shadow || false }
    on:change={ event => setKey("shadow", event.detail.checked) }>
    Include shadow
  </Switch>
{ /if }

<Switch
  emit=true
  key="full_width"
  defaultValue={ navigation.full_width || false }
  on:change={ event => setKey("full_width", event.detail.checked) }>
  Full width
</Switch>

<Switch
  emit=true
  key="include_button"
  defaultValue={ navigation.include_button || true }
  on:change={ event => setKey("include_button", event.detail.checked) }>
  Include button
</Switch>

<Switch
  emit=true
  key="include_socials"
  defaultValue={ navigation.include_socials || false }
  on:change={ event => setKey("include_socials", event.detail.checked) }>
  Include socials
</Switch>

{ #if navigation.include_socials }
  { #each ["Twitter", "YouTube", "Discord"] as social }
    <input
      value={ navigation[social.toLowerCase()] }
      on:change={ event => setKey(social.toLowerCase(), event.target.value) }
      text=text
      class="form-input mb-1/8"
      placeholder="{ social } URL" />
  { /each }
{ /if }

<Pages />

