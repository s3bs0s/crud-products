const path = require('path')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname + '/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        exclude: /node_module/,
        use: ['css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_module/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
}