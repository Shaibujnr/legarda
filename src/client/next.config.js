// next.config.js
const withCSS = require('@zeit/next-css')
const withSASS = require('@zeit/next-sass');
module.exports = withCSS(withSASS());