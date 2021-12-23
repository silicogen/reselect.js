const path = require('path')

const config = {
    entry: ['babel-polyfill', './src/index.tsx'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: [
            path.resolve(__dirname + '/src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
}

const configDev = {
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, 'public'),
        hot: true,
        liveReload: true,
        port: 3001,
    }
}

const configProd = {
}

module.exports = (env, args) => {
    const configAdd = args.mode === "development" ? configDev : configProd;
    return { ...config, ...configAdd };
}