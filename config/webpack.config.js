const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
    entry: './widget/bpmn2/bpmn.css',
    output: {
        filename: 'bundle.css',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ]
};