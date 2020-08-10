# @aidol/svg-icon

`svg sprite` 图标解决方案。

# Installation

``` bash
$ npm i @aidol/svg-icon -S
```

# Usage

``` js
import Vue from 'vue'
import SvgIcon from '@aidol/svg-icon'

Vue.component('SvgIcon', SvgIcon)
```

**demo.vue**

``` vue
<template>
  <svg-icon icon-class="symbolId-name" />
</template>
```

# Tips

`@aidol/svg-icon` 需要配合 `svg-sprite-loader` 使用。

你首先需要对 `webpack` 进行如下配置(以 `@vue/cli` 为例):

``` js
// vue.config.js
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // ...
  chainWebpack(config) {
    // 变更 url-loader 不处理指定文件夹下作为 icon 使用的 svg 文件
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    // 添加 svg-sprite-loader 处理指定文件夹下的 svg 文件
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
}
```

然后，将你的 `.svg` 图标文件放置在 `src/icons/svg` 文件夹下。

定义批量导入 `svg` 模块的入口。

``` js
// src/icons/index.js

import Vue from 'vue'
import SvgIcon from '@aidol/svg-icon' // svg component

Vue.component('svg-icon', SvgIcon) // register globally

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
```

最后将这些 `.svg` 文件在项目入口文件 `main.js` 中集中导入。

``` js
// ...

import '@/icons'

// ...
```