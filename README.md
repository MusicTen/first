# first 

## 一、多页面项目搭建

### 1.修改目录结构

- public
  - ~~index.html~~
  - favicon.ico
- src
  - assets                          // 静态资源
  - components              // 公共组件
  - pages
    - pageA                  // pageA页面
      - App.vue    
      - pageA.html  // pageA模板文件
      - pageA.js       // pageA入口文件
      - store.js         // pageA状态管理 - vueX
    - pageB
  - router              
    - indexA.js              // pageA - vue-router
    - indexB.js
  - views
    - componentA        // pageA 私有组件
    - componentA
- vue.config.js - @vue/cli 3.x 多页面打包配置。（@vue/cli 3.x需新建）

### 2.新建vue.config.js，修改多页面打包配置

```javascript
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
```

## 二、引入手淘flexible.js，实现了rem自适应

使用步骤：

1. 引用flexible.js

   ```javascript
   import '../../assets/util/flexible'
   ```

2. 安装`postcss-pxtorem`插件,进行相关配置

   ```json
   "postcss": {
       "plugins": {
         "postcss-pxtorem": {
           "rootValue": 75,
           "propList": [
             "*"
           ],
           "selectorBlackList": [
             ".mint-",
             ".picker-",
             ".background-"
           ]
         },
         "autoprefixer": {}
       }
     }
   ```

事实上他做了这几样事情：

- 动态改写`<meta>`标签
- 给`<html>`元素添加`data-dpr`属性，并且动态改写`data-dpr`的值
- 给`<html>`元素添加`font-size`属性，并且动态改写`font-size`的值

> `flexible`实际上就是能过JS来动态改写`meta`标签
>
> `rem`就是相对于根元素`<html>`的`font-size`来做计算