
```
[CLASS s20 l14]
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./js/vue.js"></script>
  </head>
<body>
  <div id="container">
    <div>{{title}}:
      <span v-text="firstName"></span>
      <span v-html="lastName"></span>
    </div>
    <div v-bind:title="fullName"
      v-bind:class="{active: isActive, otherclass: isOtherclass}"
      :class="[isActiveClass, isOtherClass]"
      :class="`ball${item.id}`"
      :style="{color: activeColor, fontSize: fontSize + 'px'}"
      >
    属性绑定：v-bind:title="fullName" ／ 简写：:title="fullName" ／ 表达式：:title="'表达式' + fullName"
    </div>
    <div>
      双向绑定：
      <input v-model.trim ="firstName" />
      <input v-model="lastName" /> ／
      计算属性：
      {{fullName}} ／
      帧听&过滤器：
      {{nameChangeCount | decimal}}
    </div>
    <div>
      <input v-model="todoListAddValue" />
      <!-- 事件: @click="handleClick"
                @click="handleClick($event, 1)"  带参
                v-on:click="handleClick"
                v-on:click.stop       修饰：阻止冒泡
                v-on:click.prevent    修饰：阻止默认事件
                v-on:click.self       修饰：只对绑定标签有效
                v-on:click.once       修饰：只作用一次
                v-on:keyup.enter      修饰：捕获特定的键
                v-on:keyup.tab
                v-on:keyup.delete
                v-on:keyup.esc
                v-on:keyup.space
                v-on:keyup.up
                v-on:keyup.down
                v-on:keyup.left
                v-on:keyup.right-->
      <button @click="todoListAdd">添加</button>
      <button @click="handleClick">隐藏列表</button>
    </div>
    <!-- v-if:是否渲染  v-show:是否显示-->
    <ul v-if="show">
      <!-- 父向子传参:content ／:index-->
      <!-- 子向父传参:this.$emit('del', this.index) @del="todoListDel"-->
      <todo-item
        v-for="(item, index) of todoList" :key="index"
        :content="item"
        :index="index"
        @del="todoListDel">
        <span solt="soltname"></span>
      </todo-item>
    </ul>
  </div>
  <script>
  // 全局组件
  // Vue.component('todo-item', {
  //   template: '<li>ddd</li>'
  // })
  // 局部组件
  var TodoItem = {
    props: ['content', 'index'],
    template: '<li @click="handleDel"><solt id="soltname"/>{{content}}</li>',
    methods: {
      handleDel: function () { this.$emit('del', this.index) }
    }
  }

  new Vue({
    el: "#container", // 挂载点
    data: {
      title: "SB",
      firstName: '王',
      lastName: '样',
      nameChangeCount: 0,
      show: true,
      todoList: [],
      todoListAddValue: 'hello'
    },
    // 注删局部组件
    components: {
      'todo-item': TodoItem
    },
    // 初始化
    mounted () {
      this.$nextTick(() => {})  // DOM更新是异步的，依赖DOM数据的操作应放在$nextTick发生后  
    },
    // 方法集
    methods: {
      handleClick: function () { this.show = !this.show },
      todoListAdd: function () { this.todoList.push(this.todoListAddValue) },
      todoListDel: function (index) { this.todoList.splice(index, 1) }
    },
    // 过滤器
    filters: {
      decimal: function (value) { return value.toFixed(2) }
    },
    // 计算属性
    computed: {
      fullName: function () { return this.firstName + ' ' + this.lastName },
      ssl: {
        get: function(){ return {1: '禁用', 2: '启用', 3: '强制'}[this.sslIndex] },
        set: function(val){ this.sslIndex = val }
      }
    },
    // 帧听器
    watch: {
      // 数据属性
      firstName: function () { this.nameChangeCount ++ },
      // 计算属性
      fullName: function () { this.nameChangeCount ++ },
      "status": {
        deep: true, // 是否深入监听
        immediate: true, // 是否立即执行handler默认false
        handler: function (status) { }
      }
    }
  })
  </script>
</body>
</html>
```




# Quick start

It is recommended to install `docsify-cli` globally, which helps initializing and previewing the website locally.

```bash
npm i docsify-cli -g
```

## Initialize

If you want to write the documentation in the `./docs` subdirectory, you can use the `init` command.

```bash
docsify init ./docs
```

## Writing content

After the `init` is complete, you can see the file list in the `./docs` subdirectory.

* `index.html` as the entry file
* `README.md` as the home page
* `.nojekyll` prevents GitHub Pages from ignoring files that begin with an underscore

You can easily update the documentation in `./docs/README.md`, of course you can add [more pages](more-pages.md).

## Preview your site

Run the local server with `docsify serve`. You can preview your site in your browser on `http://localhost:3000`.

```bash
docsify serve docs
```

?> For more use cases of `docsify-cli`, head over to the [docsify-cli documentation](https://github.com/docsifyjs/docsify-cli).

## Manual initialization

If you don't like `npm` or have trouble installing the tool, you can manually create `index.html`:

```html
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/themes/vue.css" />
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      //...
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
</body>
</html>
```

### Specifying docsify versions

?> Note that in both of the examples below, docsify URLs will need to be manually updated when a new major version of docsify is released (e.g. `v4.x.x` => `v5.x.x`). Check the docsify website periodically to see if a new major version has been released.

Specifying a major version in the URL (`@4`) will allow your site will receive non-breaking enhancements (i.e. "minor" updates) and bug fixes (i.e. "patch" updates) automatically. This is the recommended way to load docsify resources.

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/themes/vue.css" />
<script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
```

If you prefer to lock docsify to a specific version, specify the full version after the `@` symbol in the URL. This is the safest way to ensure your site will look and behave the same way regardless of any changes made to future versions of docsify.

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4.11.4/themes/vue.css">
<script src="//cdn.jsdelivr.net/npm/docsify@4.11.4"></script>
```

### Manually preview your site

If you installed python on your system, you can easily use it to run a static server to preview your site.

```bash
cd docs && python -m SimpleHTTPServer 3000
```

## Loading dialog

If you want, you can show a loading dialog before docsify starts to render your documentation:

```html
<!-- index.html -->

<div id="app">Please wait...</div>
```

You should set the `data-app` attribute if you changed `el`:

```html
<!-- index.html -->

<div data-app id="main">Please wait...</div>

  <script>
    window.$docsify = {
      el: '#main'
    }
  </script>
```

Compare [el configuration](configuration.md#el).
