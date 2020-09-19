const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = function override(config, env) {
  // 关于webpack的相关配置
  config.plugins.push(new MonacoWebpackPlugin())
  return config;
};