import Vue from 'vue'
import App from './index'

//add this to handle exception
Vue.config.errorHandle = function(err) {
    if (console && console.error) {
        console.error(err)
    }
}

import global_ from '@/components/Global' //引用文件
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面

const app = new Vue(App)
app.$mount()