import { readable } from "svelte/store"

const palettes = readable([
  { name: "Default", colors: {
    body: "hsl(220, 15%, 20%)",
    content: "hsl(223, 14%, 10%)",
    border: "hsl(220, 15%, 35%)",
    font: "hsl(219, 22%, 77%)",
    font_alt: "hsl(217, 12%, 50%)",
    font_heading: "hsl(220, 22%, 95%)"
  }},
  { name: "Dark", colors: {
    body: "hsl(0, 0%, 10%)",
    content: "hsl(0, 0%, 13%)",
    border: "hsl(0, 0%, 20%)",
    font: "hsl(0, 0%, 60%)",
    font_alt: "hsl(0, 0%, 40%)",
    font_heading: "hsl(0, 0%, 95%)"
  }},
  { name: "Light", colors: {
    body: "hsl(0, 0%, 100%)",
    content: "hsl(216, 29%, 97%)",
    border: "hsl(218, 18%, 91%)",
    font: "hsl(0, 0%, 40%)",
    font_alt: "hsl(0, 0%, 50%)",
    font_heading: "hsl(0, 0%, 24%)"
  }},
  { name: "Sky", colors: {
    body: "hsl(221, 60%, 98%)",
    content: "hsl(222, 81%, 94%)",
    border: "hsl(221, 86%, 92%)",
    font: "hsl(222, 50%, 60%)",
    font_alt: "hsl(222, 30%, 70%)",
    font_heading: "hsl(222, 97%, 25%)"
  }},
  { name: "Space", colors: {
    body: "hsl(217, 35%, 20%)",
    content: "hsl(193, 50%, 20%)",
    border: "hsl(187, 60%, 20%)",
    font: "hsl(181, 30%, 50%)",
    font_alt: "hsl(181, 30%, 40%)",
    font_heading: "hsl(181, 30%, 90%)"
  }},
  { name: "Umber", colors: {
    body: "hsl(196, 53%, 17%)",
    content: "hsl(191, 26%, 20%)",
    border: "hsl(167, 7%, 24%)",
    font: "hsl(27, 32%, 60%)",
    font_alt: "hsl(27, 15%, 40%)",
    font_heading: "hsl(25, 45%, 85%)"
  }},
  { name: "Underworld", colors: {
    body: "hsl(251, 17%, 20%)",
    content: "hsl(277, 12%, 21%)",
    border: "hsl(336, 22%, 25%)",
    font: "hsl(280, 17%, 85%)",
    font_alt: "hsl(280, 10%, 45%)",
    font_heading: "hsl(351, 48%, 45%)"
  }}
])

export { palettes }
