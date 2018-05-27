
## 前言

一个包含 `vue-router`的简单demos，从第一个demo开始，依次深入学习，即可快速上手强大的`vue-router`。

## 如何使用
 

 1. 安装模块`pure` 或 `http-server`来启动服务器

    `npm install -g puer` or `npm install -g http-server`

 2. 克隆仓库

 3. 启动服务
    `http-server -p 8000` or `puer -p 8000`,浏览器自动打开 `localhost:8000`

##  什么是`Vue-router`

`vue.js`官方的路由，深度结合了vue.js核心内容，可以很方便的创建单页面应用(PWA)，具有如下特点:

 - 嵌套路由/视图
 - 模块化、基于组件的配置
 - 路由参数、查询
 - 与`vue.js`一样的视图过渡效果

[github source][1]
## Demo 01 - start 

一个快速上手`vue-router`的例子

index.html
```html
  <ul>
    <router-link to="/home" tag="li">
      <a>/home</a>
    </router-link>
    <router-link to="/about" tag="li">
      <a>/about</a>
    </router-link>
  </ul>
  
  <router-view></router-view>
```
js file

```js
const Home = {template: '<div>Home page</div>'}
const About = {template: '<div>About page</div>'}
const router = new VueRouter({
  routes: [
    {path:'/home',component:Home},
    {path:'/about',component:About},
  ]
})
new Vue({
  router,
}).$mount('#app')
```

## Demo 02 - dynamic router

动态路由匹配，匹配同一个路由下的子路由，如`/about/xin`和`/about/mine`,`:id` 为参数

index.html
```html
<ul>
    <router-link to="/about/mint" tag="li">
      <a>/about/mint</a>
    </router-link>
    <router-link to="/about/xin" tag="li">
      <a>/about/xin</a>
    </router-link>
  </ul>
  
  <router-view></router-view>
```
js file

```js
const About = {template: '<div>About page: {{$route.params.id}}</div>'}
const router = new VueRouter({
  routes: [
    {path:'/about/:id',component:About},
  ]
})
new Vue({
  router,
}).$mount('#app')
```


## Demo 03 - nested router

嵌套路由

index.html
```html
<ul>
    <router-link to="/" tag="li">
      <a>主页</a>
    </router-link>
    <router-link to="/about/mint" tag="li">
      <a>/about/mint</a>
    </router-link>
    <router-link to="/about/mint/profile" tag="li">
      <a>/about/mint/profile</a>
    </router-link>

    <router-link to="/about/xin" tag="li">
      <a>/about/xin</a>
    </router-link>
    <router-link to="/about/xin/edit" tag="li">
      <a>/about/xin/edit</a>
    </router-link>
  </ul>

  <router-view></router-view>
```
js file

```js
const Home = {template: '<div>Home page</div>'}
const AboutProfile = {template: '<div>AboutProfile</div>'}
const AboutEdit = {template: '<div>AboutEdit</div>'}
const About = {
  template: `
  <div>
    {{$route.params.id}}
    <router-view></router-view>
  </div>
  `
}
const router = new VueRouter({
  routes: [
    {path:'/home',component:Home},
    {
      path:'/about/:id',
      component:About,
      children: [
        {path:'profile',component: AboutProfile,},
        {path:'edit',component: AboutEdit,}
      ]
    },
  ]
})
new Vue({
  router,
}).$mount('#app')
```


## Demo 04 - nested router children router

嵌套路由，通过在一个路由里面设置`children`，即可嵌套路由，子路由下的嵌套设置与主路由的设置是一样的

index.html
```html
<ul>
    <router-link to="/about" tag="li">
      <a>About</a>
    </router-link>
    <router-link to="/user" tag="li">
      <a>User</a>
    </router-link>
  </ul>
  <div>
    <router-view></router-view>
  </div>
```
js file

```js
const About = {
  template: `<div>About</div>`
}
const User = {
  template: `
    <div>
      <h2>user-{{ $route.params.id }}</h2> 
      <router-view></router-view>
    </div>
  `
}
const UserStart = {
  template: `
    <div>
      <router-link to="/user/xin" tag="li">
        <a>user-xin</a>
      </router-link>
      <router-link to="/user/mint" tag="li">
        <a>user-mint</a>
      </router-link>
    </div>
  `
}
const UserProfile = {
  // /user/xin
  template: `
    <div>
      <router-link to="/user/xin/edit" tag="li">
        <a>user-xin-edit</a>
      </router-link>
      <router-link to="/user/mint/edit" tag="li">
        <a>user-mint-edit</a>
      </router-link>
    </div>
  `
}
const router = new VueRouter({
  routes: [
    {path: '/about', component: About},
    {path: '/user', component: User,
      children: [
        {path: '', component: UserStart},
        {path: ':id', component: UserProfile},
    ]}
  ]
})
new Vue({
  router,
}).$mount('#app')
```


## Demo 05 - nested router with query params

嵌套路由，带查询参数，`$route.query`下为所查询的参数，通过`:to`绑定参数，与`to`功能一致

index.html
```html
<ul>
    <router-link to="/about" tag="li">
      <a>About</a>
    </router-link>
    <router-link to="/user" tag="li">
      <a>User</a>
    </router-link>
  </ul>
  <div>
    <router-view></router-view>
  </div>
```
js file

```js
const About = {
  template: `<div>About</div>`
}
const User = {
  template: `
    <div>
     <h2>user-{{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
const UserStart = {
  template: `
    <div>
      <router-link to="/user/xin" tag="li">
        <a>user-xin</a>
      </router-link>
      <router-link to="/user/mint" tag="li">
        <a>user-mint</a>
      </router-link>
      <router-view></router-view>
    </div>
  `
}
const UserProfile = {
  // /user/xin
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  template: `
    <div>
      <p>id: {{id}}</p>
      <router-link tag="button" :to="{name: 'userEdit',params:{id},query:{local:'zh-cn',limit:100}}">
        edit
      </router-link>
    </div>
  `
}
const UserEdit = {
  // /user/xin/edit
  template: `
    <div>
      <p>local: {{$route.query.local}}</p>
      <p>limit: {{$route.query.limit}}</p>
    </div>
  `
}
const router = new VueRouter({
  routes: [
    {path: '/about', component: About},
    {path: '/user', component: User,
      children: [
        {path: '', component: UserStart},
        {path: ':id', component: UserProfile},
        {path: ':id/edit', component: UserEdit,name:'userEdit'},
    ]}
  ]
})
```


## Demo 06 - programed nav router

`this.$router.push('/')`与` <router-link to="/"> </router-link>`功能一致

index.html
```html
  <ul>
    <router-link to="/about/mint" tag="li">
      <a>/about/mint</a>
    </router-link>
    <router-link to="/about/xin" tag="li">
      <a>/about/xin</a>
    </router-link>
  </ul>
  <button @click="nav2home">home</button>
  
  <router-view></router-view>
```
js file

```js
const Home = {
  template: `
  <div>Home page</div>
  `,
}
const About = {template: '<div>About page: {{$route.params.id}}</div>'}
const router = new VueRouter({
  routes: [
    {path:'/home',component:Home},
    {path:'/about/:id',component:About},
  ]
})
new Vue({
  router,
  methods: {
    nav2home() {
      this.$router.push('/')
    }
  }
}).$mount('#app')
```


## Demo 07 - named router

可以通过给路由命名，并通过绑定属性`:to`的方式来定义路由

index.html
```html
  <ul>
      <router-link :to="{name: 'user',params:{userId:26}}" tag="li">
        <a>/user/26</a>
      </router-link>
    <router-link to="/about/mint" tag="li">
      <a>/about/mint</a>
    </router-link>
    <router-link to="/about/xin" tag="li">
      <a>/about/xin</a>
    </router-link>
  </ul>
  <button @click="nav2home">home</button>
  
  <router-view></router-view>
```
js file

```js
const User = {
  template: `
  <div>user page</div>
  `,
}
const About = {template: '<div>About page: {{$route.params.id}}</div>'}
const router = new VueRouter({
  routes: [
    {
      path:'/user/:userId',
      component: User,
      name: 'user'
    },
    {path:'/about/:id',component:About},
  ]
})
new Vue({
  router,
  methods: {
    nav2home() {
      console.log(this.$router);
      this.$router.push('/')
    }
  }
}).$mount('#app')
```


## Demo 08 - named views 

命名视图，可以指定多个`<router-view>`来渲染显示视图，并可设置默认视图

index.html
```html
  <ul>
     <router-link to="/" tag="li"><a>/</a></router-link>
     <router-link to="/my" tag="li"><a>/my</a></router-link>
  </ul>
  
  <router-view class="view"></router-view>
  <router-view class="view" name="a"></router-view>
  <router-view class="view" name="b"></router-view>
```
js file

```js
const Dasiy = {template: `<div>1. Daisy</div>`};
const Lily = {template: `<div>2. Lily</div>`};
const Violet = {template: `<div>3. Violet</div>`};
const router = new VueRouter({
  routes: [{
    path: '/',
    components: {
      default: Dasiy, // default router
      a: Lily,
      b: Violet,
    }
  },
  {
    path: '/my',
    components: {
      default: Lily, // default router
      a: Violet,
      b: Dasiy,
    }
  }]
})
router.push('/')
new Vue({
  router,
}).$mount('#app')
```


## Demo 09 - named views with nested router

嵌套路由中使用命名视图

index.html
```html
 <div class="router-view">
     <router-view></router-view>
   </div>
```
js file

```js
const Navbar = {
  template: `
  <div>
    <router-link to="/user/phone">phone</router-link>
    <router-link to="/user/email">email</router-link>
  </div>
  `
}
// 添加了普通组件nav
const UserDetail = {
  template: `
    <div>
      <Navbar></Navbar>
      <router-view ></router-view>
      <!-- 下面这个不一定会渲染-->
      <router-view name="help"></router-view>
    </div>
  `,
  components: {Navbar}
}
// 路由匹配 /user/phone
const UserPhone = {
  template: `
    <div>
      My phone
    </div>
  `
}
// 路由匹配 /user/email
const UserEmail = {
  template: `
    <div>
      My email
    </div>
  `
}
const UserEmailhelp = {
  template: `
    <div>
      My email help
    </div>
  `
}
const router = new VueRouter({
  routes: [
    {
      path: '/user',
      component: UserDetail,
      children: [
        {path: 'phone', component: UserPhone},
        {
          path: 'email',
          // 路由匹配到/user/email时，当有多个router-view时
          // 将会根据视图的别名分别进行渲染，没有别名渲染默认的模板
          components: {
            default: UserEmail,
            help: UserEmailhelp,
          }
        }
      ]
    }
  ]
})
router.push('/user')
new Vue({
  router,
}).$mount('#app')
```

## Demo 10 - redirect

路由的重定向，访问`/about`将会跳转到`/xin`

index.html
```html
  <ul>
    <router-link to="/about" tag="li">
      <a>/about => /xin</a>
    </router-link>
  </ul>
  
  <router-view></router-view>
```
js file

```js
const About = {template: '<div>About page</div>'}
const Xin = {template: '<div>Xin page</div>'}
const router = new VueRouter({
  routes: [
    {path:'/about',redirect: '/xin'},
    {path:'/xin',component:Xin},
  ]
})
router.push('/')
new Vue({
  router,
}).$mount('#app')
```


## Demo 11 - alais

路由的别名,访问`/about`与`/xin`的内容是一样的，共用一个组件

index.html
```html
<ul>
    <router-link to="/about" tag="li">
      <a>/about</a>
    </router-link>
    <router-link to="/xin" tag="li">
      <a>/xin</a>
    </router-link>
  </ul>
  
  <router-view></router-view>
```
js file

```js
const About = {template: '<div>About page</div>'}
const Xin = {template: '<div>Xin page</div>'}
const router = new VueRouter({
  routes: [
    {path: '/about', component: About, alias: '/xin'}
  ]
})
router.push('/')
new Vue({
  router,
}).$mount('#app')
```


  [1]: https://github.com/XinChou16/vue-demo/tree/master/vue-router-demo