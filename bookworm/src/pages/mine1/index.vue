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
        <view class="collect">收藏{{myInfo.collect}}</view>
        <view class="address">地址{{myInfo.address}}</view>
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
      <view class="title">全部订单</view>
      <!-- 订单列表 -->
      <view class="order_Items">
        <view class="order_Item">
          <view>
            <image :src="'/static/images/buy_wait.png'" class="order_img" />
          </view>待付款
        </view>
        <view class="order_Item">
          <view>
            <image :src="'/static/images/post_wait.png'" class="order_img" />
          </view>待发货
        </view>
        <view class="order_Item">
          <view>
            <image :src="'/static/images/get_wait.png'" class="order_img" />
          </view>待收货
        </view>
        <view class="order_Item">
          <view>
            <image :src="'/static/images/common_wait.png'" class="order_img" />
          </view>待评价
        </view>
        <view class="order_Item">
          <view>
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
      }
    };
  },

  components: { navigationBar },
  mounted() {
    let _this = this;
    wx.request({
      url: _this.GLOBAL.serverSrc + "/user/userInfo/" + _this.GLOBAL.userId,
      method: "GET",
      success(res) {
        console.log(res.data.data);
        _this.myInfo = res.data.data;
      }
    });
  },
  methods: {
    //-----------------------------------------------------   获取navigation的高度，作为轮播图片的margin-top

    backImg() {}
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.indexbody {
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