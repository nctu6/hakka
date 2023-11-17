const { defineConfig } = require('@vue/cli-service')
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
  }
})
