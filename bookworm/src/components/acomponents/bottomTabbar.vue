<template>
  <div>
    <!-- ==================================================     组件：商品详情页面底部的按钮组合     ======================================================= -->
    <cover-view @blur="blurs" class="tabbar">
      <cover-view class="collect" @click="collect()">
        <cover-image v-if="collectType" class="collect_image" :src="'/static/images/collected.png'"></cover-image>
        <cover-image v-else class="collect_image" :src="'/static/images/collect.png'"></cover-image>
        <cover-view class="collect_text">收藏</cover-view>
      </cover-view>
      <cover-view class="addToCart" @click="addToCart">
        <cover-image class="back_image" :src="'/static/images/backbtn2.png'"></cover-image>
        <button>加入购物车</button>
      </cover-view>
      <cover-view class="Buy" @click="BuyNow">
        <cover-image class="back_image" :src="'/static/images/backbtn1.png'"></cover-image>
        <button>立即购买</button>
      </cover-view>
    </cover-view>
  </div>
</template>

<script>
export default {
  props: ["collectType", "bookId", "bookInfo"],
  data() {
    return {
      // imgsrc1: "/static/images/收藏——未选中@3x.png",
      // imgsrc2: "/static/images/收藏——选中@3x.png",
      // backSrc: "/static/images/圆角矩形3拷贝@3x.png",
      // backSrc2: "/static/images/圆角矩形3@3x.png",
      // collectType: 0
    };
  },
  mounted() {
    if (!this.collectType) {
      this.imgsrc = this.imgsrc1;
    } else {
      this.imgsrc = this.imgsrc2;
    }
  },
  methods: {
    blurs() {
      window.scroll(0, 0);
    },
    collect() {
      let _this = this;
      this.collectType = !this.collectType;
      console.log("collect");
      //=========================================================    获取书籍收藏信息
      wx.request({
        url: _this.GLOBAL.serverSrc + "/collect/collectAdd",
        method: "POST",
        data: { user_id: _this.GLOBAL.userId, book_id: this.bookId },
        success(res) {
          console.log(_this.collectType);
          if (_this.collectType) {
            wx.showToast({
              title: "收藏成功",
              duration:800
            });
          } else {
            wx.showToast({
              title: "取消收藏",
              duration:800
            });
          }
        }
      });
    },
    //=========================================================    添加到购物车
    addToCart() {
      let _this = this;
      wx.request({
        url: _this.GLOBAL.serverSrc + "/cart/cartAdd",
        method: "POST",
        data: { user_id: _this.GLOBAL.userId, book_id: _this.bookId },
        success(res) {
          // console.log("addToCart");
          wx.showToast({
            title: "加入成功",
            duration:800
          });
        }
      });
    },
    BuyNow() {
      //console.log("BuyNow");
      let _this = this;
      _this.dataList = [];
      let dataCreateList = [];

      let data = {
        book_id: this.bookId,
        book_name: this.bookInfo.book_name,
        book_author: this.bookInfo.book_detail,
        book_cover: this.bookInfo.book_cover,
        count: 1,
        book_price: this.bookInfo.book_price
      };
      let dataCreate = {
        book_id: this.bookId,
        count: 1,
        price: this.bookInfo.book_price
      };
      // 用于确认订单时传数据
      // data.book_id = _this.cartList[i].book_id;
      // data.book_name = _this.cartList[i].book_name;
      // data.book_author = _this.cartList[i].book_author;
      // data.book_img = _this.cartList[i].book_img;
      // data.count = _this.cartList[i].count;
      // data.book_price = _this.cartList[i].book_price;
      _this.dataList.push(data);
      //this.GLOBAL.globalConfirmOrder.orderList.push(data);

      // 用于创建订单时传数据
      // dataCreate.book_id = _this.cartList[i].book_id;
      // dataCreate.count = _this.cartList[i].count;
      // dataCreate.price = _this.cartList[i].book_price;
      dataCreateList.push(dataCreate);

      console.log(_this.dataList);
      //全局变量订单
      this.GLOBAL.globalConfirmOrder.orderList = [];
      this.GLOBAL.globalConfirmOrder.orderList = _this.dataList;
      //全局变量数据
      this.GLOBAL.globalConfirmOrder.createOrderList = [];
      this.GLOBAL.globalConfirmOrder.createOrderList = dataCreateList;

      console.log(this.GLOBAL.globalConfirmOrder.orderList);
      wx.navigateTo({
        url: "/pages/order_submit1/main"
      });
    }
  }
};
</script>
<style scoped>
.tabbar {
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
.collect {
  flex: 1;
  line-height: 1rem;
  color: #36282b;
  font-size: 10px;
}
.collect_image {
  display: block;
  width: 0.64rem;
  height: 0.5rem;
  margin: 0.04rem auto 0.1rem;
}
.collect_text {
  display: block;
  width: 2em;
  height: 1rem;
  left: 50%;
  right: 50%;
  margin: auto;
  text-align: center;
}
/* ------------------------------------清除button所有默认样式 */
button,
.button-hover {
  color: unset;
  background-color: unset;
  padding: unset;
  font-size: unset;
  line-height: unset;
  border-radius: unset;
  -webkit-tap-highlight-color: unset;
  overflow: hidden;
}
button::after {
  display: none;
}
/* ------------------------------------清除结束 */
.addToCart,
.Buy {
  line-height: 1rem;
  flex: 2;
  color: white;
}
.addToCart button,
.Buy button {
  width: 100%;
  height: 100%;
}
.back_image {
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>