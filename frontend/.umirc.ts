export default  {
  treeShaking: true,
  cssLoaderOptions:{
    localIdentName: '[local]'
  },
  plugins: [
    ['umi-plugin-react', {
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],

  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    },
  },
}
