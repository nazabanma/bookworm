<template>
  <div class="indexbody">
    <!-- 顶部导航栏 -->
    <navigation-bar
      :title="'我的'"
      :backVisible="false"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :titleColor="'#521d23'"
    ></navigation-bar>
    <!--------------------------------------------------------------------- 顶部 -->
    <view class="head" @click="backImg()">
      <img :src="myInfo.head_img" class="headIcon" />

      <view class="name">{{myInfo.nick_name}}</view>
      <view class="collect_address">
        <view class="collect" @click="linkToCollect">收藏{{myInfo.collect}}</view>
        <view class="address" @click="addressTo">地址{{myInfo.address}}</view>
      </view>
      <!-- 背景图 -->
      <view class="back">
        <img :src="myInfo.head_img" mode="widthFix" class="backgroundImg" />
        <!-- 遮罩层 -->
        <img :src="'/static/images/meng.png'" class="backgroundImg2" />
      </view>
    </view>

    <!------------------------------------------------------------------------ 全部订单 -->
    <view class="orders">
      <view class="title" @click="linkkind('all')">全部订单</view>
      <!-- 订单列表 -->
      <view class="order_Items">
        <view
          class="order_Item"
          v-for="(item, index) in typeList"
          :key="index"
          @click="linkkind(item.id)"
        >
          <view>
            <image :src="item.typeimg" class="order_img" />
          </view>
          {{item.type}}
        </view>

        <view class="order_Item">
          <view @click="navTo">
            <image :src="'/static/images/sale_after.png'" class="order_img" />
          </view>退款/售后
        </view>
      </view>
    </view>
    <view class="about_lists">
      <view class="about_list">
        <view class="about_left">
          <image :src="'/static/images/about.png'" class="order_img" />
        </view>
        <view class="more_text">关于淘书斋</view>
        <view class="about_right">
          <image :src="'/static/images/right.png'" class="more" />
        </view>
      </view>
      <view class="about_list">
        <view class="about_left">
          <image :src="'/static/images/opinion.png'" class="order_img" />
        </view>
        <view class="more_text">意见反馈</view>
        <view class="about_right">
          <image :src="'/static/images/right.png'" class="more" />
        </view>
      </view>
    </view>
    <!-- <view></view> -->
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";

import navigationBar from "@/components/acomponents/navigation";
export default {
  data() {
    return {
      headTop: "",
      myInfo: {
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
      typeList: [
        {
          typeimg: "/static/images/buy_wait.png",
          type: "待付款",
          id: "0"
        },
        {
          typeimg: "/static/images/post_wait.png",
          type: "待发货",
          id: "1"
        },
        {
          typeimg: "/static/images/get_wait.png",
          type: "待收货",
          id: "2"
        },
        {
          typeimg: "/static/images/common_wait.png",
          type: "待评价",
          id: "3"
        }
      ]
      // picker: '',
    };
  },

  components: {
    navigationBar
  },
  mounted() {
    let _this = this;
    wx.request({
      url: _this.GLOBAL.serverSrc + "/user/userInfo/" + _this.GLOBAL.userId,
      method: "GET",
      success(res) {
        // console.log(res.data.data);
        _this.myInfo = res.data.data;
      }
    });
  },
  methods: {
    navTo() {
      wx.navigateTo({
        url: "/pages/myorder3/main"
      });
    },

    linkkind(id) {
      wx.navigateTo({
        url: "/pages/myorder3/main?id=" + id
      });
    },

    addressTo() {
      wx.navigateTo({
        url: "/pages/myaddress2/main"
      });
    },
    linkToCollect() {
      wx.navigateTo({
        url: "/pages/mycollect1/main"
      });
    },
    // picker: function() {
    //     globalBus.$emit('val', this.picker)
    // },

    backImg() {}
  },

  created() {
    let _this = this;
    wx.request({
      url: _this.GLOBAL.serverSrc + "/user/userInfo/" + _this.GLOBAL.userId,
      method: "GET",
      success(res) {
        // console.log(res.data.data);
        _this.myInfo = res.data.data;
      }
    });
    // let app = getApp()
  },
  onShow() {
    let _this = this;
    wx.request({
      url: _this.GLOBAL.serverSrc + "/user/userInfo/" + _this.GLOBAL.userId,
      method: "GET",
      success(res) {
        // console.log(res.data.data);
        _this.myInfo = res.data.data;
      }
    });
  }
};
</script>

<style scoped>
.indexbody {
  /*Firefox*/
  min-height: -moz-calc(100vh);
  /*chrome safari*/
  min-height: -webkit-calc(100vh);
  /*Standard */
  min-height: calc(100vh);
  background-color: #f5f5f5;
}
/* ========================  头部 */

.head {
  display: block;
  position: relative;
  height: 400rpx;
  width: 100%;
  overflow: hidden;
  text-align: center;
  /* background-color: red; */
}
/* 背景图片 */

.back {
  height: 400rpx;
  width: 100%;
  margin-top: 40px;
}

.backgroundImg,
.backgroundImg2 {
  position: absolute;
  display: block;
  top: 0;
  width: 100%;
  height: 400rpx;
  overflow: hidden;
  z-index: 0;
  /* background-color: blueviolet; */
}

.backgroundImg2 {
  margin-bottom: 0;
  z-index: 1;
}
/* 头像 */

.headIcon {
  position: relative;
  display: block;
  border-radius: 75rpx;
  width: 150rpx;
  height: 150rpx;
  margin: 0.5rem auto;
  z-index: 2;
}
/* 名字 */

.name {
  display: block;
  position: absolute;
  top: 2.25rem;
  left: 0;
  right: 0;
  color: white;
  font-size: 15px;
  /* background-color: red; */
  z-index: 2;
}
/* 收藏和地址 */

.collect_address {
  display: -webkit-flex;
  display: flex;
  position: absolute;
  top: 3.2rem;
  left: 0;
  right: 0;
  color: white;
  font-size: 15px;
  z-index: 2;
  /* background-color: red; */
}
/* 收藏 */

.collect,
.address {
  flex: 1;
  text-align: center;
}

.orders {
  background-color: white;
  margin: 0.3rem;
  border-radius: 0.2rem;
  padding: 0.3rem;
  color: #36282b;
}

.title {
  font-size: 15px;
}
/* 订单 */

.order_Items {
  width: 100%;
  margin-top: 0.3rem;
  display: -webkit-flex;
  display: flex;
}

.order_Item {
  flex: 1;
  font-size: 10px;
  text-align: center;
}

.order_img {
  display: inline-block;
  margin-bottom: 0.2rem;
}

.order_img:nth-of-type(1) {
  width: 50rpx;
  height: 49rpx;
}

.order_img:nth-of-type(2) {
  width: 50rpx;
  height: 50rpx;
}

.order_img:nth-of-type(3) {
  width: 50rpx;
  height: 49rpx;
}

.order_img:nth-of-type(4) {
  width: 50rpx;
  height: 37rpx;
}

.order_img:nth-of-type(5) {
  width: 45rpx;
  height: 50rpx;
}
/* 关于以及意见 */

.about_lists {
  width: 100%;
  height: 1.6rem;
  padding: 0.15rem 0.36rem;
  background-color: white;
  overflow: hidden;
}

.about_list {
  height: 0.8rem;
  display: block;
  font-size: 15px;
  display: -webkit-flex;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  align-items: center;
  justify-content: center;
}

.about_left,
.about_right {
  display: inline-block;
  flex: 1;
}

.about_list .order_img:nth-of-type(1),
.about_list .order_img:nth-of-type(2) {
  width: 41rpx;
  height: 40rpx;
  margin-bottom: 0;
}

.more_text {
  display: inline-block;
  line-height: 0.4rem;
  flex: 8;
}

.more {
  /* display: inline-block;
        flex: 1; */
  width: 21rpx;
  height: 36rpx;
}
</style>