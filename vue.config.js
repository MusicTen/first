let path = require('path')
let glob = require('glob')

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {}, basename, tmp, pathname
  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-3)
    pathname = basename // 正确输出js和html的路径
    entries[pathname] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
      title: tmp[2],
      filename: tmp[2]
    }
  })
  return entries
}

// eslint-disable-next-line no-unused-vars
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: getEntry('./src/pages/**?/*.html'),
  devServer: {
    index: 'index.html'
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  parallel: require('os').cpus().length > 1,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        // 修改它的选项...
        options.attrs = ['img:src', 'link:href', 'audio:src']
        return options
      })
  }
}
