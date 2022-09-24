module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: process.env.APP_VUE_BACK_SERVER || 'http://localhost:3000',
    disableHostCheck: true
  }
}
