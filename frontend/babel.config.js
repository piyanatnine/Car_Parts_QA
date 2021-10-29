module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? "/"+ process.env.CI_PROJECT_NAME + '/'
    : '/'
}
