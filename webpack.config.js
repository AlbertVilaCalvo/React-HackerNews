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
      // https://webpack.js.org/loaders/babel-loader/
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // Convert modern JS to old
              // https://babeljs.io/docs/en/babel-preset-env
              '@babel/preset-env',
              // Transform JSX to React.createElement (and other things)
              // https://babeljs.io/docs/en/babel-preset-react
              '@babel/preset-react',
            ],
          },
        },
      },
      // Allow "import './index.css'" in JS files
      // https://webpack.js.org/loaders/style-loader/
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
