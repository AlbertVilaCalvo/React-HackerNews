// https://webpack.js.org/concepts/configuration/
// https://webpack.js.org/configuration/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/', // For React Router to work in development - see 'devServer' below
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    // Loaders transform files before they are added to the bundle
    // https://webpack.js.org/concepts/#loaders
    // https://webpack.js.org/concepts/loaders/
    // https://webpack.js.org/loaders/
    rules: [
      // https://webpack.js.org/loaders/babel-loader/
      {
        test: /\.(js|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // Convert modern JS to old
              // https://babeljs.io/docs/en/babel-preset-env
              '@babel/preset-env',
              // Transform JSX to React.createElement (and other things)
              // https://babeljs.io/docs/en/babel-preset-react
              [
                '@babel/preset-react',
                // Enable new JSX transform
                // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
                {
                  runtime: 'automatic',
                },
              ],
              // https://babeljs.io/docs/en/babel-preset-typescript
              '@babel/preset-typescript',
            ],
            // https://babeljs.io/docs/en/plugins
            plugins: [
              // https://babeljs.io/docs/en/babel-plugin-syntax-class-properties
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      // Allow "import './index.css'" in JS files
      // https://webpack.js.org/loaders/style-loader/
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // Plugins perform a wider range of tasks like bundle optimization, asset management
  // and injection of environment variables
  // https://webpack.js.org/concepts/#plugins
  // https://webpack.js.org/concepts/plugins/
  plugins: [
    // Copy src/index.html to build, adding <script src="bundle.js"></script> to it
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // Copy _redirects to build/
    new CopyPlugin({ patterns: [{ from: '_redirects' }] }),
  ],
  // For React Router to work in development, otherwise we get "Cannot GET /new".
  // Requires 'publicPath' above too. It tells the dev server to not try to handle a
  // request to a route, but instead fall back to whatever path we have in 'publicPath'.
  // This allows React to load, and React Router to handle the route.
  // Notice that when we do 'npm run start' it says "404s will fallback to /index.html".
  // See https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
  devServer: {
    historyApiFallback: true,
  },
}
