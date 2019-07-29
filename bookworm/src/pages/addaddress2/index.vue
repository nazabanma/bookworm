<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <navigation-bar
      :title="'添加收货地址'"
      :backVisible="true"
      :fontSize="15"
      :imgsrc="naviImgsrc"
      :linkBack="'/pages/myaddress2/main'"
      :linkKind="false"
      :titleColor="'#36282B'"
    ></navigation-bar>
    <view class="userinfo">
      <view class="edited">
        <input
          name="input"
          type="text"
          v-model="address.receiver_name"
          placeholder="请输入名字"
          confirm-type="done"
        />
      </view>
      <view class="edited">
        <input
          maxlength="11"
          v-model="address.receiver_phone"
          placeholder="请输入电话"
          confirm-type="done"
        />
      </view>
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <view class="picker">
          {{address.province}}
          {{address.city}}
          {{address.area}}
        </view>
      </picker>
      <view class="editing">
        <input
          name="input"
          type="text"
          v-model="address.concrete_address"
          placeholder="请输入详细地址"
          confirm-type="done"
        />
      </view>
    </view>

    <view class="setting">
      <view class="edited1">
        <view class="set">设为默认地址</view>
        <view class="icon">
          <switch @change="seted" color="#D2AC6E" :checked="checked" />
        </view>
      </view>
      <view class="edited2">
        <!-- <button @click="del" :disabled="disabled">删除收货地址</button> -->
        <button :disabled="true">删除收货地址</button>
      </view>
    </view>

    <view class="comfirm">
      <view class="opration" @click="add">添加</view>
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
      region: ["福建省", "厦门市", "集美区"],
      customItem: "暂不选择",
      checked: false,
      disabled: false,
      address: {
        receiver_name: "",
        receiver_phone: "",
        concrete_address: "",
        province: "福建省",
        city: "厦门市",
        area: "集美区",
        if_default: "",
        user_id: this.GLOBAL.userId
      }
    };
  },
  components: {
    navigationBar
  },
  //   watch: {
  //     mydisabled: {
  //       handler: function() {}
  //     }
  //   },

  methods: {
    // del() {
    //   let _this = this;
    //   _this.disabled = true;
    //   // console.log(this.address);
    //   wx.request({
    //     url: _this.GLOBAL.serverSrc + "/address/deleteAddress",
    //     method: "POST",
    //     data: {
    //       address_id: _this.address.address_id
    //     },
    //     success(res) {
    //       console.log(res.data);
    //     }
    //   });
    //   wx.showToast({
    //     title: "删除成功！", //提示文字
    //     icon: "none" //图标，支持"success"、"loading"
    //   });
    //   wx.navigateTo({
    //     url: "/pages/myaddress2/main"
    //   });
    // },

    add() {
      let _this = this;
      console.log(this.address);
      wx.request({
        url: _this.GLOBAL.serverSrc + "/address/addAddress",
        method: "POST",
        data: _this.address,
        success(res) {
          console.log(res.data);
        }
      });
      wx.showToast({
        title: "添加成功！", //提示文字
        icon: "none" //图标，支持"success"、"loading"
      });
      wx.navigateTo({
        url: "/pages/myaddress2/main"
      });
    },

    seted: function(e) {
      if (e.mp.detail.value == true) {
        this.address.if_default = 1;
      } else {
        this.address.if_default = 0;
      }
    },

    bindRegionChange: function(e) {
      let address = e.mp.detail.value;

      if (address[0] == "暂不选择") {
        address[0] = "福建省";
        wx.showToast({
          title: "请选择省份哦", //提示文字
          icon: "none" //图标，支持"success"、"loading"
        });
      }
      if (address[1] == "暂不选择") {
        address[1] = "";
      }
      if (address[2] == "暂不选择") {
        address[2] = "";
      }

      this.address.province = address[0];
      this.address.city = address[1];
      this.address.area = address[2];

      this.region[0] = address[0];
      this.region[1] = address[1];
      this.region[2] = address[2];
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
/* ========================  上 */

.userinfo {
  width: 100%;
  /* height: 450rpx; */
  height: auto;
  float: left;
}

.edited {
  width: 100%;
  height: 100rpx;
  /* margin-left: 36rpx; */
  font-size: 30rpx;
  color: #36282b;
  background: white;
  border-top: 1rpx solid rgb(184, 181, 182);
  line-height: 100rpx;
  float: left;
  vertical-align: middle;
  /* border-bottom: 1rpx solid #36282B; */
}

.edited input {
  margin-left: 36rpx;
  margin-top: 25rpx;
  color: #36282b;
  /* line-height: 80rpx; */
}

picker {
  display: block;
  width: 100%;
  height: 100rpx;
  font-size: 30rpx;
  color: #36282b;
  background: white;
  border-top: 1rpx solid rgb(184, 181, 182);
  border-bottom: 1rpx solid rgb(184, 181, 182);
  float: left;
}

picker .picker {
  margin-left: 36rpx;
  line-height: 100rpx;
}

.editing {
  width: 100%;
  height: 150rpx;
  float: left;
  font-size: 24rpx;
  color: #bbacab;
  border-bottom: 1rpx solid rgb(184, 181, 182);
  background: white;
}

.editing input {
  margin-top: 20rpx;
  margin-left: 36rpx;
  color: #bbacab;
}
/* ========================  中 */

.setting {
  float: left;
  margin-top: 20rpx;
  width: 100%;
  height: 200rpx;
  background: #bbacab;
}

.edited1 {
  width: 100%;
  height: 100rpx;
  /* margin-left: 36rpx; */
  font-size: 30rpx;
  color: #36282b;
  background: white;
  border-top: 1rpx solid rgb(184, 181, 182);
  line-height: 100rpx;
  float: left;
}

.set {
  width: 70%;
  float: left;
  height: 100rpx;
  margin-left: 36rpx;
}

switch {
  width: 80rpx;
  height: 40rpx;
  float: left;
}

.edited2 {
  width: 100%;
  height: 100rpx;
  /* margin-left: 36rpx; */
  font-size: 30rpx;
  color: #36282b;
  background: white;
  border-top: 1rpx solid rgb(184, 181, 182);
  border-bottom: 1rpx solid rgb(184, 181, 182);
  line-height: 100rpx;
  /* float: left; */
}

.edited2 button {
  width: 100%;
  padding-left: 36rpx;
  height: 100rpx;
  float: left;
  font-size: 30rpx;
  text-align: left;
  color: #36282b;
  background: white;
  border-top: 1rpx solid rgb(184, 181, 182);
  border-bottom: 1rpx solid rgb(184, 181, 182);
  line-height: 100rpx;
  border-radius: 0;
}
/** 必须提升样式优先权(!important) **/

.edited2 button::after {
  border-radius: 0;
}

.edited2 button[disabled] {
  /* width: 100%;
  padding: 0;
  margin-left: 36rpx; */
  background: rgb(224, 223, 223) !important;
}
/* ========================  下 */

.comfirm {
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  height: 100rpx;
  /* margin-left: 36rpx; */
  font-size: 30rpx;
  color: white;
  background: #d2ac6e;
  text-align: center;
  line-height: 100rpx;
}
</style>