<template>
  <div class="index1" @touchmove.prevent>
    <!-- <button open-type="getUserInfo" @click="getUser">点我</button> -->
    <view class="show" v-if="showFlag">
      <img :src="imgSrc" class="aniImg" />
      <p class="titleImg" v-if="showFlag">淘書斋</p>
      <view class="msg" v-if="showFlag">
        <p>Copyright©2019侨米工作室提供技术支持</p>
      </view>
    </view>
    <!-- ==================================================     组件：轮播，首页+商品详情页    ======================================================= -->
    <view>
      <swiper
        v-if="!showFlag"
        class="swiperPanel"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
        :easing-function="easingFunction"
        :bindanimationfinish="finish"
      >
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item class="swiperItem">
            <image :src="item" mode="widthFix" class="slide-image" />
            <view></view>
          </swiper-item>
        </block>
      </swiper>
    </view>
    <!-- <img :src="titleSrc" class="titleImg" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        nick_name: "",
        avatar_url: "",
        gender: "",
        province: "",
        city: "",
        country: "",
        language: "",
        login_time: "",
        open_id: "",
        head_img: ""
      },
      showFlag: false,
      count: 1,
      downCount: "",
      timer: null,
      jump: null,
      imgSrc: "",
      imgUrls: [
        this.GLOBAL.serverSrc + "/static/images/Llife.jpg",
        this.GLOBAL.serverSrc + "/static/images/Lread.jpg",
        this.GLOBAL.serverSrc + "/static/images/Lshop.jpg"
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      circular: true,
      easingFunction: "easeInOutCubic"
      // swipFlag: true
      // titleSrc: "/static/images/logoTitle.png"
    };
  },

  mounted() {
    // this.imgSrc = "/static/images/lead_" + this.count + ".png";
    this.imgSrc = "/static/images/lead.gif";
    // let _this = this;
    // setInterval(function() {
    //   for (_this.count = 1; _this.count <= 30; _this.count++) {
    //     this.imgSrc = "/static/images/lead_" + this.count + ".png";
    //   }
    // }, 500);
    // const TIME_COUNT = 30;
    // if (!this.timer) {
    //   this.count = 1;
    //   this.show = false;
    //   this.timer = setInterval(() => {
    //     if (this.count > 0 && this.count <= TIME_COUNT) {
    //       this.count++;
    //       this.imgSrc = "/static/images/lead_" + this.count + ".png";
    //     } else {
    //       clearInterval(this.timer);
    //       this.timer = null;
    //     }
    //   }, 50);
    //}
    const TIME_COUNT = 2;
    if (!this.jump) {
      this.downCount = TIME_COUNT;
      this.jump = setInterval(() => {
        if (this.downCount > 0 && this.downCount <= TIME_COUNT) {
          this.downCount--;
          // this.imgSrc = "/static/images/lead_" + this.count + ".png";
        } else {
          clearInterval(this.jump);
          this.jump = null;
          // this.showFlag = false;
        }
      }, 1450);
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  watch: {
    count: {
      handler: function() {}
    }
  },

  methods: {
    finish() {
      console.log("tiaozhuan");
    },
    getOpenId: function() {
      let appid = "wx9d81b41b418f694f"; //appid需自己提供，此处的appid我随机编写
      let secret = "d395032e675ad629c4876ff0f38247ef"; //secret需自己提供，此处的secret我随机编写
      var that = this;
      var user = wx.getStorageSync("user") || {};
      var userInfo = wx.getStorageSync("userInfo") || {};

      wx.login({
        success: function(res) {
          if (res.code) {
            console.log(res.code);
            wx.getUserInfo({
              success: function(res) {
                var objz = {};
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                //console.log(objz);
                wx.setStorageSync("userInfo", objz); //存储userInfo
              }
            });
            var d = that.globalData; //这里存储了appid、secret、token串
            var l =
              "https://api.weixin.qq.com/sns/jscode2session?appid=" +
              appid +
              "&secret=" +
              secret +
              "&js_code=" +
              res.code +
              "&grant_type=authorization_code";
            wx.request({
              url: l,
              data: {},
              method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function(res) {
                console.log(res);
                var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;
                console.log(obj);
                wx.setStorageSync("user", obj); //存储openid
              }
            });
          } else {
            console.log("获取用户登录态失败！" + res.errMsg);
          }
        }
      });
    },
    getUser: function() {
      let appid = "wx9d81b41b418f694f"; //appid需自己提供，此处的appid我随机编写
      let secret = "d395032e675ad629c4876ff0f38247ef"; //secret需自己提供，此处的secret我随机编写
      let _this = this;
      var user = wx.getStorageSync("user") || {};
      var userInfo = wx.getStorageSync("userInfo") || {};

      wx.login({
        success: function(res) {
          if (res.code) {
            console.log(res.code);
            wx.getUserInfo({
              success: function(res) {
                console.log(res);
                var objz = {};
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                //console.log(objz);
                wx.setStorageSync("userInfo", objz); //存储userInfo
              }
            });
            var d = _this.globalData; //这里存储了appid、secret、token串
            var l =
              "https://api.weixin.qq.com/sns/jscode2session?appid=" +
              appid +
              "&secret=" +
              secret +
              "&js_code=" +
              res.code +
              "&grant_type=authorization_code";
            wx.request({
              url: l,
              data: {},
              method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function(res) {
                console.log(res);
                var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;
                _this.user.open_id = res.data.openid;

                wx.getUserInfo({
                  success: function(res) {
                    var objz = {};
                    objz.avatarUrl = res.userInfo.avatarUrl;
                    objz.nickName = res.userInfo.nickName;
                    _this.user.nick_name = res.userInfo.nickName;
                    _this.user.avatar_url = res.userInfo.avatarUrl;
                    _this.user.gender = res.userInfo.gender;
                    _this.user.province = res.userInfo.province;
                    _this.user.city = res.userInfo.city;
                    _this.user.country = res.userInfo.country;
                    _this.user.login_time = _this.getTime();
                    console.log(_this.user);
                    wx.setStorageSync("userInfo", objz); //存储userInfo

                    _this.userFind(_this.user.open_id);
                  }
                });

                console.log(obj);
                wx.setStorageSync("user", obj); //存储openid
              }
            });
          } else {
            console.log("获取用户登录态失败！" + res.errMsg);
          }
        }
      });
    },
    userFind(open_id) {
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/user/userFind",
        method: "POST",
        data: {
          id: open_id
        },
        success(res) {
          if (res.data.code == 404) {
            _this.userAdd();
          } else {
            console.log("已存在该用户:" + res.data.data.user_id);
            _this.GLOBAL.userId = res.data.data.user_id;
            console.log("全局user_id:" + _this.GLOBAL.userId);
          }
        }
      });
    },
    userAdd() {
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/user/userAdd",
        method: "POST",
        data: _this.user,
        success(res) {
          if (res.data.code == 200) {
            _this.GLOBAL.userId = res.data.user_id;
            console.log("全局user_id:" + _this.GLOBAL.userId);
          } else {
            console.log("添加失败");
          }
        }
      });
    },
    getTime() {
      let date = new Date();
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.index1,
.show {
  /*Firefox*/
  min-height: -moz-calc(100vh);
  min-width: -moz-calc(100vw);
  /*chrome safari*/
  min-height: -webkit-calc(100vh);
  min-width: -webkit-calc(100vw);
  /*Standard */
  min-height: calc(100vh);
  min-width: calc(100vw);
  background-color: white;
}
.show {
  display: inline-block;
  width: 100%;
  text-align: center;
}
.aniImg {
  display: inline-block;
  width: 300rpx;
  height: 300rpx;
  margin: 2.5rem auto 0.6rem;
  /* background: #521d23; */
}
.titleImg {
  width: 100%;
  display: inline-block;
  /* width: 300rpx;
  height: 300rpx; */
  margin: 0 auto;
  font-size: 50px;
  text-align: center;
  color: #521d23;
}
.msg {
  width: 100%;
  height: 1rem;
  /* margin-bottom: 0.3rem auto; */
  font-size: 10px;
  color: #521d23;
  transform: none;
  position: fixed;
  bottom: 0.3rem;
  z-index: 999;
  background-color: white;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  align-content: flex-start;
  justify-content: center; /*水平居中*/
}
/*-------------------------------   轮播 */
.swiperPanel {
  /*Firefox*/
  min-height: -moz-calc(100vh);
  min-width: -moz-calc(100vw);
  /*chrome safari*/
  min-height: -webkit-calc(100vh);
  min-width: -webkit-calc(100vw);
  /*Standard */
  min-height: calc(100vh);
  min-width: calc(100vw);
  background-color: white;
}
/* 轮播 */
.swiperPanel {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
}
.swiperItem {
  display: block;
  height: 100%;
}
.slide-image {
  display: block;
  width: 100%;
  height: 100% !important;
}
.showBar {
  background-color: rgba(204, 204, 204, 0.7);
  color: white;
  font-size: 14px;
  font-weight: 100;
  height: 0.4rem;
  width: 0.5rem;
  border-radius: 0.2rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  text-align: center;
  vertical-align: middle;
  position: absolute;
  bottom: 0.3rem;
  right: 0.2rem;
  letter-spacing: 4rpx;
  z-index: 99;
}
</style>
