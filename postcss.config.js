const postcssCustomProperties = require('postcss-custom-properties');

module.exports = {
    plugins: [
        require('postcss-import'),
        require('autoprefixer'),
        postcssCustomProperties({ importFrom: 'src/css/config.css'}),   
        require('postcss-color-function'),      // replaces color functions with rgba values
        require('postcss-color-rgba-fallback'), // adds a hex value before every rgba value
        require('pixrem'),                      // adds pixel fallback before every rem value
        require('postcss-calc'), 
        require('postcss-copy')({ dest: 'public/assets' }),
    ]
};
