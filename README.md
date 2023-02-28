# @aidol/svg-icon

A Vue SVG Symbol icon component for svg-sprite-loader, Easy to custom SVG icon 's color and size!!!

# Features

- Ability to manipulate SVG icons. e.g. using `font-size` and `color`.
- Support <a href="https://www.iconfont.cn/" target="_blank">Iconfont svg icons</a>.

# Installation

``` bash
# pnpm
$ pnpm add @aidol/svg-icon

# yarn
$ yarn add @aidol/svg-icon

# npm
$ npm i @aidol/svg-icon
```

# Perparation

`@aidol/svg-icon` 需要配合 `svg-sprite-loader` 使用。所以，如果你的项目没有安装 <a href="https://github.com/JetBrains/svg-sprite-loader#readme" target="_blank"> svg-sprite-loader </a>。
请先安装它。

``` bash
$ npm i svg-sprite-loader -D
```

# Component properties

| Prop name | Default value | Required  | Description | Type |
| :---: | :---: | :---:| :---: | :---: |
| `icon-class` | `undefined` | `true` |  SVG Symbol Id which is SVG filename in `@/icons` folder.  | `string` |
| `className` | `undefined` | `false` | Add Extra class name to SVG Element | `string` |
| `color` | `undefined` | `false` | Define SVG color | `string` |
| `fontSize` | `undefined` | `false` | Define SVG size  | `string` |

# Usage

## Setup

### 在 `@vue/cli (3 || 4.x || 5.x)` 的项目中使用

首先，你需要对 `webpack` 进行如下配置：

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

定义批量导入 `.svg` 模块的入口。

``` js
// src/icons/index.js

import Vue from 'vue'
import SvgIcon from '@aidol/svg-icon' // svg component

// 1. register globally
Vue.component('svg-icon', SvgIcon) 

// 2. require svg files
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().forEach(requireContext)
requireAll(req)
```

最后将这些 `.svg` 文件在项目入口文件 `main.js` 中集中导入。

``` js
import Vue from 'vue'

import '@/icons'

new Vue({
  // ...
})
```

### 在 `Nuxt` 应用中使用

**配置 nuxt.config.js**

``` js
// nuxt.config.js

export default {
  // ...
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isClient }) {
      if (isClient) {
        const svgRule = config.module.rules.find((rule) =>
          rule.test.test('.svg')
        )
        svgRule.exclude = [resolve('assets/icons/svg')]

        // Includes /assets/icons/svg for svg-sprite-loader
        config.module.rules.push({
          test: /\.svg$/,
          include: [resolve('assets/icons/svg')],
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]',
          },
        })
      }
    },
  }
  // ...
}
```

**新建 svg图标存放文件夹**

将你的 `*.svg` 图标文件集中放置在 `~/assets/icons/svg` 文件夹下。

**定义 plugin**

新建 `~/plugins/svg-icon.js` 文件，并在里面写入：

``` js
import Vue from 'vue'
import SvgIcon from '@aidol/svg-icon' // svg component

// 1. register globally
Vue.component('svg-icon', SvgIcon) 

// 2. require svg files
const req = require.context('~/assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().forEach(requireContext)
requireAll(req)
```

**配置 svg-icon 插件至 nuxt.config.js**

``` js
export default {
  // ...

  plugins: [
    // ...
    { src: '~/plugins/svg-icon', mode: 'client' }
  ]

  // ...
}
```

### Done

最后，你就可以像这样使用 `svg icon`：

**demo.vue**

``` vue
<template>
  <svg-icon icon-class="symbolId-name" />
</template>
```

> 注：这里的 `icon-class` 就是你的那些 `svg` 图标文件名。


# CHANGE LOG

<a href="./CHANGELOG.md" target="_blank">CHANGE LOG</a>.
