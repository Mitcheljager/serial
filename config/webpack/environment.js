const { environment } = require('@rails/webpacker')
const svelte = require("./loaders/svelte")
const customConfig = require("./custom")

environment.loaders.prepend("svelte", svelte)
environment.config.merge(customConfig)

module.exports = environment
