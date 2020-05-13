# @aidol/svg-icon

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
module.exports = {
  // ...
  chainWebpack(config) {
    // 变更 url-loader 不处理指定文件夹下作为icon使用的svg文件
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    // 添加 svg-sprite-loader 处理指定文件夹下的svg文件
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

最后将这些 `.svg` 文件使用 `require.context()` 在项目入口文件 `main.js` 中集中导入。