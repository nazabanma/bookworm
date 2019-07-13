import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
wx.getSystemInfo({
    success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
        console.log(this.globalData.navHeight);
    },
    fail(err) {
        console.log(err);
    }
})