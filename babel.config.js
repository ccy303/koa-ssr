module.exports = api => {
  api.cache(true);
  const presets = [
    '@babel/react',
    [
      '@babel/preset-env',
      {
        modules: 'umd',
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
      },
    ],
  ];
  const plugins = [
    // '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import'
    // "@babel/plugin-proposal-class-properties", // class的方法可以用箭头函数自动bind this
    // ["import", {
    //   libraryName: 'antd',
    //   libraryDirectory: 'es',
    //   style: 'css' // 换成antd-linkfin时换成 true
    // }],
    // ["react-css-modules", {// 达到类似vue的scoped效果
    //   filetypes: {
    //     '.scss': {
    //       syntax: 'postcss-scss',
    //       plugins: [
    //         'postcss-nested',
    //       ],
    //     },
    //   },
    //   generateScopedName: '[local]-[hash:base64:10]',
    // }],
  ];

  return {
    presets,
    plugins,
  };
};
