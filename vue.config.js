module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  transpileDependencies: ['quasar'],
  publicPath: process.env.NODE_ENV === 'production'? process.env.BASE_URL:'/',
  productionSourceMap: process.env.NODE_ENV === 'production'? false:true,
};
