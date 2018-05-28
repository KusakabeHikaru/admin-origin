import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

// 安装element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

// 入口组件、路由表、vuex
import App from './App'
import router from './router'
import store from './store'

import simulation from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})

// assets和static的区别,assets表示自己写的静态文件和图片，static存放的是第三方的静态资源，
// 最后在打包发布的时候均会被放入打包好的static文件夹中
