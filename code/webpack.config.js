module.exports = {
  entry: './client.jsx',
  output: {
    path: __dirname +'/public',
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
         presets: ['es2015', 'react']
      }
      }
    ]
  }
};