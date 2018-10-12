const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/, use: [
                    'style-loader/useable',
                    { loader: 'css-loader', options: { url: false } },
                ]
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
    ],
};