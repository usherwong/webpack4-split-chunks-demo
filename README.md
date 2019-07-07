# webpack4 optimization chunks配置

async vs initial vs all

## async

> chunks : “async” — Optimization over async module

> chunks : "异步" - 只在异步模块进行优化

> chunks : ‘async’ tells webpack that, “Hey, webpack ! I only care about optimization of modules imported dynamically. You can just leave non-dynamic modules as they are.”

> chunks : 'async' 这样的配置告诉webpack, 'hey webpack ! 我只在乎优化动态导入的模块。你可以保留非动态导入模块'

让我们看看一步步发生了什么

- a.js文件里的react是非动态导入模块，保留在a.js文件里。b.js文件里是动态导入的react模块，把react移到了新文件3.bundle.js里.

- 再看lodash这个模块，两个文件里都是动态导入的，所以lodash也会被移到新文件0.bundle.js里

- 最后这个jquery模块，两个文件都是非动态引入，所以jquery会都打包到两个bundle里a.bundle.js和b.bundle.js 都有。

```
import ('react') // 是动态导入
import 'react' // 是非动态导入
```

## initial

> chunks : “initial” — Optimization over Sync Module

> chunks : ‘initial’ tells webpack that,

> “Hey, webpack ! I don’t care about the dynamically imported modules, you can have separate files for each one of them. However, I want all my non-dynamically imported modules in one bundle, although I am ready to share and chunk my non-dynamically imported modules with other files if they also want non-dynamically imported modules.”

> "嗨，webpack！我不在乎动态导入的模块，你可以把她们每一个模块单独拆分出来。然而，我想要我所有的非动态导入模块在一个文件里，但如果他们还想要非动态导入的模块，我准备与其他的文件共享和分块我的非动态导入模块"

让我们看看一步步发生了什么

- a.js文件里的react模块（非动态导入）保留到a.js文件里，b.js文件里的raect模块（动态导入）会单独打包到一个文件里(4.bundle.js)

- a.js和b.js文件里都是动态导入的lodash模块，都会被打包到新文件1.bundle.js里.动态导入模块都会打包到新文件里。

- jquery是被a.js和b.js都引用的非动态导入模块，会被单独打包到node_vendors~a~b.bundle.js.

## all

> chunks : ‘all’ — Optimization over Async and Sync Module

> chunks : ‘all’ tells webpack that,

> “Hey, webpack ! I don’t care if it is a dynamically imported module or non-dynamically imported module. Apply optimization over all of them. But make sure that…naah, you are smart enough to do that !”

> "嗨，webpack！我不在乎是否是动态模块导入。会优化所有的模块，你足够聪明去处理"

让我们看看一步步发生了什么

- react is non-dynamically imported module in a.js and dynamically imported module in b.js. So, it goes to single file 0.bundle.js,which will be referred by both.

- lodash is dynamically imported in both, so it obviously gets a separate file 1.bundle.js.

- jquery is non-dynamically imported in both, so it goes to common shared module node_vendors~a~b.bundle.js,and will be referred by both.

# Bug

测试来看，无论chunks: 模式的initial还是all 。都一样

原文来自这里[Webpack 4 — Mysterious SplitChunks Plugin](https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0)