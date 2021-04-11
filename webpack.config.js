module: {
  rules: [
    {
      test: /\.m?js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      exclude: /(node_modules|bower_components)/, // 千万别忘记添加exclude选项,不然运行可能会报错
    },
  ];
}