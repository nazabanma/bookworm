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
          <view class="logo">
            <image class="logo_img" :src="logoSrc" />
            <image class="logoTitle_img" :src="logotitleSrc" />
          </view>
        </view>
        <view class="orderList" v-for="(item,index) in orderList" :key="index">
          <view class="orderItem">
            <view class="item_left">
              <image class="item__img" :src="item.book_img" />
            </view>
            <view class="item_right">
              <view class="orderShow">
                <view class="item__info">
                  <view class="item_bookname">《{{item.book_name}}》</view>
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
                  <view class="sum_Num">&yen;{{totalCount[index]}}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="orderFoot">
          <view class="orderDeliver">
            <view class="orderFoot_left">配送方式</view>
            <view class="orderFoot_content">普通配送</view>
            <!-- <view class="orderFoot_right">
              <view class="jump_area">
                <image class="jumpImg" mode="widthFix" :src="jumpSrc" />
              </view>
            </view>-->
          </view>
          <view class="orderRemarks">
            <view class="orderFoot_left">订单备注</view>
            <view class="orderFoot_content">
              <input
                class="remarks"
                placeholder="选填，请先和商家协商一致"
                :value="remarkValue"
                @change="getRemarks"
              />
            </view>
          </view>
        </view>
      </view>
      <!-- <view class="checkView">
        <view class="check_area" @click="pickThis(item.address_id)">
          <view class="circle" :class="{' active':pickFlag}"></view>
        </view>
        <view class="check_lable">匿名购买</view>
      </view>-->
    </view>

    <view v-if="emptyFlag!=1" class="empty"></view>
    <!-- =======================================  缺省页 ======================================= -->
    <!-- <view v-if="emptyFlag!=0" class="emptyPanel">
      <image class="empty_img" mode="widthFix" :src="emptyImg" />
      <view v-if="emptyFlag==-1">正在加载，请稍后~</view>
      <view v-if="emptyFlag==1">
        空地址，就是穿越也无法送货上门啊~
        <view class="addView">
          <image class="addAddress" mode="widthFix" :src="addSrc" @click="jumpToAdd" />
        </view>
      </view>
    </view> -->
    <!-- ==================================================     组件：商品详情页面底部的按钮组合     ======================================================= -->
    <view v-if="emptyFlag==0" class="foot_tabbar">
      <view class="orderCount">
        <view class="orderCount_num">共{{numCount}}件</view>
        <view class="orderCount_sum">
          合计：
          <view class="sum_Num">&yen;{{totalPrice}}</view>
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
      logoSrc: "/static/images/store.png",
      logotitleSrc: "/static/images/logoTitle.png",
      // emptyImg: this.GLOBAL.serverSrc + "/static/images/msg_empty_address.png",
      address_getId: "",
      addressItem: "",
      emptyFlag: -1,
      pickFlag: 0,
      remarkValue: "", //备注
      orderList: [],
      totalCount: [],
      numCount: 0,
      totalPrice: 0
      // orderTest: [
      //   {
      //     book_id: "1",
      //     book_name: "PHP",
      //     book_author: "一哥",
      //     book_img:
      //       "//g-search2.alicdn.com/img/bao/uploaded/i4/i2/288902762/O1CN01zhpNgo1WH2Q2lVDh9_!!0-item_pic.jpg",
      //     count: 7,
      //     book_price: "49.80"
      //   },
      //   {
      //     book_id: "2",
      //     book_name: "PHP",
      //     book_author: "晖哥",
      //     book_img:
      //       "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563335497282&di=e5cd11df01d63c7da949f06aaf768ace&imgtype=0&src=http%3A%2F%2Fimg3m7.ddimg.cn%2F17%2F14%2F1426983047-1_u_1.jpg",
      //     count: 7,
      //     book_price: "49.80"
      //   },
      //   {
      //     book_id: "1",
      //     book_name: "很好的书",
      //     book_author: "一哥",
      //     book_img:
      //       "//g-search2.alicdn.com/img/bao/uploaded/i4/i2/288902762/O1CN01zhpNgo1WH2Q2lVDh9_!!0-item_pic.jpg",
      //     count: 7,
      //     book_price: "49.80"
      //   }
      // ]
    };
  },

  components: {
    navigationBar
  },
  //filters: {
  //   priceFilter: function(value) {
  //     // value = value.toString();
  //     if (!value) return "";
  //     value = value.toString();
  //     let result = parseFloat(value).toFixed(2);
  //     console.log(result);
  //     result = result.toString();
  //     return result;
  //   }
  // },
  created: function() {
    this.orderList = this.GLOBAL.globalConfirmOrder.orderList;
  },
  mounted() {
    //this.getParams();
    this.orderList = this.GLOBAL.globalConfirmOrder.orderList;
    this.getData();
    this.sumCount();
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
    sumCount() {
      let _this = this;
      let length = this.orderList.length;
      let total = 0;
      //console.log("length" + length);
      if (length) {
        _this.totalPrice = 0;
        for (let i = 0; i < length; i++) {
          //单个总价
          this.totalCount[i] =
            this.orderList[i].count * this.orderList[i].book_price;
          this.totalCount[i] = parseFloat(this.totalCount[i]).toFixed(2);
          //多个总价
          total += this.totalCount[i];
          //总件数
          this.numCount += this.orderList[i].count;
        }
        console.log("this.totalPrice" + this.totalPrice);
        this.totalPrice = parseFloat(total).toFixed(2);
        console.log("this.totalPrice" + this.totalPrice);
      }
    },
    //=========================================================   跳转到选择地址页
    jumpToSele() {
      let _this = this;
      wx.navigateTo({
        url: "/pages/pickaddress1/main"
      });
    },
    //=========================================================   获取备注
    getRemarks(event) {
      this.remarkValue = event.mp.detail.value;
    },
    //=========================================================   提交数据
    subOrder() {
      let _this = this;
      let addressId = 1;
      let remarks = this.remarkValue;
      let orderList = this.GLOBAL.globalConfirmOrder.createOrderList;
      // console.log("addressId" + addressId);
      // console.log("remarks" + remarks);
      // console.log(orderList);
      let jsonArr = JSON.stringify(orderList);
      if (orderList.length) {
        //数组中有数据再进行提交
        wx.request({
          url: _this.GLOBAL.serverSrc + "/order/orderCreate",
          method: "POST",
          data: {
            user_id: _this.GLOBAL.userId,
            address_id: addressId,
            remark: remarks,
            order_list: jsonArr
          },
          success(res) {
            console.log(res);
            console.log(addressId);
            console.log(remarks);
            console.log(orderList);
            //_this.reload();
            console.log("subOrder");
          }
        });
      }
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
  height: -moz-calc(83vh);
  /*chrome safari*/
  height: -webkit-calc(83vh);
  /*Standard */
  height: calc(83vh);
}
.empty_img {
  display: inline-block;
  margin-bottom: 1rem;
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
/* -------------------------------------------------------------------------------------
                                      卡片
---------------------------------------------------------------------------------------*/
.orderPanel {
  display: block;
  /* width: 100%; */
  height: auto;
  margin-top: 0.3rem;
  padding: 0.2rem 0.2rem;
  border-radius: 20rpx;
  background-color: white;
  overflow: hidden;
  /* padding: 0 0.3rem 0.1rem; */
}
.orderHead {
  display: -webkit-flex;
  display: flex;
  padding: 0rem 0 0.2rem 0;
}
.logo {
  height: 46rpx;
  flex-basis: 160rpx;
}
/* 图片 */
.logo_img,
.logoTitle_img {
  display: inline-block;
  height: 46rpx;
}
.logo_img {
  width: 50rpx;
}
.logoTitle_img {
  width: 110rpx;
}
/* .orderList {
  padding: 0rem 0 0.2rem 0;
} */
.orderItem {
  display: -webkit-flex;
  display: flex;
  height: 2.5rem;
  width: 100%;
  /* border-radius: 20rpx; */
  margin-bottom: 20rpx;
  background-color: white;
}
.item_left {
  flex: 2;
  display: block;
  /* display: table-cell; */
  /* border: 1px solid gold; */
  /* line-height: 2rem; */
  /* vertical-align: middle; */
  text-align: center;
  width: 2rem;
  max-width: 2.2rem;
  height: 2.5rem;
  /* vertical-align: middle; */
  text-align: center;
  /* line-height: 60rpx; */
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
.item_right {
  flex: 3;
  display: block;
  padding: 0.2rem;
  overflow: hidden;
}
.item__img {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
  max-width: 2rem;
  max-height: 2rem;
}
.orderShow {
  padding-top: 10rpx;
  /* background-color: #f5f5f5; */
  display: -webkit-flex;
  display: flex;
}
/* 左侧信息 */
.item__info {
  display: inline-block;
  width: 100%;
}
.item_bookname {
  font-size: 14px;
  color: #36282b;
}
.item_author {
  font-size: 10px;
  color: #787172;
  margin-top: 20rpx;
  text-indent: 0.5em;
}
/* 右侧数据 */
.item__num {
  display: inline-block;
}
.item_price {
  font-size: 14px;
  color: #36282b;
}
.item_num {
  margin-top: 18rpx;
  font-size: 12px;
  color: #36282b;
  text-align: right;
}
/* 底部小计 */
.orderCount {
  display: table-row;
  /* background-color: #f5f5f5; */
  display: block;
  height: 0.5rem;
  margin-top: 0.8rem;
  margin-bottom: 15rpx;
  text-align: right;
}
.orderCount_num,
.orderCount_sum,
.sum_Num {
  display: inline-block;
  font-size: 12px;
}
.orderCount_num {
  color: #787172;
  margin-right: 0.3rem;
}
.orderCount_sum {
  color: #36282b;
}
.sum_Num {
  color: #bc2b37;
}

/* .orderFoot {
  background-color: #f5f5f5;
} */
.orderDeliver,
.orderRemarks {
  display: block;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.orderFoot_left,
.orderFoot_content {
  display: inline-block;
  height: 0.5rem;
  margin-bottom: 0.3rem;
  /* background-color: bisque; */
  line-height: 0.36rem;
}
.orderFoot_left {
  flex: 1;
  width: 1.4rem;
  max-width: 1.4rem;
  color: #36282b;
}
.orderFoot_content {
  flex: 3;
  color: #787172;
}
/* .orderFoot_right {
}

.jump_area {
}
.jumpImg {
} */

/* 输入框 */
.remarks {
  display: inline-block;
  /* background-color: red; */
  width: 94%;
  height: 0.36rem;
  /* padding: 0rpx 20rpx 0 0; */
}
/* 选择匿名 */
.checkView {
  display: block;
  /* background-color: red; */
  height: 60rpx;
  color: #787172;
  /* vertical-align: top; */
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: center; /*垂直居中*/
  text-align: left;
}
.check_area {
  flex: 1;
  /* background-color: blue; */
  display: inline-block;
  width: 60rpx;
  height: 60rpx;
  margin: 0 20rpx auto 0;
  max-width: 60rpx;
  /* vertical-align: top; */
  /* background-color: #f5f5f5; */
  text-align: left;
}
.check_lable {
  flex: 4;
  /* background-color: blue; */
  display: inline-block;
  /* width: 60rpx; */
  /* height: 60rpx; */
  margin: 0 auto;
  font-size: 10px;
  line-height: 10px;
  /* vertical-align: top; */
  text-align: left;
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
  border-radius: 50%;
  color: #521d23;
  /* transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1); */
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
  background-color: white;
  display: -webkit-flex;
  display: flex;
}
.foot_tabbar .orderCount {
  margin: 0;
  flex: 4;
  height: 100%;
  display: inline-block;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 0.4rem;
  /* background-color: yellow; */
}
.foot_tabbar .orderCount_num,
.foot_tabbar .orderCount_sum,
.foot_tabbar .sum_Num {
  display: inline-block;
  /* background-color: red; */
  /* height: 0.3rem; */
}

.foot_tabbar .orderCount_num {
  font-size: 12px;
  color: #787172;
}
.foot_tabbar .orderCount_sum {
  font-size: 12px;
  color: #36282b;
}
.foot_tabbar .sum_Num {
  font-size: 14px;
  color: #bc2b37;
}
.addBtn {
  flex: 1;
  display: inline-block;
  width: 1.2rem;
  min-width: 1.2rem;
  height: 0.5rem;
  max-height: 0.5rem;
  font-size: 15px;
  border: 1px solid #521d23;
  border-radius: 35rpx;
  background-color: #521d23;
  margin-top: 0.15rem;
  margin-right: 36rpx;
  color: white;
  padding: 15rpx 40rpx 0;
  vertical-align: middle;
  line-height: 15px;
}
</style>
