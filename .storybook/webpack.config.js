const path = require('path');

module.exports = async ({ config, mode }) => {

  config.resolve = {
    ...config.resolve,
    alias: {
      "@components": path.resolve(__dirname, "./../src/prod_components"),
      "components": path.resolve(__dirname, "./../src/components"),
      "containers": path.resolve(__dirname, "./../src/containers")
    }
  }

  config.module.rules.push({
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      options: {
          presets: ['@babel/react'],
          plugins: [
              ['import', {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
              }]
          ]
      },
  });

  config.module.rules.push({
      test: /\.less$/,
      loaders: [
          'style-loader',
          'css-loader',
          {
              loader: 'less-loader',
              options: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                },
                javascriptEnabled: true
              }
          }
      ],
      include: [
        path.resolve(__dirname, '../src'),
        /[\\/]node_modules[\\/].*antd/
      ]
  });

  return config;
};
