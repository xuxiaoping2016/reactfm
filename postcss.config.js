module.exports = {
    plugins: {
        'postcss-preset-env': {
            stage: 0,
            autoprefixer: {
                grid: true 
                // flexbox: 'no-2009',
            }
        }
    }
};