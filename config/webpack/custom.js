const path = require("path")

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "..", "..", "app/javascript/"),
      "@stores": path.resolve(__dirname, "..", "..", "app/javascript/stores"),
      "@shared": path.resolve(__dirname, "..", "..", "app/javascript/shared"),
      "@components": path.resolve(__dirname, "..", "..", "app/javascript/components")
    }
  }
}
