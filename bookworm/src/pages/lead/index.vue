<template>
  <div class="index1" @touchmove.prevent>
    <view class="show" v-if="showFlag">
      <img :src="imgSrc" class="aniImg" />
      <view class="titleImg">
        <p v-if="showFlag" open-type="getUserInfo" @click="getUser">淘書斋</p>
        <img :src="clickSrc" class="tip" />
      </view>
      <view class="msg" v-if="showFlag">
        <p>Copyright©2019侨米工作室提供技术支持</p>
      </view>
    </view>
    <!-- ==================================================     组件：轮播，首页+商品详情页    ======================================================= -->
    <view>
      <swiper
        v-if="!showFlag&&swiperFlag"
        class="swiperPanel"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
        :easing-function="easingFunction"
      >
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item class="swiperItem">
            <image :src="item" mode="widthFix" class="slide-image" />
            <view class="fontView">
              <img :src="fontSrc[index][0]" mode="widthFix" class="fontImg font1" />
              <img :src="fontSrc[index][1]" mode="widthFix" class="fontImg font2" />
              <img :src="fontSrc[index][2]" mode="widthFix" class="fontImg font3" />
            </view>
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
      showFlag: true,
      swiperFlag: false,
      totalFlag: false,
      //count: 1,
      //downCount: "",
      //timer: null,
      // jump: null,
      downCount2: 0,
      jumpToIndex: null,
      imgSrc: "",
      imgUrls: [
        this.GLOBAL.serverSrc + "/static/images/Llife.jpg",
        this.GLOBAL.serverSrc + "/static/images/Lread.jpg",
        this.GLOBAL.serverSrc + "/static/images/Lshop.jpg"
      ],
      clickSrc: "/static/images/click.png",
      fontSrc: [
        [
          "/static/images/l_man.png",
          "/static/images/l_sheng.png",
          "/static/images/l_huo.png"
        ],
        [
          "/static/images/l_jing.png",
          "/static/images/l_yue.png",
          "/static/images/l_du.png"
        ],
        [
          "/static/images/l_xaing.png",
          "/static/images/l_gou.png",
          "/static/images/l_wu.png"
        ]
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 2000, //自动切换时间间隔
      duration: 1500, //滑动动画时长
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
    // }
    // const TIME_COUNT = 1;

    // if (!this.jump) {
    //   this.downCount = TIME_COUNT;
    //   this.downCount2 = TIME_COUNT_2;
    //   this.jump = setInterval(() => {
    //     if (this.downCount > 0 && this.downCount <= TIME_COUNT) {
    //       this.downCount--;
    //       //this.imgSrc = "/static/images/lead_" + this.count + ".png";
    //     } else {
    //       // this.showFlag = false;
    //       clearInterval(this.jump);
    //       this.jump = null;
    //       // this.swiperFlag = true;
    //     }
    //   }, 1500);
    // }
  },
  beforeDestroy() {
    if (this.timer || this.jumpToIndex) {
      //clearInterval(this.timer);
      clearInterval(this.jumpToIndex);
    }
  },
  watch: {
    count: {
      handler: function() {}
    },
    showFlag: {
      handler: function(newValue, oldValue) {
        console.log(this.totalFlag);
        if (this.totalFlag) {
          this.swiperFlag = true;
          this.jumpIndex();
        }
      }
    }
  },

  methods: {
    jumpIndex() {
      let _this = this;
      console.log("this.swiperFlag" + this.swiperFlag);
      if (this.swiperFlag) {
        const TIME_COUNT_2 = 5;
        this.downCount2 = TIME_COUNT_2;
        this.jumpToIndex = setInterval(() => {
          if (_this.downCount2 > 0 && _this.downCount2 <= TIME_COUNT_2) {
            _this.downCount2--;
            console.log("this.downCount2" + _this.downCount2);
            console.log(_this.downCount2);
          } else {
            wx.switchTab({
              url: "/pages/index1/main"
            });
            console.log("_this.downCount2结束");
            clearInterval(_this.jumpToIndex);

            _this.jumpToIndex = null;
            _this.swiperFlag = false;
          }
        }, 1500);
      }
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
      this.showFlag = false;
      this.totalFlag = true;
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
                    _this.user.head_img = res.userInfo.avatarUrl;
                    _this.user.gender = res.userInfo.gender;
                    _this.user.province = res.userInfo.province;
                    _this.user.city = res.userInfo.city;
                    _this.user.country = res.userInfo.country;
                    _this.user.login_time = _this.getTime();
                    _this.avatar_url=res.userInfo.avatarUrl;
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
  line-height: 60rpx;
  text-align: center;
  color: #521d23;
}
.tip {
  display: block;
  width: 45rpx;
  height: 45rpx;
  margin-top: 0.3rem;
  /* margin-left: 6rem; */
  /* float: right; */
  position: fixed;
  /* bottom: 0.3rem; */
  right: 1.8rem;
  /* right: 0.5rem; */
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
  z-index: 9;
}
.swiperItem {
  display: block;
  height: 100%;
  z-index: 9;
}
.slide-image {
  display: block;
  width: 100%;
  height: 100% !important;
  z-index: 9;
}

/* 文字部分 */
.fontView {
  /* height: 6rem; */
  width: 100%;
  text-align: center;
  vertical-align: middle;
  position: absolute;
  /* background-color: red; */
  top: 2.5rem;
  bottom: 3rem;
  left: 0;
  right: 0;
  /* margin: 2.5rem auto 0.6rem; */
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  align-items: center; /*垂直居中*/
  align-content: flex-start;
  justify-content: center;
  z-index: 99;
  padding: 0;
  /* 250rpx
  64rpx
  54rpx */
}
.fontImg {
  display: block;
  width: 75rpx;
  height: 70rpx;
  /* background-color: red; */
  /* z-index: 99; */
}
.font1 {
  margin-top: 0;
}
.font2 {
  margin-top: 64rpx;
}
.font3 {
  margin-top: 54rpx;
}
</style>
