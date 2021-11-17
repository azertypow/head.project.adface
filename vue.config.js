// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath:
        process.env.NODE_ENV === "production" ? "https://azertypow.github.io/head.project.adface/" : "/"
}
