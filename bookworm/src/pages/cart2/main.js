import Vue from 'vue'
import App from './index'

import global_ from '@/components/Global' //引用文件
Vue.prototype.GLOBAL = global_ //加载到Vue实例上

//add this to handle exception
Vue.config.errorHandle = function(err) {
    if (console && console.error) {
        console.error(err)
    }
}

const app = new Vue(App)
app.$mount()