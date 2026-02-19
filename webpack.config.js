const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
        {
        test: /\.module\.s[ac]ss$/i,
        use: [
            'style-loader',
            {
            loader: 'css-loader',
            options: {
                modules: {
                    auto: true,
                    localIdentName: "[name]__[local]__[hash:base64:5]"
                }
            }
            },
            'sass-loader'
        ]
        },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
     {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
     },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
  },
  mode: 'development',
};
