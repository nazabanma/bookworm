import Vue from 'vue'
import App from './index'


import global_ from '@/components/Global' //引用文件
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面


// add this to handle exception
Vue.config.errorHandler = function(err) {
    if (console && console.error) {
        console.error(err)
    }
}

const app = new Vue(App)
app.$mount()