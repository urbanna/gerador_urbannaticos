module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: false, // Desativa os source maps
  };
  