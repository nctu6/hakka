const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: `/Hakka_ePaper/paper/paper${process.env.VUE_APP_PAPER_ID}`,
  chainWebpack: config => {
    // 添加一個規則來處理 `.txt` 文件
    config.module
      .rule('txt')
      .test(/\.txt$/)
      .use('raw-loader')
        .loader('raw-loader')
        .end();

    config.module
      .rule('m4a')
      .test(/\.m4a$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          esModule: false,
          name: '[name].[ext]',
          outputPath: 'audio/', // 音频文件的输出目录
        })
        .end();

    // 在生產環境中移除 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization
        .minimizer('terser')
        .use(TerserPlugin, [{
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        }]);
    }
  },
})