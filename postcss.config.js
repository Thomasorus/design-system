
module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-copy')({ dest: 'assets' })
  ]
}
