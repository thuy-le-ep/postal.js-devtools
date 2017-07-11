var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require("path");

var DEV = process.env.NODE_ENV === "development"

var cssLoaderOptions = "?modules";
var plugins = [];

plugins.push(new webpack.DefinePlugin({
  __DEV__: DEV,
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
}));

plugins.push(new HtmlWebpackPlugin({
  title: "Postal.js Publication Visualizer",
  filename: "index.html",
  template: "./src/index.tpl"
}))

if (DEV) {
  plugins.push(new webpack.SourceMapDevToolPlugin());
  cssLoaderOptions += "&localIdentName=[local]_[hash:base64:5]"
}

plugins.push(new CopyWebpackPlugin([
  { from: "src/manifest.json"},
  { from: "src/contentscript.js" },
  { from: "src/bridge.js" },
  { from: "src/devtools.html" },
  { from: "src/devtools.js" },
  { from: "src/background.js" },
  { from: "src/icon.png" }
]))

module.exports = {
  entry: "./src/index.js",
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader" + cssLoaderOptions,
      exclude: [/flexboxgrid/, /material-design-icons/, /vis\/dist/]
    }, {
      test: [/flexboxgrid\.css$/, /material-design-icons.*\.css$/, /vis\/dist.*\.css$/],
      loader: "style-loader!css-loader"
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg).*$/,
      loader: "url-loader?limit=1000000"
    }, {
      test: /\.less$/,
      loader: "style-loader!css-loader" + cssLoaderOptions + "!less-loader"
    }]
  },
  output: {
    path: __dirname + "/build",
    filename: "[name].[chunkhash].js"
  },
  plugins: plugins
};
