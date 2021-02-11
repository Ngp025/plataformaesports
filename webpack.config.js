const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
    entry: './src/versus/index.js',
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    },
    plugins: [
        new Dotenv({
            path: './.env',
            safe: true,
            systemvars: true,
            silent: true,
            defaults: false
        }),        
       new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(en|es)$/),
    ],
    module: {
        rules:
            [
                // JS
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                // CSS
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                // JP
                //{
                 //   test: /\.(png|jpe?g|gif)$/,
                 //   use: 'file-loader'
                //},
            ]
    },
   node: {
      fs: 'empty'
    },
    devServer: {
        historyApiFallback: true,
    }
};