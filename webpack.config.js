const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;

const ENV = {
    host : process.env.HOST || 'localhost',
    port : process.env.PORT || 3001
};

const PATH = {
    app : path.join(__dirname, 'app'),
    dist : path.join(__dirname, 'dist'),
    style : path.join(__dirname, 'app/main.css')
};

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template : path.join(PATH.app, 'index.html'),
  filename : 'index.html',
  inject : 'body'
});

process.env.BABEL_ENV = TARGET;

const common = {
    entry : {
        main : [
            './app/js/app.js'
        ]
    },
    output : {
        path : PATH.dist,
        filename : 'app.js'
    },
    resolve : {
        extensions : ['', '.js', '.jsx']
    },
    module : {
        loaders : [
            {
                test: /\.jsx?$/,
                include: PATH.app,
                loaders: ['babel?cacheDirectory']
            }
            // {
            //     test : /\.js$/,
            //     exclude : [
            //         /static\/js\/lib\/.*\.js$/,
            //         /node_modules\/.*/
            //     ],
            //     loaders : ['react-hot','6to5?experimental']
            // },
            // {
            //     test: /\.json$/,
            //     loaders: ['json']
            // },
            // // SCSS must come last due to prod image inlining
            // {
            //     test: /\.scss$/,
            //     loader: "style!raw?root!sass?outputStyle=expanded" // + "&includePath[]=" + (__dirname + '/vendor')
            // }
        ]
    },
    plugins: [
        HTMLWebpackPluginConfig
    ]
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        // entry: {
        //     style: PATH.style
        // },
        // devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // display only errors to reduce the amount of output
            stats: 'errors-only',

            // parse host and port from env so this is easy
            // to customize
            host: ENV.host,
            port: ENV.port
        },
        // module: {
        //     loaders: [
        //         // Define development specific CSS setup
        //         {
        //             test: /\.css$/,
        //             loaders: ['style', 'css'],
        //             include: PATH.app
        //         }
        //     ]
        // },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(TARGET === 'build' || TARGET === 'stats') {
    module.exports = common;
  // module.exports = merge(common, {
  //   entry: {
  //     vendor: Object.keys(pkg.dependencies).filter(function(v) {
  //       // Exclude alt-utils as it won't work with this setup
  //       // due to the way the package has been designed
  //       // (no package.json main).
  //       return v !== 'alt-utils';
  //     }),
  //     style: PATH.style
  //   },
  //   output: {
  //     path: PATH.build,
  //     filename: '[name].[chunkhash].js',
  //     chunkFilename: '[chunkhash].js'
  //   },
  //   module: {
  //     loaders: [
  //       // Extract CSS during build
  //       {
  //         test: /\.css$/,
  //         loader: ExtractTextPlugin.extract('style', 'css'),
  //         include: PATH.app
  //       }
  //     ]
  //   },
  //   plugins: [
  //     new CleanPlugin([PATH.build]),
  //     // Output extracted CSS to a file
  //     new ExtractTextPlugin('styles.[chunkhash].css'),
  //     // Extract vendor and manifest files
  //     new webpack.optimize.CommonsChunkPlugin({
  //       names: ['vendor', 'manifest']
  //     }),
  //     // Setting DefinePlugin affects React library size!
  //     new webpack.DefinePlugin({
  //       'process.env.NODE_ENV': '"production"'
  //     }),
  //     new webpack.optimize.UglifyJsPlugin({
  //       compress: {
  //         warnings: false
  //       }
  //     })
  //   ]
  // });
}
