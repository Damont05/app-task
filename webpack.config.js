module.exports = {

    entry: './src/app/main.js',
    mode: "development",
    output: {

        path: __dirname + '/src/public/js',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            use: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    }
};