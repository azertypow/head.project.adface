// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath:
        process.env.NODE_ENV === "production" ? "adface.swissdigitalinitiative.ch/" : "http://localhost:8080/"
}
