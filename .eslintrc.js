module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',//继承标准规则
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    //为0表示忽略某个检查
    // allow paren-less arrow functions,允许箭头函数前面不些括号
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    //开发环境允许debug,生产环境则无
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
