---
title: 如何在 Vue 中使用 TypeScript
date: 2017-06-15 22:59:19
tags: 即使要我跟你再耗个十年
---
首先你必须了解了一些 TypeScript Vue 和 webpack

### 新建项目
新建一个如下目录结构的项目
```
vue-ts-simpleDemo/
└─ src/
   └─ components/
```
```
mkdir vue-ts-simpleDemo
cd vue-ts-simpleDemo
mkdir src
cd src
mkdir components
cd .. // 回到根目录准备
```
TypeScript 文件会在`src`目录下，经过编译 - webpack 打包，最后生成`dist`目录下的`bundle.js`文件。而我们的Vue组件都写在`src／components`文件夹中

### 初始化
```
npm init
```
这个操作会有一些配置项需要填写，看不懂或者不想写也没关系，一直enter就可以啦。

它会帮我们生成一个`package.json`文件，需要的话随时可以修改。

### 安装依赖
```
npm install vue

npm install --save-dev typescript webpack ts-loader css-loader vue-loader vue-template-compiler@2.2.1
```

### +添加 TypeScript 配置文件

新建`tsconfig.json`文件，它包含了输入文件的列表和所有编译配置。

文件内容如下：
```
{
    "compilerOptions": {
        "outDir": "./built/",
        "sourceMap": true,
        "strict": true,
        "noImplicitReturns": true,
        "module": "es2015",
        "moduleResolution": "node",
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ]
}
```
### +添加 Webpack 配置文件
和上个步骤类似，我们需要新建一个`webpack.config.js`文件来打包我们的项目。
```
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
```

### 简单🌰

等了好久终于可以开始写代码啦～
创建`src/index.ts`
```
// src/index.ts

import Vue from "vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
    </div>`,
    data: {
        name: "World"
    }
});
```
让我们来看看上面的代码有没有写对。在根目录下创建一个`index.html`

```
<!doctype html>
<html>
<head></head>

<body>
    <div id="app"></div>
</body>
<script src="./dist/build.js"></script>

</html>
```
这时候执行`webpack`，然后在浏览器中打开`index.html`

嗯哼，看起来还不错吧～

### 组件模式🌰

简单🌰对于复杂业务显然不够。还好 Vue 非常灵活，它支持将应用程序分解成组件。

那我们也来声明一个吧：
```
// src/components/Hello.ts

import Vue from "vue";

export default Vue.extend({
    template: `
        <div>
            <div>Hello {{name}}{{exclamationMarks}}</div>
            <button @click="decrement">-</button>
            <button @click="increment">+</button>
        </div>
    `,
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
```
在`src/index.ts`引入组件
```
// src/index.ts

import Vue from "vue";
import HelloComponent from "./components/Hello";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <hello-component :name="name" :initialEnthusiasm="5" />
    </div>
    `,
    data: { name: "World" },
    components: {
        HelloComponent
    }
});
```

### 单文件组件
上面写法没有问题，但是模版一旦多了阅读起来就很麻烦，不利于团队合作开发或复杂组件维护。

Vue 的[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)解决了很多问题。

好在我们在打包配置中指定了`appendTsSuffixTo: [/\.vue$/]`，也依赖了 vue-loader。

我们只需要通过`vue-shims.d.ts`文件，告诉 TypeScript 引入的`.vue`文件应该是怎样的：
```
// src/vue-shims.d.ts

declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}
```

接下来就可以对 Hello 组件进行改造啦！

```
<!-- src/components/Hello.vue -->

<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
```

你可能没有注意到，我们的单文件有以下几个细节

- 申明`<script lang="ts">`来写 TypeScript

- 在`src/index.ts`文件中引入组件需要加`.vue`后缀

- `.ts` 文件是不能写`<style>`的，但在`.vue`內可以愉快地使用独立作用域的 CSS

- 输出时调用`Vue.extend`。如果不写是不会报错，但构建会出错


### 结尾
最近需要学习 TypeScript，跟着[TypeScript Vue Starter](https://github.com/Microsoft/TypeScript-Vue-Starter)开始了 Vue2.0 ＋ TypeScript 2.0 开发模式。


那么，我要怎么开发一个MVC模式的单页应用呢？

这时候就要 vue-router 支持啦

下次讨论～



















