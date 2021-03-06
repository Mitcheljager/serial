const sveltePreprocess = require('svelte-preprocess')

module.exports = {
  test: /\.svelte(\.erb)?$/,
  use: [{
    loader: 'svelte-loader',
    options: {
      hotReload: false,
      preprocess: sveltePreprocess(),
      emitCss: true
    }
  }]
}
