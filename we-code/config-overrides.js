const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = function override(config, env) {
  // 关于webpack的相关配置
  // 添加编辑器插件
  config.plugins.push(new MonacoWebpackPlugin({
    languages:["javascript", "typescript"],
    features:['accessibilityHelp', 'anchorSelect', 'bracketMatching', 'caretOperations', 'clipboard', 'codeAction', 'codelens', 'colorDetector', 'comment', 'contextmenu', 'coreCommands', 'cursorUndo', 'dnd', 'find', 'folding', 'fontZoom', 'format', 'gotoError', 'gotoLine', 'gotoSymbol', 'hover', 'iPadShowKeyboard', 'inPlaceReplace', 'indentation', 'inspectTokens', 'linesOperations', 'links', 'multicursor', 'onTypeRename', 'parameterHints', 'quickCommand', 'quickHelp', 'quickOutline', 'referenceSearch', 'rename', 'smartSelect', 'snippets', 'suggest', 'toggleHighContrast', 'toggleTabFocusMode', 'transpose', 'unusualLineTerminators', 'viewportSemanticTokens', 'wordHighlighter', 'wordOperations', 'wordPartOperations']
  }))
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