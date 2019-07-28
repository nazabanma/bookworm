<script>
// ==================================================      全局变量     ======================================================= -->
// 末尾不带反斜杠
const serverSrc = "http://api.wyxs.talesrunner.org";
var userId = "1";
import Vue from "vue";
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

let globalConfirmOrder = new Vue({
  data: function() {
    return {
      orderList: [],
      createOrderList: [],
      commentList: []
    };
  }
});

 function imgCutApart(imgArr) {
  let Imgarry = imgArr.split(";");
  //console.log(Imgarry);
  return Imgarry[0];
};

export default {
  serverSrc, //服务器地址
  userId, //用户账号
  globalData,
  globalConfirmOrder, //用于购物车到确认订单的订单数组
  imgCutApart
};

Vue.prototype.globalData = globalData;

Vue.prototype.globalConfirmOrder = globalConfirmOrder;

Vue.prototype.imgCutApart=imgCutApart;
// 调取id ：this.GLOBAL.userId
// 调取用户名 ： this.GLOBAL.globalData.userName;

//订单 this.GLOBAL.globalConfirmOrder.orderList;
//分割图片： this.GLOBAL.imgCutApart;
</script>