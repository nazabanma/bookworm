<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar
      :title="'修改地址'"
      :backVisible="true"
      :linkKind="false"
      :fontSize="18"
      :imgsrc="naviImgsrc"
      :linkBack="'/pages/order_submit1/main'"
      :titleColor="'#521d23'"
    ></navigation-bar>
    <!-- :linkBack="'/pages/index1/main'" -->
    <!-- =======================================  地址列表 ======================================= -->
    <view v-if="emptyFlag==0" class="addressPanel">
      <view class="addressList" v-for="(item,index) in addressList" :key="index">
        <view class="addressItem">
          <view class="address_left">
            <view class="address__info">
              <view class="address__name">{{item.receiver_name}}</view>
              <view class="address__phone">{{item.receiver_phone}}</view>
            </view>
            <view class="address__add">
              <view class="address__province">{{item.province}}</view>
              <view class="address__city">{{item.city}}</view>
              <view class="address__area">{{item.area}}</view>
              <view class="address__concrete">{{item.concrete_address}}</view>
            </view>
          </view>
          <view class="address_right" @click="pickThis(item.address_id)">
            <view class="check_area">
              <view class="circle" :class="{' active':pickAddress==item.address_id}"></view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="emptyFlag!=1" class="tip">
        备注：修改地址会影响物流时效，只能原价修改，付款后只能修改一次。若商品已发货
        、换仓、库存及配送变更等原因，可能会导致修改地址失败，请您谅解。
      </view>
    </view>

    <view v-if="emptyFlag!=1" class="empty"></view>
    <!-- =======================================  缺省页 ======================================= -->
    <view v-if="emptyFlag!=0" class="emptyPanel">
      <image class="empty_img" mode="widthFix" :src="emptyImg" />
      <view v-if="emptyFlag==-1">正在加载，请稍后~</view>
      <view v-if="emptyFlag==1">
        空地址，就是穿越也无法送货上门啊~
        <view class="addView">
          <image class="addAddress" mode="widthFix" :src="addSrc" @click="jumpToAdd" />
        </view>
      </view>
    </view>
    <!-- ==================================================     组件：商品详情页面底部的按钮组合     ======================================================= -->
    <view v-if="emptyFlag==0" class="foot_tabbar">
      <view class="btnLine">
        <view class="cancelBtn" @click="backToOrder">取消</view>
        <view class="addBtn" @click="subChange">提交修改</view>
      </view>
    </view>
    <!-- <view></view>
    <view></view>-->
  </div>
</template>

<script>
import navigationBar from "@/components/acomponents/navigation";
export default {
  data() {
    return {
      naviImgsrc: "/static/images/left.png",
      emptyImg: this.GLOBAL.serverSrc + "/static/images/msg_empty_address.png",
      addSrc: "/static/images/add.png",
      emptyFlag: -1, //判断是否有数据

      addressList: [], //存放地址列表
      pickAddress: -1 //存放选中列表
    };
  },

  components: {
    navigationBar
  },
  mounted() {
    this.getData();
  },
  methods: {
    //=========================================================    获取地址列表
    getData() {
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/address/address/" + _this.GLOBAL.userId,
        method: "GET",
        success(res) {
          // 获取data数据
          let data = res.data.data;
          //获取data长度，判断是否为空
          let code_msg = data.length;
          console.log("数据长度" + code_msg);
          //获取数据，不为空
          if (code_msg) {
            _this.addressList = data;
            _this.emptyFlag = 0;
          } else {
            _this.emptyFlag = 1;
          }
        }
      });
    },
    //=========================================================    单选
    pickThis(id) {
      this.pickAddress = -1;
      this.pickAddress = id;
      //console.log(this.pickAddress);
    },
    //=========================================================    地址不做更改，返回确认订单页
    backToOrder() {
      let _this = this;
      wx.navigateTo({
        url: "/pages/order_submit1/main"
      });
    },

    //=========================================================    地址更改，返回确认订单页
    subChange() {
      let _this = this;
      if (this.pickAddress != -1) {
        // _this.$router.push({
        //   path: "./order_submit1",
        //   query: {
        //     pickAddress: _this.pickAddress
        //   }
        // });
        wx.navigateTo({
          url: "/pages/order_submit1/main?adr=" + _this.pickAddress
        });
      }
    },
    //=========================================================    空地址，跳转到添加页面
    jumpToAdd() {
      let _this = this;
      // wx.navigateTo({
      //   url: "/pages/order_submit1/main"
      // });
      console.log("需要添加jumpToAdd地址");
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
/* -------------------------------------------------------------------------------------
                                      默认与空处理
---------------------------------------------------------------------------------------*/
.index1 {
  /*Firefox*/
  min-height: -moz-calc(94vh);
  /*chrome safari*/
  min-height: -webkit-calc(94vh);
  /*Standard */
  min-height: calc(94vh);
  background-color: #f5f5f5;
}
.empty {
  height: 1rem;
  display: block;
  width: 100%;
  position: relative;
  background: #f5f5f5;
}
.emptyPanel {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #787172;
  text-align: center;
  /*Firefox*/
  height: -moz-calc(92vh);
  /*chrome safari*/
  height: -webkit-calc(92vh);
  /*Standard */
  height: calc(92vh);
}
.empty_img {
  display: inline-block;
  margin: 1rem 0;
}
/* ----------单选按钮 */
.check_area {
  display: inline-block;
  width: 60rpx;
  height: 60rpx;
  margin: 0 auto;
  /* background-color: #f5f5f5; */
}
.circle {
  display: block;
  position: relative;
  width: 30rpx;
  height: 30rpx;
  margin: 13rpx auto;
  /* left: 0;
  right: 0; */
  border-radius: 20rpx;
  border: 1px solid #b9abaa;
}

.circle.active:after {
  position: relative;
  display: block;
  content: "";
  width: 14rpx;
  height: 14rpx;
  margin: 0 auto;
  left: 0rpx;
  top: 6rpx;
  /* bottom: 0.3rem; */
  background: #521d23;
  border: 1px solid #521d23;
  border-radius: 14rpx;
  color: #521d23;
  /* transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1); */
}
.addView {
  display: block;
  margin: 1rem auto;
  /* background: #521d23; */
  text-align: center;
}
.addAddress {
  display: inline-block;
  /* margin: 0.2rem auto; */
  width: 88rpx;
  height: 88rpx;
  vertical-align: middle;
  /* background: red; */
}

/* -------------------------------------------------------------------------------------
                                      卡片
---------------------------------------------------------------------------------------*/
.addressPanel {
  background: #f5f5f5;
}
.tip {
  display: block;
  margin: 0.25rem 0.36rem;
  font-size: 12px;
  color: #d2ac6e;
  letter-spacing: 3rpx;
}
.addressList {
  padding: 0.25rem 0.36rem;
  background-color: white;
  border-bottom: 1px solid #f5f5f5;
}
.addressItem {
  /* background-color: white; */
  display: -webkit-flex;
  display: flex;
}
.address_left {
  flex: 7;
}
.address_right {
  /* background-color: red; */
  flex: 1;
  max-width: 60rpx;
  vertical-align: middle;
  text-align: center;
  line-height: 60rpx;
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
.address__info {
  display: block;
}
.address__add {
  display: block;
  margin-top: 0.15rem;
}
.address__name {
  display: inline-block;
  margin-right: 0.4rem;
  font-size: 15px;
  color: #36282b;
}
.address__phone {
  display: inline-block;
  color: #787172;
  font-size: 14px;
  letter-spacing: 4rpx;
}
.address__province,
.address__city,
.address__area,
.address__concrete {
  display: inline-block;
  margin-right: 1em;
  font-size: 14px;
  color: #36282b;
}

/* -------------------------------------------------------------------------------------
                                      底部
---------------------------------------------------------------------------------------*/
.foot_tabbar {
  height: 1rem;
  width: 100%;
  transform: none;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: #f5f5f5;
  display: -webkit-flex;
  display: flex;
}
.btnLine {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  font-size: 15px;
}
.cancelBtn,
.addBtn {
  flex: 1;
  display: inline-block;
  text-align: center;
  line-height: 16px;
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
  letter-spacing: 2rpx;
}
.cancelBtn {
  border: 1rpx solid #d2ac6e;
  background-color: white;
  color: #d2ac6e;
}
.addBtn {
  border: 1rpx solid #521d23;
  background-color: #521d23;
  color: white;
}
</style>
