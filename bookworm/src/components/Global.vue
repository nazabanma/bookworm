<script>
// ==================================================      全局变量     ======================================================= -->
// 末尾不带反斜杠
const serverSrc = "http://api.wyxs.talesrunner.org";
var userId = "1";
import Vue from 'vue';
let globalData = new Vue({
    data: function() {
        return {
            userId: "",
            userName: "",
            userIcon: ""
        };
    },
    created() {
        this.getName();
    },
    methods: {
        getName() {
            let _this = this;
            wx.request({
                url: serverSrc + "/user/userInfo/" + userId,
                method: "GET",
                success(res) {
                    //console.log(res);
                    _this.userName = res.data.data.nick_name;
                    _this.userIcon = res.data.data.head_img;
                }
            });
        }
    }
});

export default {
    serverSrc, //服务器地址
    userId, //用户账号
    globalData
};

Vue.prototype.globalData = globalData;
</script>