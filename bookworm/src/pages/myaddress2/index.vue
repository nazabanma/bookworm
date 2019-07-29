<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <navigation-bar
      :title="'我的收货地址'"
      :backVisible="true"
      :fontSize="15"
      :titleColor="'#36282B'"
      :imgsrc="naviImgsrc"
      :linkBack="'/pages/mine1/main'"
      :linkKind="true"
      :tabKind="true"
    >
      <!-- :linkBack="'/pages/mine1/main'" :linkKind="false" -->
    </navigation-bar>

    <view class="list" v-for="(items,index) in addressList" :key="index">
      <view class="panel" @click="edit(items.address_id)">
        <view class="userinfo">
          <view class="username">{{items.receiver_name}}</view>
          <view class="phone">{{items.receiver_phone}}</view>
        </view>
        <view class="address">
          <view>{{items.province}} {{items.city}} {{items.area}} {{items.concrete_address}}</view>
        </view>
      </view>
    </view>
    <view class="addpic">
      <img src="/static/images/add.png" @click="add" />
    </view>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";

import navigationBar from "@/components/acomponents/navigation";

export default {
  data() {
    return {
      naviImgsrc: "/static/images/left.png",
      addressList: []
    };
  },
  components: {
    navigationBar
  },
  mounted() {
    let _this = this;
    wx.request({
      url: _this.GLOBAL.serverSrc + "/address/address/" + _this.GLOBAL.userId,
      method: "GET",
      success(res) {
        // console.log(res.data.data);
        _this.addressList = res.data.data;
      }
    });
  },
  methods: {
    edit(id) {
      wx.navigateTo({
        url: "/pages/editaddress2/main?id=" + id
      });
    },

    add(id) {
      wx.navigateTo({
        url: "/pages/addaddress2/main?id=" + id
      });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.container {
  display: block;
  top: 0px;
  margin: 0;
  /* height: 100%; */
  position: relative;
  width: 100%;
  padding: 0;
  background-color: #f5f5f5;
  min-height: -moz-calc(100vh);
  /*chrome safari*/
  min-height: -webkit-calc(100vh);
  /*Standard */
  min-height: calc(100vh);
}

.container img {
  margin-top: 180rpx;
  width: 400rpx;
  height: 600rpx;
}
/* ========================  头部 */

.panel {
  width: 100%;
  height: 120rpx;
  background: white;
}

.userinfo {
  width: 100%;
  height: 60%;
  float: left;
  text-align: center;
  line-height: 80rpx;
  /* background: pink; */
}

.username {
  float: left;
  margin-left: 36rpx;
  max-width: 25%;
  color: #36282b;
  /* background: blueviolet; */
}

.phone {
  float: left;
  margin-left: 40rpx;
  font-size: 24rpx;
  color: #797273;
  /* background: gainsboro; */
}

.address {
  float: left;
  margin-left: 36rpx;
  width: 100%;
  height: 40%;
  font-size: 24rpx;
  color: #36282b;
  line-height: 40rpx;
  text-align: left;
  /* background: skyblue; */
}

.addpic {
  position: fixed;
  /* left: -moz-calc(50vh - 44rpx); */
  /* left: -webkit-calc(50vh - 44rpx); */
  /* left: calc(50vh - 331rpx); */
  bottom: 60rpx;
  width: 100%;
  height: 88rpx;
  vertical-align: middle;
  text-align: center;
  /* background: steelblue; */
}

.addpic img {
  display: inline-block;
  position: relative;
  top: -176rpx;
  width: 88rpx;
  height: 88rpx;
  /* background: #797273; */
  /* bottom: 60rpx; */
}
</style>