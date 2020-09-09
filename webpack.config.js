const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')

/**
 * @param {unknown} _env
 * @param {{ mode: string; }} argv
 */
module.exports = (_env, argv) => ({
  plugins: [
    new CleanWebpackPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    // @ts-ignore
    new MiniCssExtractPlugin({ devtool: 'source-map' }),
    new CopyPlugin({
      patterns:
        argv.mode === 'production'
          ? [{ from: './src/manifest.prod.json', to: 'manifest.json' }]
          : [
              { from: './src/manifest.json', to: 'manifest.json' },
              { from: './node_modules/crx-hotreload/hot-reload.js', to: 'hot-reload.js' },
            ],
    }),
    ...(argv.mode === 'production' ? [new ZipPlugin({ filename: 'kapo-screen-chrome.zip' })] : []),
  ],
  devtool: 'inline-source-map',
  entry: {
    contentscript: './src/contentscript.ts',
    background: './src/background.ts',
    style: './src/style.scss',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules|testserver/,
      },

      {
        test: /\.(json)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.scss'],
  },
})
