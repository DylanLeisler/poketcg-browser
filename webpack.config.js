// webpack.config.js

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export default {
  // Entry point of your application
  entry: 'index.js', // This is where Webpack starts bundling; adjust the path to your main JavaScript file

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'), // This is the folder where bundled files will be output
    filename: 'bundle.js', // Name of the output bundled JavaScript file
    clean: true, // Clean the output directory before every build
  },

  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve content from the dist directory
    },
    compress: true,
    port: 3000, // The port where the server runs
  },

  // Module and Loaders (these transform files as they are added to the bundle)
  module: {
    rules: [
      // JavaScript Loader
      {
        test: /\.m?js$/, // Match all `.js` files
        exclude: /(node_modules|bower_components)/, // Don't process files in node_modules
        use: {
          loader: 'babel-loader', // Use Babel to transpile JS files
          options: {
            presets: ['@babel/preset-env'], // Use preset-env to transpile modern JavaScript into older versions for browser compatibility
          },
        },
      },

      // CSS Loader
      {
        test: /\.css$/, // Match all `.css` files
        use: ['style-loader', 'css-loader'], // Use style-loader to inject CSS into the DOM, and css-loader to bundle CSS files
      },

      // File Loader (for images or other assets)
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // Copy image files to the output directory
      },
    ],
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // Use a custom HTML template
      filename: 'index.html', // Output filename
    }),
  ],

  // Mode: can be 'development' or 'production'
  mode: 'development', // Set to 'production' for production builds
};
