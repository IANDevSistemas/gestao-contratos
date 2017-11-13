const path = require("path")

module.exports = {
  // Webpack aliases
  aliases: {
    "quasar": path.resolve(__dirname, "../node_modules/quasar-framework/"),
    "src": path.resolve(__dirname, "../src"),

    // TODO verificar para deixar mais rápido
    // a linha abaixo adiciona o compilador do Vue
    // O compilador, deixa mais lento.
    // Necessário por causa do pacote vue-html5-editor
    // Se o pacote não for mais usado a linha abaixo pode ser removida

    "vue": "vue/dist/vue.common.js",
    "assets": path.resolve(__dirname, "../src/assets"),

    "@": path.resolve(__dirname, "../src/components"),

    "router": path.resolve(__dirname, "../src/router"),
    "service": path.resolve(__dirname, "../src/service"),
    "store": path.resolve(__dirname, "../src/store"),

    "variables": path.resolve(__dirname, "../src/themes/quasar.variables.styl")
  },

  // Progress Bar Webpack plugin format
  // https://github.com/clessg/progress-bar-webpack-plugin#options
  progressFormat: ` [:bar] ${":percent".bold} (:msg)`,

  // Default theme to build with ('ios' or 'mat')
  defaultTheme: "mat",

  build: {
    env: require("./prod.env"),
    publicPath: "",
    productionSourceMap: false,

    // Remove unused CSS
    // Disable it if it has side-effects for your specific app
    purifyCSS: true
  },
  dev: {
    env: require("./dev.env"),
    cssSourceMap: true,
    // auto open browser or not
    openBrowser: true,
    publicPath: "/",
    port: 8080,

    // If for example you are using Quasar Play
    // to generate a QR code then on each dev (re)compilation
    // you need to avoid clearing out the console, so set this
    // to "false", otherwise you can set it to "true" to always
    // have only the messages regarding your last (re)compilation.
    clearConsoleOnRebuild: false,

    // Proxy your API if using any.
    // Also see /build/script.dev.js and search for "proxy api requests"
    // https://github.com/chimurai/http-proxy-middleware
    proxyTable: {}
  }
}

/*
 * proxyTable example:
 *
   proxyTable: {
      // proxy all requests starting with /api
      '/api': {
        target: 'https://some.address.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
 */
