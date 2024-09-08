const path = require('path');

module.exports = {
  entry: './src/index.js', // Arquivo principal
  output: {
    filename: 'bundle.js', // Saída do bundler
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
  },
  mode: 'development',
};
