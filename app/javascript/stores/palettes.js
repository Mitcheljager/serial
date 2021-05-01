import { readable } from "svelte/store"

const palettes = readable([
  { name: "Default", colors: {
    normal: "hsl(220, 15%, 20%)",
    dark: "hsl(223, 14%, 10%)",
    light: "hsl(220, 15%, 35%)",
    font: "hsl(219, 22%, 77%)",
    font_dark: "hsl(217, 12%, 50%)",
    font_light: "hsl(220, 22%, 95%)"
  }},
  { name: "Light", colors: {
    normal: "hsl(0, 0%, 100%)",
    dark: "hsl(216, 29%, 97%)",
    light: "hsl(218, 18%, 91%)",
    font: "hsl(0, 0%, 40%)",
    font_dark: "hsl(0, 0%, 30%)",
    font_light: "hsl(0, 0%, 24%)"
  }},
  { name: "Sky", colors: {
    normal: "hsl(221, 60%, 98%)",
    dark: "hsl(222, 81%, 94%)",
    light:"hsl(221, 86%, 92%)",
    font: "hsl(222, 50%, 60%)",
    font_dark: "hsl(222, 97%, 85%)",
    font_light: "hsl(222, 97%, 25%)"
  }},
  { name: "Space", colors: {
    normal: "hsl(217, 35%, 20%)",
    dark: "hsl(193, 50%, 20%)",
    light:"hsl(187, 60%, 20%)",
    font: "hsl(181, 30%, 50%)",
    font_dark: "hsl(181, 30%, 80%)",
    font_light: "hsl(181, 30%, 90%)"
  }},
  { name: "Umber", colors: {
    normal: "hsl(196, 53%, 17%)",
    dark: "hsl(191, 26%, 20%)",
    light:"hsl(167, 7%, 24%)",
    font: "hsl(27, 32%, 60%)",
    font_dark: "hsl(27, 32%, 40%)",
    font_light: "hsl(25, 45%, 85%)"
  }},
  { name: "Underworld", colors: {
    normal: "hsl(251, 17%, 20%)",
    dark: "hsl(277, 12%, 21%)",
    light:"hsl(336, 22%, 26%)",
    font: "hsl(280, 17%, 85%)",
    font_dark: "hsl(280, 10%, 70%)",
    font_light: "hsl(351, 48%, 45%)"
  }}
])

export { palettes }
