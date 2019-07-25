import Vue from 'vue'
import App from './index'

import global_ from '@/components/Global' //引用文件
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面

const app = new Vue(App)
app.$mount()