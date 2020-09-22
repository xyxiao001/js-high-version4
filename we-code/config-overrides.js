const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = function override(config, env) {
  // 关于webpack的相关配置
  // 添加编辑器插件
  config.plugins.push(new MonacoWebpackPlugin())
  // 添加 webWorker 的插件, 注意要先处理 web worker
  config.module.rules.unshift({
    test: /\.worker\.ts$/,
    use: {
      loader: 'worker-loader',
      options: {
        inline: 'fallback',
      }
    }
  })
  // 配置 worker 执行环境
  config.output.globalObject = 'this'
  return config;
};