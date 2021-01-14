// https://webpack.js.org/concepts/configuration/
// https://webpack.js.org/configuration/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    // Loaders transform files before they are added to the bundle
    // https://webpack.js.org/concepts/#loaders
    // https://webpack.js.org/concepts/loaders/
    // https://webpack.js.org/loaders/
    rules: [
      // Babel presets are declared in package.json.
      // preset-env converts modern JS to old - https://babeljs.io/docs/en/babel-preset-env
      // preset-react transform JSX to React.createElement (and other things) - https://babeljs.io/docs/en/babel-preset-react
      { test: /\.(js)$/, use: 'babel-loader' },
      // Allow "import './index.css'" in JS files
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  mode: 'development',
  // Plugins perform a wider range of tasks like bundle optimization, asset management
  // and injection of environment variables
  // https://webpack.js.org/concepts/#plugins
  // https://webpack.js.org/concepts/plugins/
  plugins: [
    // Copy src/index.html to build, adding <script src="bundle.js"></script> to it
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
}
