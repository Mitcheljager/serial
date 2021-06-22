import Slant from "../components/sections/shapes/Slant.svelte"
import Layered from "../components/sections/shapes/Layered.svelte"
import Wavy from "../components/sections/shapes/Wavy.svelte"
import Wavy2 from "../components/sections/shapes/Wavy2.svelte"
import Wavy3 from "../components/sections/shapes/Wavy3.svelte"
import Wavy4 from "../components/sections/shapes/Wavy4.svelte"
import WavyLayered from "../components/sections/shapes/WavyLayered.svelte"
import WavyLayered2 from "../components/sections/shapes/WavyLayered2.svelte"
import WavyLayered3 from "../components/sections/shapes/WavyLayered3.svelte"
import Blocky from "../components/sections/shapes/Blocky.svelte"
import Blocky2 from "../components/sections/shapes/Blocky2.svelte"
import Blocky3 from "../components/sections/shapes/Blocky3.svelte"
import Round from "../components/sections/shapes/Round.svelte"
import RoundInverse from "../components/sections/shapes/RoundInverse.svelte"
import Straight from "../components/sections/shapes/Straight.svelte"
import Gradient from "../components/sections/shapes/Gradient.svelte"

const shapes = [
  { component: Slant, identifier: "slant" },
  { component: Layered, identifier: "layered" },
  { component: Wavy, identifier: "wavy" },
  { component: Wavy2, identifier: "wavy_2" },
  { component: Wavy3, identifier: "wavy_3" },
  { component: Wavy4, identifier: "wavy_4" },
  { component: WavyLayered, identifier: "wavy_layered" },
  { component: WavyLayered2, identifier: "wavy_layered_2" },
  { component: WavyLayered3, identifier: "wavy_layered_3" },
  { component: Blocky, identifier: "blocky" },
  { component: Blocky2, identifier: "blocky_2" },
  { component: Blocky3, identifier: "blocky_3" },
  { component: Round, identifier: "round" },
  { component: RoundInverse, identifier: "round_inverse" },
  { component: Straight, identifier: "straight" },
  { component: Gradient, identifier: "gradient" }
]

export {
  shapes
}
