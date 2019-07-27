<template>
  <div>
    <!-- <view v-if="isshow"> -->
    <view>
      <view class="cart" v-for="(items,index) in bookList" :key="index">
        <view class="top">
          <img src="/static/images/mime2.png" />
          <view class="shopname">淘書斋</view>
          <view class="result">
            <view class="res" v-if="items.order_state_id ==0">等待买家付款</view>
            <view class="res" v-else>交易成功</view>
          </view>
        </view>
        
          <view v-for="(item,k) in items.item" :key="k" class="middlePanel">
            <view class="middle">
              <view class="imgs">
                <img :src="item.book_img" alt />
                <!-- <img alt=""> -->
              </view>
              <view class="name">《{{item.book_name}}》</view>
              <view class="right">
                <span class="price">&yen; {{item.price}}</span>
                <span class="num">&times; {{item.count}}</span>
              </view>
            </view>
          </view>
         

        <view class="allcount">
          <view class="allprice">&yen;{{totalprice[index]}}</view>
          <view class="allnum">共{{count[index]}}件商品 总计：</view>
        </view>

        <!-- 按钮 操作 -->
        <!-- <view class="run" v-if="run != 3"> -->
        <view class="run">
          <view v-if="items.order_state_id == 0">
            <button class="btn4" @click="pay">付款</button>
            <button class="btn1" @click="cancel">取消订单</button>
          </view>
          <view v-else-if="items.order_state_id == 1">
            <button class="btn2" @click="cancel">取消订单</button>
            <button class="btn1" @click="revise">修改地址</button>
          </view>
          <view v-else-if="items.order_state_id == 2">
            <button class="btn2" @click="confirm">确认收货</button>
            <button class="btn1" @click="check">查看物流</button>
          </view>
          <view v-else-if="items.order_state_id == 3">
            <button class="btn3" @click="clickToComment(items)">去评价</button>
          </view>
          <!-- <view  v-else-if="run === '评价后'">
                    <button class="btn1" @click="del">删除订单</button>
          </view>-->
        </view>
      </view>
    </view>

    <!-- </view> -->

    <!-- 弹窗 -->
    <!-- 遮盖层 -->
    <view class="mask" v-if="isdisplay">
      <!-- 弹窗内容 -->
      <view class="modal">
        <view class="title">取消订单</view>
        <view class="choose">请选择取消订单的原因</view>
        <view class="options">
          <view class="row">
            <view class="text">我不想买了</view>
            <view class="check_area">
              <view class="circle" :class="{' active':pickAddress==item.address_id}"></view>
            </view>
          </view>
          <view class="row">
            <view class="text">信息填写错误，重新拍</view>
            <view class="check_area">
              <view class="circle" :class="{' active':pickAddress==item.address_id}"></view>
            </view>
          </view>
          <view class="row">
            <view class="text">卖家缺货</view>
            <view class="check_area">
              <view class="circle" :class="{' active':pickAddress==item.address_id}"></view>
            </view>
          </view>
          <view class="row">
            <view class="text">同城见面交易</view>
            <view class="check_area">
              <view class="circle" :class="{' active':pickAddress==item.address_id}"></view>
            </view>
          </view>
          <view class="row">
            <view class="text">其他原因</view>
            <view class="check_area">
              <view class="circle" :class="{' active':pickAddress==item.address_id}"></view>
            </view>
          </view>
        </view>
        <view class="footer">
          <view class="tem">暂不取消</view>
          <view class="ensure" @click="close">确定取消</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import { globalBus } from "@/components/globalBus";

export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  inject: ["reload"],

  props: ["run", "bookList", "res", "dispaly"],
  // props: ["bookList", "dispaly"],

  data() {
    return {
      // isdiaplay: false,
      isshow: true,
      totalprice: [],
      count: []
      //   run: -1,
      //   res: ""
      // dataList: [] //存放用于提交到评论页面的数据数组
    };
  },
  computed: {},
  created() {
    // let _this = this;
    this.getTotalprice();
    this.getCount();
  },
  mounted() {},

  watch: {
    bookList: {
      handler: function() {
        this.getTotalprice();
        this.getCount();
      }
    }
     
    // totalprice: {
    //   handler: function() {
    //   }
    // },
    // count: {
    //   handler: function() {
    //     // this.getCount();
    //   }
    // }
  },
  methods: {
    getTotalprice() {
      this.totalprice = [];
      let _this = this;

      let rowprice = 0;
      if (_this.bookList.length) {
        for (let i = 0; i < _this.bookList.length; i++) {
          for (let j = 0; j < _this.bookList[i].item.length; j++) {
            rowprice +=
              _this.bookList[i].item[j].price * _this.bookList[i].item[j].count;
            // console.log(_this.bookList[i].item[j].price * _this.bookList[i].item[j].count, j);
            // console.log(rowprice);
            // _this.totalprice[i] = parseFloat(data).toFixed(2);
          }
          rowprice = parseFloat(rowprice).toFixed(2);
          _this.totalprice[i] = rowprice;
          rowprice = 0;
        }
      }
    },
    getCount() {
      this.count = [];
      let _this = this;
      let data = 0;
      if (_this.bookList.length) {
        for (let i = 0; i < _this.bookList.length; i++) {
          for (let j = 0; j < _this.bookList[i].item.length; j++) {
            // console.log("_this.bookList[i].item[j].count" + _this.bookList[i].item[j].count);
            data += _this.bookList[i].item[j].count;
            _this.count[i] = data;
          }
          data = 0;
        }
      }
    },
    //================================================   刷新当前页
    reload() {
      this.isRouterAlive = false;
      // console.log("刷新");
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },

    //==============  取消订单   ===========
    cancel() {
      this.isdisplay = !this.isdisplay;
      wx.hideTabBar({
        animation: false //隐藏tabbar
      });
      console.log("open = " + this.isdisplay);
    },
    close() {
      this.isdisplay = !this.isdisplay;
      //console.log("close = " + this.isdisplay);
    },
    //==============  取消订单   ===========

    //==============  修改地址   ===========
    revise() {
      wx.navigateTo({
        url: "/pages/counter/main"
      });
    },

    //==============  确认收货  ===========
    confirm() {},

    //==============  查看物流   ===========
    check() {},

    //==============  去评价   ===========
    clickToComment(items) {
      console.log(items);
      console.log(items.item);
      let order_item = { order_item_id: 0, bookname: "", content: "", img: "" };
      let commentList = [];
      if (items.item.length) {
        for (let i = 0; i < items.item.length; i++) {
          order_item.order_item_id = items.item[i].order_item_id;
          order_item.bookname = items.item[i].book_name;
          commentList.push(order_item);
          order_item={ order_item_id: 0, bookname: "", content: "", img: "" };
        }
      }
      this.GLOBAL.globalConfirmOrder.commentList = [];
      this.GLOBAL.globalConfirmOrder.commentList = commentList;
      console.log(this.GLOBAL.globalConfirmOrder.commentList);
      wx.navigateTo({
        url: "/pages/delivercomment1/main"
      });
    },
    //==============  去评价   ===========

    //==============  付款   ===========
    pay() {},
    //==============  付款   ===========
    delete() {}
  }
};
</script>

<style scoped>
.cart {
  display: inline-block;
  width: 94%;
  margin: 0 3% 3% 3%;
  background-color: white;
  /* height: 400rpx; */
  /* max-height: 580rpx; */
  height: auto;
  border-radius: 15rpx;
}
/* 顶部标签   始 */

.top {
  width: 100%;
  height: 90rpx;
}

.top img {
  /* position: relative; */
  float: left;
  margin-left: 20rpx;
  width: 54rpx;
  height: 50rpx;
  margin-top: 20rpx;
}

.shopname {
  /* position: relative; */
  float: left;
  margin-top: 25rpx;
  margin-left: 10rpx;
  max-width: 25%;
  font-size: 30rpx;
  color: #36282b;
  text-align: center;
}

.result {
  float: right;
  margin-right: 20rpx;
  margin-top: 30rpx;
  height: 40rpx;
  font-size: 24rpx;
  color: #bc2b37;
}

.res {
  float: right;
}
/* 顶部标签   终*/
/* 中部标签   始 */

.middlePanel {
  /* margin-top: 10rpx; */
  width: 100%;
  height: auto;
  position: relative;
}

.middle {
  /* margin-top: 10rpx; */
  width: 100%;
  height: 190rpx;
  position: relative;
  float: left;
  /* border-bottom-color: #f5f5f5; */
}

.imgs {
  position: relative;
  float: left;
  margin-left: 20rpx;
  width: 200rpx;
  height: 180rpx;
  background: #a9803e;
}

.imgs img {
  position: relative;
  float: left;
  /* margin-left: 20rpx; */
  width: 200rpx;
  height: 180rpx;
  top: -180rpx;
}

.name {
  position: relative;
  float: left;
  margin-left: 10rpx;
  max-width: 290rpx;
  font-size: 30rpx;
  color: #36282b;
  /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
}

.right {
  float: none;
  width: 25%;
  height: 160rpx;
  top: 0rpx;
  margin-left: 520rpx;
}

.price {
  float: right;
  width: 100%;
  text-align: right;
  margin-right: 20rpx;
  margin-top: 2rpx;
  font-size: 28rpx;
  color: #36282b;
  /* margin-top: 120rpx;   书名没有出来时的 顶部位置*/
}

.num {
  float: right;
  width: 100%;
  text-align: right;
  margin-right: 20rpx;
  margin-top: 20rpx;
  font-size: 24rpx;
  color: #36282b;
}

.allcount {
  float: right;
  height: 50rpx;
  width: 100%;
  /* margin-top: 65rpx; */
  /* background: pink; */
}

.allnum {
  float: right;
  margin-right: 5rpx;
  margin-top: 4rpx;
  /* width: 28%; */
  text-align: right;
  letter-spacing: 2rpx;
  font-size: 24rpx;
  color: #36282b;
  white-space: nowrap;
  /* background: aquamarine; */
}

.allprice {
  font-size: 28rpx;
  max-width: 40%;
  float: right;
  margin-right: 20rpx;
  text-align: right;
  /* background: #A9803E; */
}

.run {
  width: 100%;
  height: 80rpx;
  float: right;
}

button,
.btn1,
.btn2,
.btn3,
.btn4 {
  float: right;
  width: 160rpx;
  height: 60rpx;
  margin-top: 10rpx;
  margin-right: 20rpx;
  background: white;
  /* 字体设置处于按钮居中位置 */
  padding: 0rpx;
  text-align: center;
  vertical-align: middle;
  font-size: 28rpx;
  line-height: 60rpx;
  /* 字体设置处于按钮居中位置 */
  border-radius: 30rpx;
  border: 1rpx solid;
  white-space: nowrap;
  /* 文本不换行 */
}

.btn1 {
  color: #a9803e;
  border-color: #a9803e;
}

.btn2,
.btn3,
.btn4 {
  color: #521d23;
  border-color: #521d23;
}

.btn3 {
  width: 135rpx;
}
/* 单项 评论按钮 */
/* .comment {
        width: 100%;
        height: 90rpx;
        float: right;
    } */
/* .btn3 {
        width: 135rpx;
        float: right;
        height: 60rpx;
        margin-top: 10rpx;
        margin-right: 20rpx;
        background: white; */
/* 字体设置处于按钮居中位置 */
/* padding: 0rpx;
        text-align: center;
        vertical-align: middle;
        font-size: 28rpx;
    
    line-height: 60rpx; */
/* 字体设置处于按钮居中位置 */
/* border-radius: 30rpx;
        border: 1rpx solid;
        white-space: nowrap; */
/* 文本不换行 */
/* } */

.btn4 {
  width: 120rpx;
}
/* 以下为弹框样式 */

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(184, 182, 182);
  z-index: 9000;
  opacity: 0.8;
}

.modal {
  /* display: none; */
  /* 默认隐藏 */
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 55%;
  overflow: auto;
  background: rgb(255, 255, 255);
  bottom: 0;
  opacity: 1;
}
/* 弹窗内容 */

.title {
  margin-top: 35rpx;
  text-align: center;
  font-size: 30rpx;
  color: #36282b;
  /* background: cyan; */
}

.choose {
  position: relative;
  margin-top: 50rpx;
  margin-left: 4.8%;
  margin-right: 4.8%;
  font-size: 24rpx;
  /* background: antiquewhite; */
}

.options {
  position: relative;
  margin-left: 4.8%;
  margin-right: 4.8%;
  /* background: azure; */
}

.row {
  float: left;
  width: 100%;
  font-size: 28rpx;
  margin-top: 50rpx;
  /* background: aquamarine; */
}

.text {
  float: left;
}
/* check-box {
        background: #000;
        float: left;
        margin-left: 642rpx;
    } */
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

.footer {
  position: fixed;
  width: 100%;
  height: 100rpx;
  text-align: center;
  font-size: 30rpx;
  vertical-align: middle;
  padding: 0rpx;
  line-height: 98rpx;
  bottom: 0;
}

.tem {
  float: left;
  width: 49.5%;
  height: 96%;
  border: 1rpx solid #a9803e;
  color: #a9803e;
  bottom: 0;
}

.ensure {
  float: left;
  width: 49.5%;
  height: 96%;
  border: 1rpx solid rgb(82, 29, 35);
  color: rgb(82, 29, 35);
  bottom: 0;
}
/* 弹框样式   end */
</style>