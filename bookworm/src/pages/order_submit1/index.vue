<template>
  <div class="index1">
    <!-- 顶部导航栏 -->
    <navigation-bar
      :title="'确认订单'"
      :backVisible="true"
      :fontSize="15"
      :imgsrc="naviImgsrc"
      :linkBack="'/pages/index1/main'"
      :titleColor="'#521d23'"
    ></navigation-bar>
    <view class="content">
      <!---------------------------------------------- 顶部选择地址 --------------------------------------->
      <view class="order_add">
        <view class="order_add__left">
          <image class="addImg" mode="widthFix" :src="addSrc" />
        </view>
        <view class="order_add__content">
          <view class="address__info">
            <view class="address__name">{{addressItem.receiver_name}}</view>
            <view class="address__phone">{{addressItem.receiver_phone}}</view>
          </view>
          <view class="address__add">
            <view class="address__province">{{addressItem.province}}</view>
            <view class="address__city">{{addressItem.city}}</view>
            <view class="address__area">{{addressItem.area}}</view>
            <view class="address__concrete">{{addressItem.concrete_address}}</view>
          </view>
        </view>
        <view class="order_add__right">
          <view class="jump_area">
            <image class="jumpImg" mode="widthFix" :src="jumpSrc" @click="jumpToSele" />
          </view>
        </view>
      </view>
      <!---------------------------------------------- 订单列表 --------------------------------------->
      <view class="orderPanel">
        <view class="orderHead">
          <view class="orderTitle"></view>
        </view>
      </view>
      <view class="orderList" v-for="(item,index) in orderList" :key="index">
        <view class="orderItem">
          <view class="item_left">
            <image class="item__img" :src="item.book_img" />
          </view>
          <view class="item_right">
            <view class="item__info">
              <view class="item_bookname">{{item.book_name}}</view>
              <view class="item_author">{{item.book_author}}</view>
            </view>
            <view class="item__num">
              <view class="item_price">&yen;{{item.book_price}}</view>
              <view class="item_num">&times;{{item.count}}</view>
            </view>
          </view>
          <view class="orderCount">
            <view class="orderCount_num">共{{item.count}}件</view>
            <view class="orderCount_sum">
              小计：
              <view class="sum_Num">{{item.count}}*{{item.book_price}}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="orderFoot">
        <view class="orderDeliver">
          <view class="orderFoot_left">配送方式</view>
          <view class="orderFoot_content">普通配送</view>
          <view class="orderFoot_right">
            <view class="jump_area">
              <image class="jumpImg" mode="widthFix" :src="jumpSrc" />
            </view>
          </view>
        </view>
        <view class="orderRemarks">
          <view class="orderFoot_left">订单备注</view>
          <view class="orderFoot_content">
            <input class="remarks" />
          </view>
        </view>
      </view>
    </view>
    <view class="checkView">
      <view class="check_area">
        <!-- <view
          @click="pickThis(item.address_id)"
          class="circle"
          :class="{' active':pickAddress==item.address_id}"
        ></view>-->
      </view>匿名购买
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
      <view class="orderCount">
        <view class="orderCount_num">共{{}}件</view>
        <view class="orderCount_sum">
          小计：
          <view class="sum_Num">{{}}</view>
        </view>
      </view>
      <view class="addBtn" @click="subOrder">提交订单</view>
    </view>
  </div>
</template>

<script>
import navigationBar from "@/components/acomponents/navigation";
export default {
  data() {
    return {
      naviImgsrc: "/static/images/left.png",
      addSrc: "/static/images/address.png",
      jumpSrc: "/static/images/right.png",
      address_getId: "",
      addressItem: "",
      emptyFlag: -1,
      orderList: []
    };
  },

  components: {
    navigationBar
  },
  created: function() {
    this.orderList = this.GLOBAL.globalConfirmOrder.orderList;
  },
  mounted() {
    //this.getParams();
    this.getData();
    this.orderList = this.GLOBAL.globalConfirmOrder.orderList;
    console.log(this.orderList);
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    // $route: "getParams"

    address_Id: {
      handler: function() {}
    },
    kindList: {
      handler: function() {}
    }
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
            _this.addressItem = data[0];
            _this.emptyFlag = 0;
          } else {
            _this.emptyFlag = 1;
          }
        }
      });
    },
    //=========================================================   跳转到选择地址页
    jumpToSele() {
      let _this = this;
      wx.navigateTo({
        url: "/pages/pickaddress1/main"
      });
    }

    // getParams: function() {
    //   // 取到路由带过来的参数
    //   var routerParams = this.$route.query.pickAddress;
    //   // 将数据放在当前组件的数据内
    //   console.log("传来的参数==" + routerParams);
    //   // this.textareText = routerParams;
    // },
    // getAddress() {
    //   this.address_Id;
    // }
  },
  onLoad: function(options) {
    console.log(options);
    console.log(options.adr);
    this.address_getId = options.adr;
    console.log(this.address_getId);
  }
};
</script>

<style scoped>
.index1 {
  /*Firefox*/
  min-height: -moz-calc(100vh);
  /*chrome safari*/
  min-height: -webkit-calc(100vh);
  /*Standard */
  min-height: calc(100vh);
  background-color: #f5f5f5;
}
.content {
  padding: 0.2rem 0.25rem;
}
/* -------------------------------------------------------------------------------------
                                      地址
---------------------------------------------------------------------------------------*/
.order_add {
  display: flex;
  /* width: 100%; */
  padding: 0.2rem 0.08rem;
  border-radius: 10rpx;
  background-color: white;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
.order_add__left {
  flex: 1;
  min-width: 50rpx;
  height: 50rpx;
  display: inline-block;
  /* background-color: red; */
  text-align: center;
  /* line-height: 50rpx; */
  margin-right: 0.1rem;
  vertical-align: middle;
}
.addImg {
  display: inline-block;
  width: 45rpx;
  height: 50rpx;
}
.order_add__content {
  flex: 7;
  /* background-color: blue; */
}
.order_add__right {
  flex: 1;
  width: 30rpx;
  /* background-color: green; */
  max-width: 30rpx;
  vertical-align: middle;
  text-align: center;
  /* line-height: 60rpx; */
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
.jump_area {
  display: block;
  width: 20rpx;
  height: 40rpx;
}
.jumpImg {
  display: inline-block;
  width: 13rpx;
  height: 26rpx;
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
  font-size: 12px;
  letter-spacing: 2rpx;
}
.address__province,
.address__city,
.address__area,
.address__concrete {
  display: inline-block;
  margin-right: 1em;
  font-size: 12px;
  color: #36282b;
}
</style>
